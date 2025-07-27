"""
Notifications Models

Models for handling SMS notifications and app link requests
"""

from django.db import models
from django.utils import timezone


class AppLinkRequest(models.Model):
    """Model to track app link requests sent to mobile numbers"""
    
    phone_number = models.CharField(max_length=15, help_text="Mobile number to send app link")
    message = models.TextField(help_text="SMS message content")
    app_link = models.URLField(help_text="App download link")
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('sent', 'Sent'),
            ('failed', 'Failed'),
            ('delivered', 'Delivered'),
        ],
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sent_at = models.DateTimeField(null=True, blank=True)
    error_message = models.TextField(blank=True, help_text="Error message if sending failed")
    
    # SMS provider details
    provider = models.CharField(max_length=50, blank=True, help_text="SMS provider used")
    provider_message_id = models.CharField(max_length=100, blank=True, help_text="Provider's message ID")
    
    class Meta:
        db_table = 'app_link_requests'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['phone_number']),
            models.Index(fields=['status']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"App link request to {self.phone_number} - {self.status}"
    
    def mark_as_sent(self, provider_message_id=None):
        """Mark the request as sent"""
        self.status = 'sent'
        self.sent_at = timezone.now()
        if provider_message_id:
            self.provider_message_id = provider_message_id
        self.save()
    
    def mark_as_failed(self, error_message):
        """Mark the request as failed"""
        self.status = 'failed'
        self.error_message = error_message
        self.save()


class SMSTemplate(models.Model):
    """Model for SMS templates"""
    
    name = models.CharField(max_length=100, unique=True)
    template = models.TextField(help_text="SMS template with placeholders like {app_link}, {phone_number}")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'sms_templates'
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
    def render(self, **kwargs):
        """Render the template with provided context"""
        return self.template.format(**kwargs)


class SMSProvider(models.Model):
    """Model for SMS provider configurations"""
    
    name = models.CharField(max_length=50, unique=True)
    api_url = models.URLField()
    api_key = models.CharField(max_length=200)
    sender_id = models.CharField(max_length=20, blank=True)
    is_active = models.BooleanField(default=True)
    priority = models.IntegerField(default=1, help_text="Lower number = higher priority")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'sms_providers'
        ordering = ['priority', 'name']
    
    def __str__(self):
        return self.name