"""
Document models for the Bluestock IPO platform.
"""
import os
from django.db import models
from django.core.validators import FileExtensionValidator
from django.conf import settings
from apps.ipos.models import IPO


def document_upload_path(instance, filename):
    """
    Generate upload path for documents.
    """
    # Create path: uploads/documents/ipo_id/document_type/filename
    return f'documents/ipo_{instance.ipo.id}/{instance.document_type}/{filename}'


class Document(models.Model):
    """
    Model for storing IPO-related documents (RHP, DRHP, etc.).
    """
    DOCUMENT_TYPE_CHOICES = [
        ('rhp', 'Red Herring Prospectus'),
        ('drhp', 'Draft Red Herring Prospectus'),
        ('prospectus', 'Final Prospectus'),
        ('addendum', 'Addendum'),
        ('corrigendum', 'Corrigendum'),
        ('other', 'Other Document'),
    ]
    
    ipo = models.ForeignKey(
        IPO, 
        on_delete=models.CASCADE, 
        related_name='documents'
    )
    document_type = models.CharField(max_length=20, choices=DOCUMENT_TYPE_CHOICES)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    
    # File information
    file = models.FileField(
        upload_to=document_upload_path,
        validators=[FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx'])],
        help_text="Allowed formats: PDF, DOC, DOCX"
    )
    file_size = models.PositiveIntegerField(help_text="File size in bytes")
    original_filename = models.CharField(max_length=255)
    
    # Access control
    is_public = models.BooleanField(
        default=True, 
        help_text="Whether the document is publicly accessible"
    )
    
    # Metadata
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='uploaded_documents'
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Download tracking
    download_count = models.PositiveIntegerField(default=0)
    
    class Meta:
        db_table = 'documents'
        verbose_name = 'Document'
        verbose_name_plural = 'Documents'
        ordering = ['-uploaded_at']
        unique_together = ['ipo', 'document_type']  # One document per type per IPO
    
    def __str__(self):
        return f"{self.ipo.company.name} - {self.get_document_type_display()}"
    
    @property
    def file_extension(self):
        """Get file extension."""
        return os.path.splitext(self.original_filename)[1].lower()
    
    @property
    def file_size_mb(self):
        """Get file size in MB."""
        return round(self.file_size / (1024 * 1024), 2)
    
    @property
    def download_url(self):
        """Get download URL for the document."""
        return f"/api/ipos/{self.ipo.id}/download/?doc_type={self.document_type}"
    
    def increment_download_count(self):
        """Increment download count."""
        self.download_count += 1
        self.save(update_fields=['download_count'])
    
    def delete(self, *args, **kwargs):
        """Delete file when model instance is deleted."""
        if self.file:
            if os.path.isfile(self.file.path):
                os.remove(self.file.path)
        super().delete(*args, **kwargs)


class DocumentDownloadLog(models.Model):
    """
    Model to track document downloads.
    """
    document = models.ForeignKey(
        Document, 
        on_delete=models.CASCADE, 
        related_name='download_logs'
    )
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    downloaded_at = models.DateTimeField(auto_now_add=True)
    
    # Optional user tracking (if user is logged in)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='document_downloads'
    )
    
    class Meta:
        db_table = 'document_download_logs'
        verbose_name = 'Document Download Log'
        verbose_name_plural = 'Document Download Logs'
        ordering = ['-downloaded_at']
    
    def __str__(self):
        return f"{self.document.title} - {self.downloaded_at}"