"""
Serializers for document endpoints.
"""
from rest_framework import serializers
from django.conf import settings
from .models import Document, DocumentDownloadLog


class DocumentSerializer(serializers.ModelSerializer):
    """
    Serializer for document data.
    """
    document_type_display = serializers.CharField(source='get_document_type_display', read_only=True)
    file_extension = serializers.ReadOnlyField()
    file_size_mb = serializers.ReadOnlyField()
    download_url = serializers.ReadOnlyField()
    uploaded_by_username = serializers.CharField(source='uploaded_by.username', read_only=True)
    
    class Meta:
        model = Document
        fields = [
            'id', 'document_type', 'document_type_display', 'title', 'description',
            'file', 'file_size', 'file_size_mb', 'file_extension', 'original_filename',
            'is_public', 'download_url', 'download_count',
            'uploaded_by_username', 'uploaded_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'file_size', 'original_filename', 'download_count',
            'uploaded_at', 'updated_at'
        ]


class DocumentUploadSerializer(serializers.ModelSerializer):
    """
    Serializer for uploading documents.
    """
    class Meta:
        model = Document
        fields = [
            'document_type', 'title', 'description', 'file', 'is_public'
        ]
    
    def validate_file(self, value):
        """
        Validate uploaded file.
        """
        # Check file size
        if value.size > settings.MAX_UPLOAD_SIZE:
            max_size_mb = settings.MAX_UPLOAD_SIZE / (1024 * 1024)
            raise serializers.ValidationError(
                f"File size cannot exceed {max_size_mb}MB"
            )
        
        # Check file extension
        allowed_extensions = settings.ALLOWED_FILE_TYPES
        file_extension = value.name.split('.')[-1].lower()
        if file_extension not in allowed_extensions:
            raise serializers.ValidationError(
                f"File type not allowed. Allowed types: {', '.join(allowed_extensions)}"
            )
        
        return value
    
    def create(self, validated_data):
        """
        Create document instance with additional metadata.
        """
        file = validated_data['file']
        validated_data['file_size'] = file.size
        validated_data['original_filename'] = file.name
        
        # Set uploaded_by from request context
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['uploaded_by'] = request.user
        
        return super().create(validated_data)


class DocumentDownloadLogSerializer(serializers.ModelSerializer):
    """
    Serializer for document download logs.
    """
    document_title = serializers.CharField(source='document.title', read_only=True)
    document_type = serializers.CharField(source='document.document_type', read_only=True)
    user_username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = DocumentDownloadLog
        fields = [
            'id', 'document_title', 'document_type', 'ip_address',
            'user_agent', 'user_username', 'downloaded_at'
        ]
        read_only_fields = ['id', 'downloaded_at']