"""
URL configuration for authentication app.
"""
from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('refresh/', views.refresh_token, name='refresh_token'),
    path('profile/', views.profile, name='profile'),
    path('verify/', views.verify_token, name='verify_token'),
]