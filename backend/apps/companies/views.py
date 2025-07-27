"""
Company views for the Bluestock IPO platform.
"""
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Company
from .serializers import (
    CompanySerializer, 
    CompanyListSerializer, 
    CompanyCreateUpdateSerializer
)


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admins to edit companies.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role == 'admin'


@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter('search', openapi.IN_QUERY, description="Search companies by name or sector", type=openapi.TYPE_STRING),
        openapi.Parameter('sector', openapi.IN_QUERY, description="Filter by sector", type=openapi.TYPE_STRING),
        openapi.Parameter('is_active', openapi.IN_QUERY, description="Filter by active status", type=openapi.TYPE_BOOLEAN),
        openapi.Parameter('ordering', openapi.IN_QUERY, description="Order by field (name, created_at, market_cap)", type=openapi.TYPE_STRING),
        openapi.Parameter('page', openapi.IN_QUERY, description="Page number", type=openapi.TYPE_INTEGER),
    ],
    responses={200: CompanyListSerializer(many=True)},
    operation_description="Get list of all companies with filtering and search"
)
@swagger_auto_schema(
    method='post',
    request_body=CompanyCreateUpdateSerializer,
    responses={
        201: CompanySerializer,
        400: openapi.Response(description="Validation errors"),
        401: openapi.Response(description="Authentication required"),
        403: openapi.Response(description="Admin access required"),
    },
    operation_description="Create a new company (Admin only)"
)
@api_view(['GET', 'POST'])
@permission_classes([IsAdminOrReadOnly])
def company_list_create(request):
    """
    List all companies or create a new company.
    """
    if request.method == 'GET':
        companies = Company.objects.all()
        
        # Apply filters
        sector = request.query_params.get('sector')
        if sector:
            companies = companies.filter(sector=sector)
        
        is_active = request.query_params.get('is_active')
        if is_active is not None:
            companies = companies.filter(is_active=is_active.lower() == 'true')
        
        # Apply search
        search = request.query_params.get('search')
        if search:
            companies = companies.filter(
                name__icontains=search
            ) | companies.filter(
                sector__icontains=search
            )
        
        # Apply ordering
        ordering = request.query_params.get('ordering', 'name')
        if ordering in ['name', '-name', 'created_at', '-created_at', 'market_cap', '-market_cap']:
            companies = companies.order_by(ordering)
        
        # Pagination
        from django.core.paginator import Paginator
        page_number = request.query_params.get('page', 1)
        paginator = Paginator(companies, 20)  # 20 companies per page
        page_obj = paginator.get_page(page_number)
        
        serializer = CompanyListSerializer(page_obj, many=True)
        
        return Response({
            'results': serializer.data,
            'count': paginator.count,
            'num_pages': paginator.num_pages,
            'current_page': page_obj.number,
            'has_next': page_obj.has_next(),
            'has_previous': page_obj.has_previous(),
        })
    
    elif request.method == 'POST':
        serializer = CompanyCreateUpdateSerializer(data=request.data)
        if serializer.is_valid():
            company = serializer.save()
            return Response(
                CompanySerializer(company).data, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method='get',
    responses={
        200: CompanySerializer,
        404: openapi.Response(description="Company not found"),
    },
    operation_description="Get company details by ID"
)
@swagger_auto_schema(
    method='put',
    request_body=CompanyCreateUpdateSerializer,
    responses={
        200: CompanySerializer,
        400: openapi.Response(description="Validation errors"),
        401: openapi.Response(description="Authentication required"),
        403: openapi.Response(description="Admin access required"),
        404: openapi.Response(description="Company not found"),
    },
    operation_description="Update company details (Admin only)"
)
@swagger_auto_schema(
    method='delete',
    responses={
        204: openapi.Response(description="Company deleted successfully"),
        401: openapi.Response(description="Authentication required"),
        403: openapi.Response(description="Admin access required"),
        404: openapi.Response(description="Company not found"),
    },
    operation_description="Delete a company (Admin only)"
)
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAdminOrReadOnly])
def company_detail(request, pk):
    """
    Retrieve, update or delete a company.
    """
    try:
        company = Company.objects.get(pk=pk)
    except Company.DoesNotExist:
        return Response(
            {'error': 'Company not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    if request.method == 'GET':
        serializer = CompanySerializer(company)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = CompanyCreateUpdateSerializer(company, data=request.data)
        if serializer.is_valid():
            company = serializer.save()
            return Response(CompanySerializer(company).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        # Check if company has active IPOs
        if company.ipos.filter(status__in=['upcoming', 'open']).exists():
            return Response(
                {'error': 'Cannot delete company with active IPOs'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@swagger_auto_schema(
    method='get',
    responses={200: openapi.Response(
        description="Company sectors",
        schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'sectors': openapi.Schema(
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
    operation_description="Get list of available company sectors"
)
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def company_sectors(request):
    """
    Get list of available company sectors.
    """
    sectors = [
        {'value': choice[0], 'label': choice[1]} 
        for choice in Company.SECTOR_CHOICES
    ]
    
    return Response({'sectors': sectors})