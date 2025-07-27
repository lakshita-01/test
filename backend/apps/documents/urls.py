"""
URL configuration for documents app.
"""
from django.urls import path
from . import views

urlpatterns = [
    path('upload/', views.upload_document, name='upload-document'),
    path('download/', views.download_document, name='download-document'),
    path('delete-doc/', views.delete_document, name='delete-document'),
    path('documents/', views.list_documents, name='list-documents'),
]