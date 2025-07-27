"""
Admin configuration for companies app.
"""
from django.contrib import admin
from .models import Company, CompanyFinancial


class CompanyFinancialInline(admin.TabularInline):
    """
    Inline admin for company financials.
    """
    model = CompanyFinancial
    extra = 0
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    """
    Admin configuration for Company model.
    """
    list_display = [
        'name', 'sector', 'headquarters', 'market_cap', 
        'total_ipos', 'is_active', 'created_at'
    ]
    list_filter = ['sector', 'is_active', 'created_at']
    search_fields = ['name', 'cin', 'description']
    ordering = ['name']
    readonly_fields = ['created_at', 'updated_at']
    inlines = [CompanyFinancialInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'description', 'sector', 'founded_year')
        }),
        ('Contact & Location', {
            'fields': ('headquarters', 'website', 'contact_email', 'contact_phone')
        }),
        ('Legal & Financial', {
            'fields': ('cin', 'market_cap')
        }),
        ('Management', {
            'fields': ('ceo_name', 'cfo_name')
        }),
        ('Status & Metadata', {
            'fields': ('is_active', 'created_at', 'updated_at')
        }),
    )


@admin.register(CompanyFinancial)
class CompanyFinancialAdmin(admin.ModelAdmin):
    """
    Admin configuration for CompanyFinancial model.
    """
    list_display = [
        'company', 'financial_year', 'revenue', 'net_profit', 
        'profit_margin', 'created_at'
    ]
    list_filter = ['financial_year', 'created_at']
    search_fields = ['company__name', 'financial_year']
    ordering = ['-financial_year', 'company__name']
    readonly_fields = ['created_at', 'updated_at']