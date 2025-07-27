"""
Document views for the Bluestock IPO platform.
"""
import os
from django.http import HttpResponse, Http404, FileResponse
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from apps.ipos.models import IPO
from .models import Document, DocumentDownloadLog
from .serializers import DocumentSerializer, DocumentUploadSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admins to upload/delete documents.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role == 'admin'


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
def upload_document(request, ipo_id):
    """
    Upload a document for an IPO.
    """
    try:
        ipo = IPO.objects.get(id=ipo_id)
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
def download_document(request, ipo_id):
    """
    Download a document for an IPO.
    """
    try:
        ipo = IPO.objects.get(id=ipo_id)
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
def delete_document(request, ipo_id):
    """
    Delete a document from an IPO.
    """
    try:
        ipo = IPO.objects.get(id=ipo_id)
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


@swagger_auto_schema(
    method='get',
    responses={
        200: DocumentSerializer(many=True),
        404: openapi.Response(description="IPO not found"),
    },
    operation_description="Get all documents for an IPO"
)
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def list_documents(request, ipo_id):
    """
    List all documents for an IPO.
    """
    try:
        ipo = IPO.objects.get(id=ipo_id)
    except IPO.DoesNotExist:
        return Response(
            {'error': 'IPO not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    documents = Document.objects.filter(ipo=ipo)
    
    # Filter by public documents if user is not admin
    if not (request.user.is_authenticated and request.user.role == 'admin'):
        documents = documents.filter(is_public=True)
    
    serializer = DocumentSerializer(documents, many=True)
    return Response(serializer.data)