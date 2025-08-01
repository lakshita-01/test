"""
IPO views for the Bluestock IPO platform.
"""
import os
from django.http import FileResponse
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import IPO
from .serializers import (
    IPOSerializer, 
    IPOListSerializer, 
    IPOCreateUpdateSerializer
)
from apps.documents.models import Document, DocumentDownloadLog
from apps.documents.serializers import DocumentSerializer, DocumentUploadSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admins to edit IPOs.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role == 'admin'


@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter('search', openapi.IN_QUERY, description="Search IPOs by company name or IPO name", type=openapi.TYPE_STRING),
        openapi.Parameter('status', openapi.IN_QUERY, description="Filter by status", type=openapi.TYPE_STRING),
        openapi.Parameter('sector', openapi.IN_QUERY, description="Filter by company sector", type=openapi.TYPE_STRING),
        openapi.Parameter('ordering', openapi.IN_QUERY, description="Order by field", type=openapi.TYPE_STRING),
        openapi.Parameter('page', openapi.IN_QUERY, description="Page number", type=openapi.TYPE_INTEGER),
    ],
    responses={200: IPOListSerializer(many=True)},
    operation_description="Get list of all IPOs with filtering and search"
)
@swagger_auto_schema(
    method='post',
    request_body=IPOCreateUpdateSerializer,
    responses={
        201: IPOSerializer,
        400: openapi.Response(description="Validation errors"),
        401: openapi.Response(description="Authentication required"),
        403: openapi.Response(description="Admin access required"),
    },
    operation_description="Create a new IPO (Admin only)"
)
@api_view(['GET', 'POST'])
@permission_classes([IsAdminOrReadOnly])
def ipo_list_create(request):
    """
    List all IPOs or create a new IPO.
    """
    if request.method == 'GET':
        ipos = IPO.objects.select_related('company').prefetch_related('documents')
        
        # Apply filters
        status_filter = request.query_params.get('status')
        if status_filter:
            ipos = ipos.filter(status=status_filter)
        
        sector_filter = request.query_params.get('sector')
        if sector_filter:
            ipos = ipos.filter(company__sector=sector_filter)
        
        is_active = request.query_params.get('is_active')
        if is_active is not None:
            ipos = ipos.filter(is_active=is_active.lower() == 'true')
        
        # Apply search
        search = request.query_params.get('search')
        if search:
            ipos = ipos.filter(
                Q(company__name__icontains=search) |
                Q(ipo_name__icontains=search) |
                Q(description__icontains=search)
            )
        
        # Apply ordering
        ordering = request.query_params.get('ordering', '-ipo_open_date')
        valid_orderings = [
            'ipo_open_date', '-ipo_open_date',
            'ipo_close_date', '-ipo_close_date',
            'issue_size', '-issue_size',
            'company__name', '-company__name',
            'created_at', '-created_at'
        ]
        if ordering in valid_orderings:
            ipos = ipos.order_by(ordering)
        
        # Pagination
        from django.core.paginator import Paginator
        page_number = request.query_params.get('page', 1)
        paginator = Paginator(ipos, 20)  # 20 IPOs per page
        page_obj = paginator.get_page(page_number)
        
        serializer = IPOListSerializer(page_obj, many=True)
        
        return Response({
            'results': serializer.data,
            'count': paginator.count,
            'num_pages': paginator.num_pages,
            'current_page': page_obj.number,
            'has_next': page_obj.has_next(),
            'has_previous': page_obj.has_previous(),
        })
    
    elif request.method == 'POST':
        serializer = IPOCreateUpdateSerializer(data=request.data)
        if serializer.is_valid():
            ipo = serializer.save()
            return Response(
                IPOSerializer(ipo).data, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter('search', openapi.IN_QUERY, description="Search keyword", type=openapi.TYPE_STRING, required=True),
    ],
    responses={200: IPOListSerializer(many=True)},
    operation_description="Search IPOs by keyword"
)
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def ipo_search(request):
    """
    Search IPOs by keyword.
    """
    search_query = request.query_params.get('search', '').strip()
    
    if not search_query:
        return Response({
            'results': [],
            'message': 'Search query is required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    ipos = IPO.objects.select_related('company').filter(
        Q(company__name__icontains=search_query) |
        Q(ipo_name__icontains=search_query) |
        Q(description__icontains=search_query) |
        Q(company__sector__icontains=search_query)
    ).filter(is_active=True)
    
    # Limit results to 50
    ipos = ipos[:50]
    
    serializer = IPOListSerializer(ipos, many=True)
    
    return Response({
        'results': serializer.data,
        'count': len(serializer.data)
    })


@swagger_auto_schema(
    method='get',
    responses={
        200: IPOSerializer,
        404: openapi.Response(description="IPO not found"),
    },
    operation_description="Get IPO details by ID"
)
@swagger_auto_schema(
    method='put',
    request_body=IPOCreateUpdateSerializer,
    responses={
        200: IPOSerializer,
        400: openapi.Response(description="Validation errors"),
        401: openapi.Response(description="Authentication required"),
        403: openapi.Response(description="Admin access required"),
        404: openapi.Response(description="IPO not found"),
    },
    operation_description="Update IPO details (Admin only)"
)
@swagger_auto_schema(
    method='delete',
    responses={
        204: openapi.Response(description="IPO deleted successfully"),
        401: openapi.Response(description="Authentication required"),
        403: openapi.Response(description="Admin access required"),
        404: openapi.Response(description="IPO not found"),
    },
    operation_description="Delete an IPO (Admin only)"
)
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAdminOrReadOnly])
def ipo_detail(request, pk):
    """
    Retrieve, update or delete an IPO.
    """
    try:
        ipo = IPO.objects.select_related('company').prefetch_related(
            'subscriptions', 'timeline', 'documents'
        ).get(pk=pk)
    except IPO.DoesNotExist:
        return Response(
            {'error': 'IPO not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    if request.method == 'GET':
        serializer = IPOSerializer(ipo)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = IPOCreateUpdateSerializer(ipo, data=request.data)
        if serializer.is_valid():
            ipo = serializer.save()
            return Response(IPOSerializer(ipo).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        # Check if IPO has active status
        if ipo.status in ['open', 'upcoming']:
            return Response(
                {'error': 'Cannot delete active or upcoming IPO'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        ipo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@swagger_auto_schema(
    method='get',
    responses={200: openapi.Response(
        description="IPO statuses",
        schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'statuses': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            'value': openapi.Schema(type=openapi.TYPE_STRING),
                            'label': openapi.Schema(type=openapi.TYPE_STRING),
                        }
                    )
                )
            }
        )
    )},
    operation_description="Get list of available IPO statuses"
)
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def ipo_statuses(request):
    """
    Get list of available IPO statuses.
    """
    statuses = [
        {'value': choice[0], 'label': choice[1]} 
        for choice in IPO.STATUS_CHOICES
    ]
    
    return Response({'statuses': statuses})


@swagger_auto_schema(
    method='get',
    responses={200: openapi.Response(
        description="IPO statistics",
        schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'total_ipos': openapi.Schema(type=openapi.TYPE_INTEGER),
                'upcoming_ipos': openapi.Schema(type=openapi.TYPE_INTEGER),
                'open_ipos': openapi.Schema(type=openapi.TYPE_INTEGER),
                'closed_ipos': openapi.Schema(type=openapi.TYPE_INTEGER),
                'listed_ipos': openapi.Schema(type=openapi.TYPE_INTEGER),
            }
        )
    )},
    operation_description="Get IPO statistics"
)
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def ipo_stats(request):
    """
    Get IPO statistics.
    """
    from django.db.models import Count
    
    stats = IPO.objects.aggregate(
        total_ipos=Count('id'),
        upcoming_ipos=Count('id', filter=Q(status='upcoming')),
        open_ipos=Count('id', filter=Q(status='open')),
        closed_ipos=Count('id', filter=Q(status='closed')),
        listed_ipos=Count('id', filter=Q(status='listed')),
    )
    
    return Response(stats)


# Document Upload/Download Views as per API specification

@swagger_auto_schema(
    method='post',
    request_body=DocumentUploadSerializer,
    responses={
        201: DocumentSerializer,
        400: openapi.Response(description="Validation errors"),
        401: openapi.Response(description="Authentication required"),
        403: openapi.Response(description="Admin access required"),
        404: openapi.Response(description="IPO not found"),
    },
    operation_description="Upload RHP/DRHP document for an IPO (Admin only)"
)
@api_view(['POST'])
@permission_classes([IsAdminOrReadOnly])
@parser_classes([MultiPartParser, FormParser])
def upload_document(request, pk):
    """
    Upload a document for an IPO.
    POST /api/ipos/:id/upload
    """
    try:
        ipo = IPO.objects.get(id=pk)
    except IPO.DoesNotExist:
        return Response(
            {'error': 'IPO not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    serializer = DocumentUploadSerializer(
        data=request.data, 
        context={'request': request}
    )
    
    if serializer.is_valid():
        # Check if document of this type already exists for this IPO
        document_type = serializer.validated_data['document_type']
        existing_doc = Document.objects.filter(
            ipo=ipo, 
            document_type=document_type
        ).first()
        
        if existing_doc:
            # Delete old document file
            existing_doc.delete()
        
        # Create new document
        document = serializer.save(ipo=ipo)
        
        return Response(
            DocumentSerializer(document).data,
            status=status.HTTP_201_CREATED
        )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter(
            'doc_type', 
            openapi.IN_QUERY, 
            description="Document type (rhp, drhp, etc.)", 
            type=openapi.TYPE_STRING
        ),
    ],
    responses={
        200: openapi.Response(description="File download"),
        404: openapi.Response(description="Document not found"),
    },
    operation_description="Download RHP/DRHP document"
)
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def download_document(request, pk):
    """
    Download a document for an IPO.
    GET /api/ipos/:id/download
    """
    try:
        ipo = IPO.objects.get(id=pk)
    except IPO.DoesNotExist:
        return Response(
            {'error': 'IPO not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    doc_type = request.query_params.get('doc_type', 'rhp')
    
    try:
        document = Document.objects.get(ipo=ipo, document_type=doc_type)
    except Document.DoesNotExist:
        return Response(
            {'error': f'{doc_type.upper()} document not found for this IPO'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Check if document is public or user has permission
    if not document.is_public:
        if not request.user.is_authenticated or request.user.role != 'admin':
            return Response(
                {'error': 'Access denied'}, 
                status=status.HTTP_403_FORBIDDEN
            )
    
    # Check if file exists
    if not document.file or not os.path.exists(document.file.path):
        return Response(
            {'error': 'File not found on server'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Log the download
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR', '127.0.0.1')
    
    DocumentDownloadLog.objects.create(
        document=document,
        ip_address=ip,
        user_agent=request.META.get('HTTP_USER_AGENT', ''),
        user=request.user if request.user.is_authenticated else None
    )
    
    # Increment download count
    document.increment_download_count()
    
    # Return file response
    try:
        response = FileResponse(
            open(document.file.path, 'rb'),
            content_type='application/pdf' if document.file_extension == '.pdf' else 'application/octet-stream'
        )
        response['Content-Disposition'] = f'attachment; filename="{document.original_filename}"'
        return response
    except Exception as e:
        return Response(
            {'error': 'Error serving file'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@swagger_auto_schema(
    method='delete',
    manual_parameters=[
        openapi.Parameter(
            'doc_type', 
            openapi.IN_QUERY, 
            description="Document type to delete", 
            type=openapi.TYPE_STRING,
            required=True
        ),
    ],
    responses={
        204: openapi.Response(description="Document deleted successfully"),
        401: openapi.Response(description="Authentication required"),
        403: openapi.Response(description="Admin access required"),
        404: openapi.Response(description="Document not found"),
    },
    operation_description="Delete document from IPO (Admin only)"
)
@api_view(['DELETE'])
@permission_classes([IsAdminOrReadOnly])
def delete_document(request, pk):
    """
    Delete a document from an IPO.
    DELETE /api/ipos/:id/delete-doc
    """
    try:
        ipo = IPO.objects.get(id=pk)
    except IPO.DoesNotExist:
        return Response(
            {'error': 'IPO not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    doc_type = request.query_params.get('doc_type')
    if not doc_type:
        return Response(
            {'error': 'doc_type parameter is required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        document = Document.objects.get(ipo=ipo, document_type=doc_type)
        document.delete()  # This will also delete the file
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Document.DoesNotExist:
        return Response(
            {'error': 'Document not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )