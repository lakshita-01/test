"""
Notifications Views

Views for handling app link requests and SMS notifications
"""

from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.utils import timezone
from django.conf import settings
import logging
import requests
import json

from .models import AppLinkRequest, SMSTemplate
from .serializers import SendAppLinkSerializer, AppLinkRequestSerializer
from .services import SMSService

logger = logging.getLogger(__name__)


@api_view(['POST'])
@permission_classes([AllowAny])
def send_app_link(request):
    """
    Send app download link to mobile number via SMS
    """
    try:
        serializer = SendAppLinkSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response({
                'success': False,
                'message': 'Invalid data provided',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        validated_data = serializer.validated_data
        phone_number = validated_data['phone_number']
        message = validated_data['message']
        app_link = validated_data['app_link']
        
        # Create app link request record
        app_link_request = AppLinkRequest.objects.create(
            phone_number=phone_number,
            message=message,
            app_link=app_link,
            status='pending'
        )
        
        # Initialize SMS service
        sms_service = SMSService()
        
        # Send SMS
        result = sms_service.send_sms(
            phone_number=phone_number,
            message=message,
            request_id=app_link_request.id
        )
        
        if result['success']:
            app_link_request.mark_as_sent(result.get('message_id'))
            
            return Response({
                'success': True,
                'message': 'App link sent successfully to your mobile number!',
                'request_id': app_link_request.id
            }, status=status.HTTP_200_OK)
        else:
            app_link_request.mark_as_failed(result.get('error', 'Unknown error'))
            
            return Response({
                'success': False,
                'message': result.get('error', 'Failed to send app link. Please try again.'),
                'request_id': app_link_request.id
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    except Exception as e:
        logger.error(f"Error sending app link: {str(e)}")
        return Response({
            'success': False,
            'message': 'An unexpected error occurred. Please try again later.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
def app_link_status(request, request_id):
    """
    Get status of app link request
    """
    try:
        app_link_request = AppLinkRequest.objects.get(id=request_id)
        serializer = AppLinkRequestSerializer(app_link_request)
        
        return Response({
            'success': True,
            'data': serializer.data
        }, status=status.HTTP_200_OK)
    
    except AppLinkRequest.DoesNotExist:
        return Response({
            'success': False,
            'message': 'App link request not found'
        }, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        logger.error(f"Error getting app link status: {str(e)}")
        return Response({
            'success': False,
            'message': 'An unexpected error occurred'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AppLinkRequestListView(generics.ListAPIView):
    """
    List all app link requests (for admin)
    """
    queryset = AppLinkRequest.objects.all()
    serializer_class = AppLinkRequestSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by phone number if provided
        phone_number = self.request.query_params.get('phone_number')
        if phone_number:
            queryset = queryset.filter(phone_number__icontains=phone_number)
        
        # Filter by status if provided
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        return queryset


@api_view(['POST'])
@permission_classes([AllowAny])
def test_sms_service(request):
    """
    Test SMS service endpoint (for development/testing)
    """
    if not settings.DEBUG:
        return Response({
            'success': False,
            'message': 'This endpoint is only available in debug mode'
        }, status=status.HTTP_403_FORBIDDEN)
    
    try:
        phone_number = request.data.get('phone_number')
        message = request.data.get('message', 'Test message from Bluestock')
        
        if not phone_number:
            return Response({
                'success': False,
                'message': 'Phone number is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Initialize SMS service
        sms_service = SMSService()
        
        # Send test SMS
        result = sms_service.send_sms(
            phone_number=phone_number,
            message=message
        )
        
        return Response({
            'success': result['success'],
            'message': result.get('message', 'Test completed'),
            'details': result
        }, status=status.HTTP_200_OK if result['success'] else status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    except Exception as e:
        logger.error(f"Error testing SMS service: {str(e)}")
        return Response({
            'success': False,
            'message': f'Test failed: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)