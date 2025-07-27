"""
Authentication views for the Bluestock IPO platform.
"""
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .serializers import LoginSerializer, UserSerializer, RefreshTokenSerializer
from .authentication import JWTTokenGenerator
from .models import LoginLog


@swagger_auto_schema(
    method='post',
    request_body=LoginSerializer,
    responses={
        200: openapi.Response(
            description="Login successful",
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'access_token': openapi.Schema(type=openapi.TYPE_STRING),
                    'refresh_token': openapi.Schema(type=openapi.TYPE_STRING),
                    'user': openapi.Schema(type=openapi.TYPE_OBJECT),
                }
            )
        ),
        400: openapi.Response(description="Invalid credentials"),
    },
    operation_description="Admin login endpoint that returns JWT tokens"
)
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """
    Admin login endpoint.
    """
    serializer = LoginSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.validated_data['user']
        
        # Generate tokens
        access_token = JWTTokenGenerator.generate_access_token(user)
        refresh_token = JWTTokenGenerator.generate_refresh_token(user)
        
        # Set user in request for middleware logging
        request.user = user
        
        return Response({
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user': UserSerializer(user).data,
            'message': 'Login successful'
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method='post',
    request_body=RefreshTokenSerializer,
    responses={
        200: openapi.Response(
            description="Token refreshed successfully",
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'access_token': openapi.Schema(type=openapi.TYPE_STRING),
                    'refresh_token': openapi.Schema(type=openapi.TYPE_STRING),
                }
            )
        ),
        400: openapi.Response(description="Invalid refresh token"),
    },
    operation_description="Refresh access token using refresh token"
)
@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token(request):
    """
    Refresh access token using refresh token.
    """
    serializer = RefreshTokenSerializer(data=request.data)
    
    if serializer.is_valid():
        refresh_token = serializer.validated_data['refresh_token']
        
        try:
            user = JWTTokenGenerator.verify_refresh_token(refresh_token)
            
            # Generate new tokens
            new_access_token = JWTTokenGenerator.generate_access_token(user)
            new_refresh_token = JWTTokenGenerator.generate_refresh_token(user)
            
            # Revoke old refresh token
            JWTTokenGenerator.revoke_refresh_token(refresh_token)
            
            return Response({
                'access_token': new_access_token,
                'refresh_token': new_refresh_token,
                'message': 'Token refreshed successfully'
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method='post',
    request_body=RefreshTokenSerializer,
    responses={
        200: openapi.Response(description="Logout successful"),
        400: openapi.Response(description="Invalid request"),
    },
    operation_description="Logout user and revoke refresh token"
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """
    Logout endpoint - revokes refresh token.
    """
    refresh_token = request.data.get('refresh_token')
    
    if refresh_token:
        JWTTokenGenerator.revoke_refresh_token(refresh_token)
    
    # Update login log with logout time
    try:
        login_log = LoginLog.objects.filter(
            user=request.user,
            logout_time__isnull=True
        ).order_by('-login_time').first()
        
        if login_log:
            from django.utils import timezone
            login_log.logout_time = timezone.now()
            login_log.save()
    except Exception:
        pass  # Don't fail logout if logging fails
    
    return Response({
        'message': 'Logout successful'
    }, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method='get',
    responses={
        200: openapi.Response(
            description="User profile",
            schema=UserSerializer
        ),
    },
    operation_description="Get current user profile"
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    """
    Get current user profile.
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method='get',
    responses={
        200: openapi.Response(description="Token is valid"),
        401: openapi.Response(description="Token is invalid"),
    },
    operation_description="Verify if the current token is valid"
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verify_token(request):
    """
    Verify if the current token is valid.
    """
    return Response({
        'valid': True,
        'user': UserSerializer(request.user).data
    }, status=status.HTTP_200_OK)