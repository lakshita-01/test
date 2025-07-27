"""
Admin configuration for authentication app.
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, LoginLog, RefreshToken


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """
    Admin configuration for User model.
    """
    list_display = ['username', 'email', 'first_name', 'last_name', 'role', 'is_active', 'created_at']
    list_filter = ['role', 'is_active', 'created_at']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering = ['-created_at']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {
            'fields': ('role', 'created_at', 'updated_at')
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']


@admin.register(LoginLog)
class LoginLogAdmin(admin.ModelAdmin):
    """
    Admin configuration for LoginLog model.
    """
    list_display = ['user', 'ip_address', 'login_time', 'logout_time', 'is_successful']
    list_filter = ['is_successful', 'login_time']
    search_fields = ['user__username', 'user__email', 'ip_address']
    ordering = ['-login_time']
    readonly_fields = ['user', 'ip_address', 'user_agent', 'login_time', 'logout_time', 'is_successful']
    
    def has_add_permission(self, request):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False


@admin.register(RefreshToken)
class RefreshTokenAdmin(admin.ModelAdmin):
    """
    Admin configuration for RefreshToken model.
    """
    list_display = ['user', 'created_at', 'expires_at', 'is_revoked']
    list_filter = ['is_revoked', 'created_at', 'expires_at']
    search_fields = ['user__username', 'user__email']
    ordering = ['-created_at']
    readonly_fields = ['user', 'token', 'created_at', 'expires_at']
    
    def has_add_permission(self, request):
        return False