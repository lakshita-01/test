"""
Notifications URLs

URL patterns for notifications app
"""

from django.urls import path
from . import views

app_name = 'notifications'

urlpatterns = [
    # App link endpoints
    path('send-app-link/', views.send_app_link, name='send_app_link'),
    path('app-link-status/<int:request_id>/', views.app_link_status, name='app_link_status'),
    path('app-link-requests/', views.AppLinkRequestListView.as_view(), name='app_link_requests'),
    
    # Testing endpoints
    path('test-sms/', views.test_sms_service, name='test_sms_service'),
]