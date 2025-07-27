"""
URL configuration for IPOs app.
"""
from django.urls import path, include
from . import views

urlpatterns = [
    # IPO Routes as per specification
    path('', views.ipo_list_create, name='ipo-list-create'),  # GET/POST /api/ipos
    path('search/', views.ipo_search, name='ipo-search'),     # GET /api/ipos/search
    path('<int:pk>/', views.ipo_detail, name='ipo-detail'),   # GET/PUT/DELETE /api/ipos/:id
    
    # Document Upload/Download Routes as per specification
    path('<int:pk>/upload/', views.upload_document, name='ipo-upload-document'),      # POST /api/ipos/:id/upload
    path('<int:pk>/download/', views.download_document, name='ipo-download-document'), # GET /api/ipos/:id/download
    path('<int:pk>/delete-doc/', views.delete_document, name='ipo-delete-document'),   # DELETE /api/ipos/:id/delete-doc
    
    # Additional utility routes
    path('statuses/', views.ipo_statuses, name='ipo-statuses'),
    path('stats/', views.ipo_stats, name='ipo-stats'),
]