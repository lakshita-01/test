"""
URL configuration for companies app.
"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.company_list_create, name='company-list-create'),
    path('<int:pk>/', views.company_detail, name='company-detail'),
    path('sectors/', views.company_sectors, name='company-sectors'),
]