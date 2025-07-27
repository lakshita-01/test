"""
Notifications Serializers

Serializers for handling app link requests and SMS notifications
"""

from rest_framework import serializers
import re
from .models import AppLinkRequest, SMSTemplate


class AppLinkRequestSerializer(serializers.ModelSerializer):
    """Serializer for app link requests"""
    
    class Meta:
        model = AppLinkRequest
        fields = ['id', 'phone_number', 'message', 'app_link', 'status', 'created_at', 'sent_at']
        read_only_fields = ['id', 'status', 'created_at', 'sent_at']
    
    def validate_phone_number(self, value):
        """Validate phone number format"""
        # Remove any non-digit characters
        cleaned_number = re.sub(r'\D', '', value)
        
        # Check if it's a valid Indian mobile number
        if len(cleaned_number) == 10:
            # Add country code
            cleaned_number = '91' + cleaned_number
        elif len(cleaned_number) == 12 and cleaned_number.startswith('91'):
            # Already has country code
            pass
        else:
            raise serializers.ValidationError("Please enter a valid 10-digit mobile number")
        
        # Validate Indian mobile number pattern
        if not re.match(r'^91[6-9]\d{9}$', cleaned_number):
            raise serializers.ValidationError("Please enter a valid Indian mobile number")
        
        return cleaned_number


class SendAppLinkSerializer(serializers.Serializer):
    """Serializer for sending app link requests"""
    
    phone_number = serializers.CharField(max_length=15)
    message = serializers.CharField(required=False)
    app_link = serializers.URLField(required=False)
    
    def validate_phone_number(self, value):
        """Validate phone number format"""
        # Remove any non-digit characters
        cleaned_number = re.sub(r'\D', '', value)
        
        # Check if it's a valid Indian mobile number
        if len(cleaned_number) == 10:
            # Add country code
            cleaned_number = '91' + cleaned_number
        elif len(cleaned_number) == 12 and cleaned_number.startswith('91'):
            # Already has country code
            pass
        else:
            raise serializers.ValidationError("Please enter a valid 10-digit mobile number")
        
        # Validate Indian mobile number pattern
        if not re.match(r'^91[6-9]\d{9}$', cleaned_number):
            raise serializers.ValidationError("Please enter a valid Indian mobile number")
        
        return cleaned_number
    
    def validate(self, attrs):
        """Validate the entire payload"""
        # Set default app link if not provided
        if not attrs.get('app_link'):
            attrs['app_link'] = 'https://play.google.com/store/apps/details?id=in.bluestock.app'
        
        # Set default message if not provided
        if not attrs.get('message'):
            attrs['message'] = f"Download the Bluestock App and start your investment journey today! {attrs['app_link']}"
        
        return attrs


class SMSTemplateSerializer(serializers.ModelSerializer):
    """Serializer for SMS templates"""
    
    class Meta:
        model = SMSTemplate
        fields = ['id', 'name', 'template', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']