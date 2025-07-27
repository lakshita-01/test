"""
Serializers for company endpoints.
"""
from rest_framework import serializers
from .models import Company, CompanyFinancial


class CompanyFinancialSerializer(serializers.ModelSerializer):
    """
    Serializer for company financial data.
    """
    class Meta:
        model = CompanyFinancial
        fields = [
            'id', 'financial_year', 'revenue', 'net_profit', 
            'total_assets', 'total_liabilities', 'debt_to_equity',
            'return_on_equity', 'profit_margin', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class CompanySerializer(serializers.ModelSerializer):
    """
    Serializer for company data.
    """
    financials = CompanyFinancialSerializer(many=True, read_only=True)
    total_ipos = serializers.ReadOnlyField()
    active_ipos = serializers.ReadOnlyField()
    
    class Meta:
        model = Company
        fields = [
            'id', 'name', 'description', 'sector', 'founded_year',
            'headquarters', 'website', 'cin', 'market_cap',
            'contact_email', 'contact_phone', 'ceo_name', 'cfo_name',
            'is_active', 'total_ipos', 'active_ipos', 'financials',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'total_ipos', 'active_ipos', 'created_at', 'updated_at']
    
    def validate_cin(self, value):
        """
        Validate CIN format.
        """
        if not value:
            return value
        
        # CIN format: L12345AB1234CDE123456
        if len(value) != 21:
            raise serializers.ValidationError("CIN must be exactly 21 characters long")
        
        return value.upper()


class CompanyListSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for company list view.
    """
    total_ipos = serializers.ReadOnlyField()
    active_ipos = serializers.ReadOnlyField()
    
    class Meta:
        model = Company
        fields = [
            'id', 'name', 'sector', 'headquarters', 'website',
            'market_cap', 'total_ipos', 'active_ipos', 'is_active'
        ]


class CompanyCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating and updating companies.
    """
    class Meta:
        model = Company
        fields = [
            'name', 'description', 'sector', 'founded_year',
            'headquarters', 'website', 'cin', 'market_cap',
            'contact_email', 'contact_phone', 'ceo_name', 'cfo_name',
            'is_active'
        ]
    
    def validate_name(self, value):
        """
        Validate company name uniqueness.
        """
        if self.instance:
            # Update case - exclude current instance
            if Company.objects.exclude(id=self.instance.id).filter(name__iexact=value).exists():
                raise serializers.ValidationError("A company with this name already exists.")
        else:
            # Create case
            if Company.objects.filter(name__iexact=value).exists():
                raise serializers.ValidationError("A company with this name already exists.")
        
        return value
    
    def validate_cin(self, value):
        """
        Validate CIN format and uniqueness.
        """
        if not value:
            return value
        
        value = value.upper()
        
        # Check uniqueness
        if self.instance:
            # Update case - exclude current instance
            if Company.objects.exclude(id=self.instance.id).filter(cin=value).exists():
                raise serializers.ValidationError("A company with this CIN already exists.")
        else:
            # Create case
            if Company.objects.filter(cin=value).exists():
                raise serializers.ValidationError("A company with this CIN already exists.")
        
        return value