"""
Admin dashboard views for the Bluestock IPO platform.
"""
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Count, Sum, Q
from django.utils import timezone
from datetime import timedelta
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from apps.companies.models import Company
from apps.ipos.models import IPO
from apps.documents.models import Document, DocumentDownloadLog
from apps.authentication.models import LoginLog, User
from apps.authentication.serializers import LoginLogSerializer


class IsAdmin(permissions.BasePermission):
    """
    Custom permission to only allow admin users.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'


@swagger_auto_schema(
    method='get',
    responses={200: openapi.Response(
        description="Dashboard statistics",
        schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'companies': openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'total': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'active': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'by_sector': openapi.Schema(type=openapi.TYPE_OBJECT),
                    }
                ),
                'ipos': openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'total': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'upcoming': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'open': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'closed': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'listed': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'total_issue_size': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                ),
                'documents': openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'total': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'total_downloads': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'by_type': openapi.Schema(type=openapi.TYPE_OBJECT),
                    }
                ),
                'users': openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'total': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'active': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'admins': openapi.Schema(type=openapi.TYPE_INTEGER),
                    }
                ),
            }
        )
    )},
    operation_description="Get dashboard statistics (Admin only)"
)
@api_view(['GET'])
@permission_classes([IsAdmin])
def dashboard_stats(request):
    """
    Get comprehensive dashboard statistics.
    """
    # Company statistics
    company_stats = Company.objects.aggregate(
        total=Count('id'),
        active=Count('id', filter=Q(is_active=True))
    )
    
    # Companies by sector
    companies_by_sector = dict(
        Company.objects.values('sector').annotate(
            count=Count('id')
        ).values_list('sector', 'count')
    )
    
    # IPO statistics
    ipo_stats = IPO.objects.aggregate(
        total=Count('id'),
        upcoming=Count('id', filter=Q(status='upcoming')),
        open=Count('id', filter=Q(status='open')),
        closed=Count('id', filter=Q(status='closed')),
        listed=Count('id', filter=Q(status='listed')),
        total_issue_size=Sum('issue_size')
    )
    
    # Format issue size
    total_issue_size = ipo_stats['total_issue_size'] or 0
    ipo_stats['total_issue_size'] = f"₹{total_issue_size:,.2f} Cr"
    
    # Document statistics
    document_stats = Document.objects.aggregate(
        total=Count('id'),
        total_downloads=Sum('download_count')
    )
    
    # Documents by type
    documents_by_type = dict(
        Document.objects.values('document_type').annotate(
            count=Count('id')
        ).values_list('document_type', 'count')
    )
    
    # User statistics
    user_stats = User.objects.aggregate(
        total=Count('id'),
        active=Count('id', filter=Q(is_active=True)),
        admins=Count('id', filter=Q(role='admin'))
    )
    
    # Recent activity (last 30 days)
    thirty_days_ago = timezone.now() - timedelta(days=30)
    recent_stats = {
        'new_companies': Company.objects.filter(created_at__gte=thirty_days_ago).count(),
        'new_ipos': IPO.objects.filter(created_at__gte=thirty_days_ago).count(),
        'document_downloads': DocumentDownloadLog.objects.filter(downloaded_at__gte=thirty_days_ago).count(),
        'user_logins': LoginLog.objects.filter(login_time__gte=thirty_days_ago).count(),
    }
    
    return Response({
        'companies': {
            **company_stats,
            'by_sector': companies_by_sector
        },
        'ipos': ipo_stats,
        'documents': {
            **document_stats,
            'by_type': documents_by_type
        },
        'users': user_stats,
        'recent_activity': recent_stats,
        'generated_at': timezone.now()
    })


@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter('page', openapi.IN_QUERY, description="Page number", type=openapi.TYPE_INTEGER),
        openapi.Parameter('limit', openapi.IN_QUERY, description="Items per page", type=openapi.TYPE_INTEGER),
        openapi.Parameter('user', openapi.IN_QUERY, description="Filter by username", type=openapi.TYPE_STRING),
        openapi.Parameter('days', openapi.IN_QUERY, description="Filter by days (default: 30)", type=openapi.TYPE_INTEGER),
    ],
    responses={200: LoginLogSerializer(many=True)},
    operation_description="Get login logs and activities (Admin only)"
)
@api_view(['GET'])
@permission_classes([IsAdmin])
def admin_logs(request):
    """
    Get login logs and user activities.
    """
    # Get query parameters
    page = int(request.query_params.get('page', 1))
    limit = int(request.query_params.get('limit', 50))
    user_filter = request.query_params.get('user')
    days = int(request.query_params.get('days', 30))
    
    # Calculate date filter
    date_filter = timezone.now() - timedelta(days=days)
    
    # Base queryset
    logs = LoginLog.objects.select_related('user').filter(
        login_time__gte=date_filter
    )
    
    # Apply user filter
    if user_filter:
        logs = logs.filter(user__username__icontains=user_filter)
    
    # Order by most recent
    logs = logs.order_by('-login_time')
    
    # Pagination
    from django.core.paginator import Paginator
    paginator = Paginator(logs, limit)
    page_obj = paginator.get_page(page)
    
    # Serialize data
    serializer = LoginLogSerializer(page_obj, many=True)
    
    # Additional statistics
    stats = {
        'total_logs': paginator.count,
        'successful_logins': logs.filter(is_successful=True).count(),
        'failed_logins': logs.filter(is_successful=False).count(),
        'unique_users': logs.values('user').distinct().count(),
        'unique_ips': logs.values('ip_address').distinct().count(),
    }
    
    return Response({
        'results': serializer.data,
        'count': paginator.count,
        'num_pages': paginator.num_pages,
        'current_page': page_obj.number,
        'has_next': page_obj.has_next(),
        'has_previous': page_obj.has_previous(),
        'statistics': stats
    })


@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter('days', openapi.IN_QUERY, description="Number of days (default: 30)", type=openapi.TYPE_INTEGER),
    ],
    responses={200: openapi.Response(
        description="Activity timeline",
        schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'timeline': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            'date': openapi.Schema(type=openapi.TYPE_STRING),
                            'companies_created': openapi.Schema(type=openapi.TYPE_INTEGER),
                            'ipos_created': openapi.Schema(type=openapi.TYPE_INTEGER),
                            'documents_uploaded': openapi.Schema(type=openapi.TYPE_INTEGER),
                            'document_downloads': openapi.Schema(type=openapi.TYPE_INTEGER),
                            'user_logins': openapi.Schema(type=openapi.TYPE_INTEGER),
                        }
                    )
                )
            }
        )
    )},
    operation_description="Get activity timeline (Admin only)"
)
@api_view(['GET'])
@permission_classes([IsAdmin])
def activity_timeline(request):
    """
    Get activity timeline for the dashboard.
    """
    days = int(request.query_params.get('days', 30))
    
    timeline = []
    for i in range(days):
        date = timezone.now().date() - timedelta(days=i)
        next_date = date + timedelta(days=1)
        
        # Count activities for this date
        companies_created = Company.objects.filter(
            created_at__date=date
        ).count()
        
        ipos_created = IPO.objects.filter(
            created_at__date=date
        ).count()
        
        documents_uploaded = Document.objects.filter(
            uploaded_at__date=date
        ).count()
        
        document_downloads = DocumentDownloadLog.objects.filter(
            downloaded_at__date=date
        ).count()
        
        user_logins = LoginLog.objects.filter(
            login_time__date=date
        ).count()
        
        timeline.append({
            'date': date.isoformat(),
            'companies_created': companies_created,
            'ipos_created': ipos_created,
            'documents_uploaded': documents_uploaded,
            'document_downloads': document_downloads,
            'user_logins': user_logins,
        })
    
    # Reverse to show oldest first
    timeline.reverse()
    
    return Response({
        'timeline': timeline,
        'period_days': days
    })