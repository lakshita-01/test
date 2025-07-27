"""
URL configuration for admin dashboard app.
"""
from django.urls import path
from . import views

urlpatterns = [
    path('stats/', views.dashboard_stats, name='dashboard-stats'),
    path('logs/', views.admin_logs, name='admin-logs'),
    path('activity/', views.activity_timeline, name='activity-timeline'),
]