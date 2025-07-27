"""
Serializers for authentication endpoints.
"""
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from .models import LoginLog

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login.
    """
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=128, write_only=True)
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            
            if not user:
                raise serializers.ValidationError('Invalid credentials')
            
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled')
            
            attrs['user'] = user
            return attrs
        else:
            raise serializers.ValidationError('Must include username and password')


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for user information.
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'is_active', 'created_at']
        read_only_fields = ['id', 'created_at']


class RefreshTokenSerializer(serializers.Serializer):
    """
    Serializer for refresh token.
    """
    refresh_token = serializers.CharField()


class LoginLogSerializer(serializers.ModelSerializer):
    """
    Serializer for login logs.
    """
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = LoginLog
        fields = ['id', 'user', 'ip_address', 'user_agent', 'login_time', 'logout_time', 'is_successful']
        read_only_fields = ['id', 'login_time']