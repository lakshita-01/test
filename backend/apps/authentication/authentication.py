"""
JWT Authentication implementation for the Bluestock IPO platform.
"""
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import RefreshToken

User = get_user_model()


class JWTAuthentication(BaseAuthentication):
    """
    Custom JWT Authentication class.
    """
    
    def authenticate(self, request):
        """
        Authenticate the request and return a two-tuple of (user, token).
        """
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        
        if not auth_header or not auth_header.startswith('Bearer '):
            return None
        
        try:
            token = auth_header.split(' ')[1]
            payload = jwt.decode(
                token, 
                settings.JWT_SECRET_KEY, 
                algorithms=[settings.JWT_ALGORITHM]
            )
            
            user_id = payload.get('user_id')
            if not user_id:
                raise AuthenticationFailed('Invalid token payload')
            
            user = User.objects.get(id=user_id, is_active=True)
            return (user, token)
            
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token')
        except User.DoesNotExist:
            raise AuthenticationFailed('User not found')
        except Exception as e:
            raise AuthenticationFailed(f'Authentication failed: {str(e)}')
    
    def authenticate_header(self, request):
        """
        Return a string to be used as the value of the `WWW-Authenticate`
        header in a `401 Unauthenticated` response.
        """
        return 'Bearer'


class JWTTokenGenerator:
    """
    Utility class for generating and managing JWT tokens.
    """
    
    @staticmethod
    def generate_access_token(user):
        """
        Generate an access token for the given user.
        """
        payload = {
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role,
            'exp': datetime.utcnow() + timedelta(seconds=settings.JWT_ACCESS_TOKEN_LIFETIME),
            'iat': datetime.utcnow(),
            'type': 'access'
        }
        
        return jwt.encode(
            payload, 
            settings.JWT_SECRET_KEY, 
            algorithm=settings.JWT_ALGORITHM
        )
    
    @staticmethod
    def generate_refresh_token(user):
        """
        Generate a refresh token for the given user.
        """
        # Revoke existing refresh tokens
        RefreshToken.objects.filter(user=user, is_revoked=False).update(is_revoked=True)
        
        payload = {
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(seconds=settings.JWT_REFRESH_TOKEN_LIFETIME),
            'iat': datetime.utcnow(),
            'type': 'refresh'
        }
        
        token = jwt.encode(
            payload, 
            settings.JWT_SECRET_KEY, 
            algorithm=settings.JWT_ALGORITHM
        )
        
        # Store refresh token in database
        RefreshToken.objects.create(
            user=user,
            token=token,
            expires_at=datetime.utcnow() + timedelta(seconds=settings.JWT_REFRESH_TOKEN_LIFETIME)
        )
        
        return token
    
    @staticmethod
    def verify_refresh_token(token):
        """
        Verify and decode a refresh token.
        """
        try:
            payload = jwt.decode(
                token, 
                settings.JWT_SECRET_KEY, 
                algorithms=[settings.JWT_ALGORITHM]
            )
            
            if payload.get('type') != 'refresh':
                raise jwt.InvalidTokenError('Invalid token type')
            
            # Check if token exists in database and is valid
            refresh_token = RefreshToken.objects.get(token=token, is_revoked=False)
            if refresh_token.is_expired:
                raise jwt.ExpiredSignatureError('Token has expired')
            
            user = User.objects.get(id=payload['user_id'], is_active=True)
            return user
            
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, RefreshToken.DoesNotExist, User.DoesNotExist):
            raise AuthenticationFailed('Invalid or expired refresh token')
    
    @staticmethod
    def revoke_refresh_token(token):
        """
        Revoke a refresh token.
        """
        try:
            RefreshToken.objects.filter(token=token).update(is_revoked=True)
        except RefreshToken.DoesNotExist:
            pass