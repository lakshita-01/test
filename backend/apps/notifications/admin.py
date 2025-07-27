"""
Notifications Admin

Admin configuration for notifications app
"""

from django.contrib import admin
from django.utils.html import format_html
from .models import AppLinkRequest, SMSTemplate, SMSProvider


@admin.register(AppLinkRequest)
class AppLinkRequestAdmin(admin.ModelAdmin):
    """Admin for app link requests"""
    
    list_display = [
        'phone_number', 
        'status_badge', 
        'created_at', 
        'sent_at', 
        'provider',
        'view_message'
    ]
    list_filter = ['status', 'provider', 'created_at']
    search_fields = ['phone_number', 'provider_message_id']
    readonly_fields = ['created_at', 'updated_at', 'sent_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Request Details', {
            'fields': ('phone_number', 'app_link', 'message')
        }),
        ('Status', {
            'fields': ('status', 'error_message')
        }),
        ('Provider Details', {
            'fields': ('provider', 'provider_message_id')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'sent_at'),
            'classes': ('collapse',)
        }),
    )
    
    def status_badge(self, obj):
        """Display status with color coding"""
        colors = {
            'pending': '#ffc107',
            'sent': '#28a745',
            'failed': '#dc3545',
            'delivered': '#17a2b8'
        }
        color = colors.get(obj.status, '#6c757d')
        return format_html(
            '<span style="color: {}; font-weight: bold;">{}</span>',
            color,
            obj.status.upper()
        )
    status_badge.short_description = 'Status'
    
    def view_message(self, obj):
        """Display truncated message"""
        if obj.message:
            return obj.message[:50] + '...' if len(obj.message) > 50 else obj.message
        return '-'
    view_message.short_description = 'Message'


@admin.register(SMSTemplate)
class SMSTemplateAdmin(admin.ModelAdmin):
    """Admin for SMS templates"""
    
    list_display = ['name', 'is_active', 'created_at', 'updated_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'template']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Template Details', {
            'fields': ('name', 'template', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(SMSProvider)
class SMSProviderAdmin(admin.ModelAdmin):
    """Admin for SMS providers"""
    
    list_display = ['name', 'is_active', 'priority', 'sender_id', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'sender_id']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['priority', 'name']
    
    fieldsets = (
        ('Provider Details', {
            'fields': ('name', 'api_url', 'sender_id', 'is_active', 'priority')
        }),
        ('API Configuration', {
            'fields': ('api_key',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_form(self, request, obj=None, **kwargs):
        """Customize form to hide API key"""
        form = super().get_form(request, obj, **kwargs)
        if 'api_key' in form.base_fields:
            form.base_fields['api_key'].widget.attrs['type'] = 'password'
        return form