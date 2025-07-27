"""
Serializers for IPO endpoints.
"""
from rest_framework import serializers
from apps.companies.serializers import CompanyListSerializer
from .models import IPO, IPOSubscription, IPOTimeline


class IPOTimelineSerializer(serializers.ModelSerializer):
    """
    Serializer for IPO timeline events.
    """
    event_type_display = serializers.CharField(source='get_event_type_display', read_only=True)
    
    class Meta:
        model = IPOTimeline
        fields = [
            'id', 'event_type', 'event_type_display', 'event_date', 
            'description', 'is_completed', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class IPOSubscriptionSerializer(serializers.ModelSerializer):
    """
    Serializer for IPO subscription data.
    """
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = IPOSubscription
        fields = [
            'id', 'category', 'category_display', 'shares_offered', 
            'shares_applied', 'applications_received', 'subscription_rate', 
            'updated_at'
        ]
        read_only_fields = ['id', 'subscription_rate', 'updated_at']


class IPOSerializer(serializers.ModelSerializer):
    """
    Detailed serializer for IPO data.
    """
    company = CompanyListSerializer(read_only=True)
    company_id = serializers.IntegerField(write_only=True)
    
    # Calculated fields
    price_band = serializers.ReadOnlyField()
    min_investment = serializers.ReadOnlyField()
    max_investment = serializers.ReadOnlyField()
    days_to_open = serializers.ReadOnlyField()
    days_to_close = serializers.ReadOnlyField()
    is_open = serializers.ReadOnlyField()
    
    # Related data
    subscriptions = IPOSubscriptionSerializer(many=True, read_only=True)
    timeline = IPOTimelineSerializer(many=True, read_only=True)
    
    # Document info
    has_rhp = serializers.SerializerMethodField()
    has_drhp = serializers.SerializerMethodField()
    
    class Meta:
        model = IPO
        fields = [
            'id', 'company', 'company_id', 'ipo_name', 'ipo_type',
            'price_band_min', 'price_band_max', 'price_band', 'lot_size',
            'issue_size', 'fresh_issue_size', 'ofs_size',
            'ipo_open_date', 'ipo_close_date', 'listing_date', 'allotment_date',
            'status', 'subscription_rate', 'listing_price',
            'description', 'objectives', 'registrar', 'lead_managers',
            'risk_factors', 'min_investment', 'max_investment',
            'days_to_open', 'days_to_close', 'is_open',
            'has_rhp', 'has_drhp', 'subscriptions', 'timeline',
            'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_has_rhp(self, obj):
        """Check if IPO has RHP document."""
        return obj.documents.filter(document_type='rhp').exists()
    
    def get_has_drhp(self, obj):
        """Check if IPO has DRHP document."""
        return obj.documents.filter(document_type='drhp').exists()
    
    def validate(self, attrs):
        """Validate IPO data."""
        if attrs.get('price_band_min') and attrs.get('price_band_max'):
            if attrs['price_band_min'] >= attrs['price_band_max']:
                raise serializers.ValidationError(
                    "Minimum price must be less than maximum price"
                )
        
        if attrs.get('ipo_open_date') and attrs.get('ipo_close_date'):
            if attrs['ipo_open_date'] >= attrs['ipo_close_date']:
                raise serializers.ValidationError(
                    "Open date must be before close date"
                )
        
        return attrs


class IPOListSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for IPO list view.
    """
    company = CompanyListSerializer(read_only=True)
    price_band = serializers.ReadOnlyField()
    min_investment = serializers.ReadOnlyField()
    days_to_open = serializers.ReadOnlyField()
    days_to_close = serializers.ReadOnlyField()
    is_open = serializers.ReadOnlyField()
    has_rhp = serializers.SerializerMethodField()
    has_drhp = serializers.SerializerMethodField()
    
    class Meta:
        model = IPO
        fields = [
            'id', 'company', 'ipo_name', 'price_band', 'lot_size',
            'issue_size', 'ipo_open_date', 'ipo_close_date', 'listing_date',
            'status', 'subscription_rate', 'min_investment',
            'days_to_open', 'days_to_close', 'is_open',
            'has_rhp', 'has_drhp'
        ]
    
    def get_has_rhp(self, obj):
        """Check if IPO has RHP document."""
        return obj.documents.filter(document_type='rhp').exists()
    
    def get_has_drhp(self, obj):
        """Check if IPO has DRHP document."""
        return obj.documents.filter(document_type='drhp').exists()


class IPOCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating and updating IPOs.
    """
    class Meta:
        model = IPO
        fields = [
            'company', 'ipo_name', 'ipo_type',
            'price_band_min', 'price_band_max', 'lot_size',
            'issue_size', 'fresh_issue_size', 'ofs_size',
            'ipo_open_date', 'ipo_close_date', 'listing_date', 'allotment_date',
            'status', 'subscription_rate', 'listing_price',
            'description', 'objectives', 'registrar', 'lead_managers',
            'risk_factors', 'is_active'
        ]
    
    def validate(self, attrs):
        """Validate IPO data."""
        if attrs.get('price_band_min') and attrs.get('price_band_max'):
            if attrs['price_band_min'] >= attrs['price_band_max']:
                raise serializers.ValidationError(
                    "Minimum price must be less than maximum price"
                )
        
        if attrs.get('ipo_open_date') and attrs.get('ipo_close_date'):
            if attrs['ipo_open_date'] >= attrs['ipo_close_date']:
                raise serializers.ValidationError(
                    "Open date must be before close date"
                )
        
        if attrs.get('listing_date') and attrs.get('ipo_close_date'):
            if attrs['listing_date'] <= attrs['ipo_close_date']:
                raise serializers.ValidationError(
                    "Listing date must be after close date"
                )
        
        return attrs