"""
Authentication middleware for the Bluestock IPO platform.
"""
from django.utils.deprecation import MiddlewareMixin
from django.contrib.auth import get_user_model
from .models import LoginLog

User = get_user_model()


class JWTAuthenticationMiddleware(MiddlewareMixin):
    """
    Middleware to handle JWT authentication and logging.
    """
    
    def process_request(self, request):
        """
        Process the request to extract user information from JWT token.
        """
        # Get client IP address
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        
        request.client_ip = ip
        request.user_agent = request.META.get('HTTP_USER_AGENT', '')
        
        return None
    
    def process_response(self, request, response):
        """
        Process the response to log authentication events.
        """
        # Log successful login attempts
        if (hasattr(request, 'user') and 
            request.user.is_authenticated and 
            request.path == '/api/auth/login/' and 
            request.method == 'POST' and 
            response.status_code == 200):
            
            LoginLog.objects.create(
                user=request.user,
                ip_address=getattr(request, 'client_ip', '127.0.0.1'),
                user_agent=getattr(request, 'user_agent', ''),
                is_successful=True
            )
        
        return response