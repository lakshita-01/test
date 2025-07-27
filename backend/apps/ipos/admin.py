"""
Admin configuration for IPOs app.
"""
from django.contrib import admin
from .models import IPO, IPOSubscription, IPOTimeline


class IPOSubscriptionInline(admin.TabularInline):
    """
    Inline admin for IPO subscriptions.
    """
    model = IPOSubscription
    extra = 0
    readonly_fields = ['subscription_rate', 'updated_at']


class IPOTimelineInline(admin.TabularInline):
    """
    Inline admin for IPO timeline.
    """
    model = IPOTimeline
    extra = 0
    readonly_fields = ['created_at']


@admin.register(IPO)
class IPOAdmin(admin.ModelAdmin):
    """
    Admin configuration for IPO model.
    """
    list_display = [
        'ipo_name', 'company', 'status', 'ipo_open_date', 
        'ipo_close_date', 'issue_size', 'price_band', 'is_active'
    ]
    list_filter = ['status', 'ipo_type', 'is_active', 'ipo_open_date']
    search_fields = ['ipo_name', 'company__name', 'description']
    ordering = ['-ipo_open_date']
    readonly_fields = ['created_at', 'updated_at', 'price_band', 'min_investment', 'max_investment']
    inlines = [IPOSubscriptionInline, IPOTimelineInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('company', 'ipo_name', 'ipo_type', 'description')
        }),
        ('Pricing & Size', {
            'fields': (
                'price_band_min', 'price_band_max', 'price_band',
                'lot_size', 'issue_size', 'fresh_issue_size', 'ofs_size',
                'min_investment', 'max_investment'
            )
        }),
        ('Important Dates', {
            'fields': ('ipo_open_date', 'ipo_close_date', 'listing_date', 'allotment_date')
        }),
        ('Status & Performance', {
            'fields': ('status', 'subscription_rate', 'listing_price')
        }),
        ('Additional Information', {
            'fields': ('objectives', 'registrar', 'lead_managers', 'risk_factors')
        }),
        ('Metadata', {
            'fields': ('is_active', 'created_at', 'updated_at')
        }),
    )


@admin.register(IPOSubscription)
class IPOSubscriptionAdmin(admin.ModelAdmin):
    """
    Admin configuration for IPOSubscription model.
    """
    list_display = [
        'ipo', 'category', 'shares_offered', 'shares_applied', 
        'subscription_rate', 'applications_received', 'updated_at'
    ]
    list_filter = ['category', 'updated_at']
    search_fields = ['ipo__ipo_name', 'ipo__company__name']
    ordering = ['-updated_at']
    readonly_fields = ['subscription_rate', 'updated_at']


@admin.register(IPOTimeline)
class IPOTimelineAdmin(admin.ModelAdmin):
    """
    Admin configuration for IPOTimeline model.
    """
    list_display = [
        'ipo', 'event_type', 'event_date', 'is_completed', 'created_at'
    ]
    list_filter = ['event_type', 'is_completed', 'event_date']
    search_fields = ['ipo__ipo_name', 'ipo__company__name', 'description']
    ordering = ['-event_date']
    readonly_fields = ['created_at']