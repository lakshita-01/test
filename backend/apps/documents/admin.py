"""
Admin configuration for documents app.
"""
from django.contrib import admin
from .models import Document, DocumentDownloadLog


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    """
    Admin configuration for Document model.
    """
    list_display = [
        'title', 'ipo', 'document_type', 'file_size_mb', 
        'download_count', 'is_public', 'uploaded_at'
    ]
    list_filter = ['document_type', 'is_public', 'uploaded_at']
    search_fields = ['title', 'ipo__ipo_name', 'ipo__company__name', 'description']
    ordering = ['-uploaded_at']
    readonly_fields = [
        'file_size', 'original_filename', 'file_extension', 
        'file_size_mb', 'download_count', 'uploaded_at', 'updated_at'
    ]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('ipo', 'document_type', 'title', 'description')
        }),
        ('File Information', {
            'fields': (
                'file', 'original_filename', 'file_size', 
                'file_size_mb', 'file_extension'
            )
        }),
        ('Access & Statistics', {
            'fields': ('is_public', 'download_count')
        }),
        ('Metadata', {
            'fields': ('uploaded_by', 'uploaded_at', 'updated_at')
        }),
    )


@admin.register(DocumentDownloadLog)
class DocumentDownloadLogAdmin(admin.ModelAdmin):
    """
    Admin configuration for DocumentDownloadLog model.
    """
    list_display = [
        'document', 'user', 'ip_address', 'downloaded_at'
    ]
    list_filter = ['downloaded_at', 'document__document_type']
    search_fields = [
        'document__title', 'document__ipo__ipo_name', 
        'user__username', 'ip_address'
    ]
    ordering = ['-downloaded_at']
    readonly_fields = ['document', 'user', 'ip_address', 'user_agent', 'downloaded_at']
    
    def has_add_permission(self, request):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False