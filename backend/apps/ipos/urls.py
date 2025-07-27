"""
URL configuration for IPOs app.
"""
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.ipo_list_create, name='ipo-list-create'),
    path('search/', views.ipo_search, name='ipo-search'),
    path('statuses/', views.ipo_statuses, name='ipo-statuses'),
    path('stats/', views.ipo_stats, name='ipo-stats'),
    path('<int:pk>/', views.ipo_detail, name='ipo-detail'),
    
    # Document-related URLs will be handled by documents app
    path('<int:ipo_id>/', include('apps.documents.urls')),
]