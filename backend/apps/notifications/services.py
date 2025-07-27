"""
SMS Service

Service for sending SMS notifications through various providers
"""

import requests
import logging
from django.conf import settings
from typing import Dict, Any

logger = logging.getLogger(__name__)


class SMSService:
    """Service for sending SMS notifications"""
    
    def __init__(self):
        self.providers = self._get_available_providers()
    
    def _get_available_providers(self) -> list:
        """Get list of available SMS providers"""
        providers = []
        
        # Add providers based on settings
        if hasattr(settings, 'SMS_PROVIDERS'):
            providers = settings.SMS_PROVIDERS
        else:
            # Default mock provider for development
            providers = [{
                'name': 'mock',
                'priority': 1,
                'active': True
            }]
        
        return sorted(providers, key=lambda x: x.get('priority', 999))
    
    def send_sms(self, phone_number: str, message: str, request_id: int = None) -> Dict[str, Any]:
        """
        Send SMS using the first available provider
        
        Args:
            phone_number: Mobile number to send SMS to
            message: SMS message content
            request_id: Optional request ID for tracking
        
        Returns:
            Dict with success status and details
        """
        
        # Try each provider in priority order
        for provider in self.providers:
            if not provider.get('active', True):
                continue
            
            try:
                result = self._send_via_provider(provider, phone_number, message, request_id)
                if result['success']:
                    return result
                else:
                    logger.warning(f"Provider {provider['name']} failed: {result.get('error')}")
            except Exception as e:
                logger.error(f"Error with provider {provider['name']}: {str(e)}")
                continue
        
        return {
            'success': False,
            'error': 'All SMS providers failed',
            'provider': None
        }
    
    def _send_via_provider(self, provider: dict, phone_number: str, message: str, request_id: int = None) -> Dict[str, Any]:
        """Send SMS via specific provider"""
        
        provider_name = provider['name'].lower()
        
        if provider_name == 'mock':
            return self._send_via_mock(phone_number, message, request_id)
        elif provider_name == 'twilio':
            return self._send_via_twilio(provider, phone_number, message, request_id)
        elif provider_name == 'textlocal':
            return self._send_via_textlocal(provider, phone_number, message, request_id)
        elif provider_name == 'msg91':
            return self._send_via_msg91(provider, phone_number, message, request_id)
        else:
            return {
                'success': False,
                'error': f'Unknown provider: {provider_name}',
                'provider': provider_name
            }
    
    def _send_via_mock(self, phone_number: str, message: str, request_id: int = None) -> Dict[str, Any]:
        """Mock SMS provider for development/testing"""
        
        logger.info(f"MOCK SMS - To: {phone_number}, Message: {message[:50]}...")
        
        # Simulate success/failure based on phone number
        if phone_number.endswith('0000'):
            return {
                'success': False,
                'error': 'Mock failure for testing',
                'provider': 'mock'
            }
        
        return {
            'success': True,
            'message_id': f'mock_{request_id or "test"}_{phone_number[-4:]}',
            'provider': 'mock',
            'details': 'SMS sent successfully via mock provider'
        }
    
    def _send_via_twilio(self, provider: dict, phone_number: str, message: str, request_id: int = None) -> Dict[str, Any]:
        """Send SMS via Twilio"""
        
        try:
            from twilio.rest import Client
            
            account_sid = provider.get('account_sid')
            auth_token = provider.get('auth_token')
            from_number = provider.get('from_number')
            
            if not all([account_sid, auth_token, from_number]):
                return {
                    'success': False,
                    'error': 'Missing Twilio configuration',
                    'provider': 'twilio'
                }
            
            client = Client(account_sid, auth_token)
            
            # Format phone number for Twilio
            to_number = f"+{phone_number}"
            
            message_obj = client.messages.create(
                body=message,
                from_=from_number,
                to=to_number
            )
            
            return {
                'success': True,
                'message_id': message_obj.sid,
                'provider': 'twilio',
                'details': f'SMS sent via Twilio to {to_number}'
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': f'Twilio error: {str(e)}',
                'provider': 'twilio'
            }
    
    def _send_via_textlocal(self, provider: dict, phone_number: str, message: str, request_id: int = None) -> Dict[str, Any]:
        """Send SMS via TextLocal"""
        
        try:
            api_key = provider.get('api_key')
            sender = provider.get('sender', 'BLUESTOCK')
            
            if not api_key:
                return {
                    'success': False,
                    'error': 'Missing TextLocal API key',
                    'provider': 'textlocal'
                }
            
            url = 'https://api.textlocal.in/send/'
            
            data = {
                'apikey': api_key,
                'numbers': phone_number,
                'message': message,
                'sender': sender
            }
            
            response = requests.post(url, data=data, timeout=30)
            response.raise_for_status()
            
            result = response.json()
            
            if result.get('status') == 'success':
                return {
                    'success': True,
                    'message_id': result.get('messages', [{}])[0].get('id'),
                    'provider': 'textlocal',
                    'details': 'SMS sent via TextLocal'
                }
            else:
                return {
                    'success': False,
                    'error': result.get('errors', [{}])[0].get('message', 'Unknown TextLocal error'),
                    'provider': 'textlocal'
                }
        
        except Exception as e:
            return {
                'success': False,
                'error': f'TextLocal error: {str(e)}',
                'provider': 'textlocal'
            }
    
    def _send_via_msg91(self, provider: dict, phone_number: str, message: str, request_id: int = None) -> Dict[str, Any]:
        """Send SMS via MSG91"""
        
        try:
            auth_key = provider.get('auth_key')
            sender_id = provider.get('sender_id', 'BLUESTOCK')
            route = provider.get('route', '4')
            
            if not auth_key:
                return {
                    'success': False,
                    'error': 'Missing MSG91 auth key',
                    'provider': 'msg91'
                }
            
            url = 'https://api.msg91.com/api/sendhttp.php'
            
            params = {
                'authkey': auth_key,
                'mobiles': phone_number,
                'message': message,
                'sender': sender_id,
                'route': route,
                'response': 'json'
            }
            
            response = requests.get(url, params=params, timeout=30)
            response.raise_for_status()
            
            result = response.json()
            
            if result.get('type') == 'success':
                return {
                    'success': True,
                    'message_id': result.get('message'),
                    'provider': 'msg91',
                    'details': 'SMS sent via MSG91'
                }
            else:
                return {
                    'success': False,
                    'error': result.get('message', 'Unknown MSG91 error'),
                    'provider': 'msg91'
                }
        
        except Exception as e:
            return {
                'success': False,
                'error': f'MSG91 error: {str(e)}',
                'provider': 'msg91'
            }