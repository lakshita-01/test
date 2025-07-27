"""
IPO models for the Bluestock IPO platform.
"""
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from apps.companies.models import Company


class IPO(models.Model):
    """
    Model representing an Initial Public Offering.
    """
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('open', 'Open'),
        ('closed', 'Closed'),
        ('listed', 'Listed'),
        ('cancelled', 'Cancelled'),
    ]
    
    IPO_TYPE_CHOICES = [
        ('fresh', 'Fresh Issue'),
        ('offer_for_sale', 'Offer for Sale'),
        ('mixed', 'Mixed (Fresh + OFS)'),
    ]
    
    # Basic Information
    company = models.ForeignKey(
        Company, 
        on_delete=models.CASCADE, 
        related_name='ipos'
    )
    ipo_name = models.CharField(max_length=255, help_text="IPO display name")
    ipo_type = models.CharField(max_length=20, choices=IPO_TYPE_CHOICES, default='fresh')
    
    # Pricing Information
    price_band_min = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(1)],
        help_text="Minimum price per share"
    )
    price_band_max = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(1)],
        help_text="Maximum price per share"
    )
    lot_size = models.PositiveIntegerField(
        validators=[MinValueValidator(1)],
        help_text="Minimum number of shares per application"
    )
    
    # Issue Details
    issue_size = models.DecimalField(
        max_digits=15, 
        decimal_places=2,
        help_text="Total issue size in crores"
    )
    fresh_issue_size = models.DecimalField(
        max_digits=15, 
        decimal_places=2,
        null=True, 
        blank=True,
        help_text="Fresh issue size in crores"
    )
    ofs_size = models.DecimalField(
        max_digits=15, 
        decimal_places=2,
        null=True, 
        blank=True,
        help_text="Offer for Sale size in crores"
    )
    
    # Important Dates
    ipo_open_date = models.DateField()
    ipo_close_date = models.DateField()
    listing_date = models.DateField(null=True, blank=True)
    allotment_date = models.DateField(null=True, blank=True)
    
    # Status and Performance
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    subscription_rate = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        null=True, 
        blank=True,
        help_text="Overall subscription rate (times)"
    )
    listing_price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        null=True, 
        blank=True,
        help_text="Actual listing price"
    )
    
    # Additional Information
    description = models.TextField(blank=True)
    objectives = models.TextField(blank=True, help_text="Use of funds")
    registrar = models.CharField(max_length=255, blank=True)
    lead_managers = models.TextField(blank=True, help_text="Comma-separated list")
    
    # Risk factors
    risk_factors = models.TextField(blank=True)
    
    # Metadata
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'ipos'
        verbose_name = 'IPO'
        verbose_name_plural = 'IPOs'
        ordering = ['-ipo_open_date']
    
    def __str__(self):
        return f"{self.company.name} IPO - {self.ipo_open_date}"
    
    @property
    def price_band(self):
        """Return formatted price band."""
        return f"₹{self.price_band_min} - ₹{self.price_band_max}"
    
    @property
    def min_investment(self):
        """Calculate minimum investment amount."""
        return self.lot_size * self.price_band_min
    
    @property
    def max_investment(self):
        """Calculate maximum investment amount."""
        return self.lot_size * self.price_band_max
    
    @property
    def days_to_open(self):
        """Calculate days until IPO opens."""
        if self.status == 'upcoming':
            return (self.ipo_open_date - timezone.now().date()).days
        return 0
    
    @property
    def days_to_close(self):
        """Calculate days until IPO closes."""
        if self.status == 'open':
            return (self.ipo_close_date - timezone.now().date()).days
        return 0
    
    @property
    def is_open(self):
        """Check if IPO is currently open."""
        today = timezone.now().date()
        return (self.ipo_open_date <= today <= self.ipo_close_date and 
                self.status == 'open')
    
    def clean(self):
        """Validate model data."""
        from django.core.exceptions import ValidationError
        
        if self.price_band_min >= self.price_band_max:
            raise ValidationError("Minimum price must be less than maximum price")
        
        if self.ipo_open_date >= self.ipo_close_date:
            raise ValidationError("Open date must be before close date")
        
        if self.listing_date and self.listing_date <= self.ipo_close_date:
            raise ValidationError("Listing date must be after close date")


class IPOSubscription(models.Model):
    """
    Model to track IPO subscription data by category.
    """
    CATEGORY_CHOICES = [
        ('retail', 'Retail Individual Investors (RII)'),
        ('nii', 'Non-Institutional Investors (NII)'),
        ('qib', 'Qualified Institutional Buyers (QIB)'),
        ('employee', 'Employee'),
        ('shareholder', 'Shareholder'),
    ]
    
    ipo = models.ForeignKey(
        IPO, 
        on_delete=models.CASCADE, 
        related_name='subscriptions'
    )
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    
    # Subscription data
    shares_offered = models.BigIntegerField(help_text="Number of shares offered")
    shares_applied = models.BigIntegerField(help_text="Number of shares applied for")
    applications_received = models.PositiveIntegerField(default=0)
    
    # Calculated fields
    subscription_rate = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        help_text="Subscription rate (times)"
    )
    
    # Metadata
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'ipo_subscriptions'
        verbose_name = 'IPO Subscription'
        verbose_name_plural = 'IPO Subscriptions'
        unique_together = ['ipo', 'category']
    
    def __str__(self):
        return f"{self.ipo.company.name} - {self.get_category_display()}"
    
    def save(self, *args, **kwargs):
        """Calculate subscription rate before saving."""
        if self.shares_offered > 0:
            self.subscription_rate = self.shares_applied / self.shares_offered
        super().save(*args, **kwargs)


class IPOTimeline(models.Model):
    """
    Model to track important events in IPO timeline.
    """
    EVENT_CHOICES = [
        ('announcement', 'IPO Announcement'),
        ('drhp_filed', 'DRHP Filed'),
        ('rhp_filed', 'RHP Filed'),
        ('price_band', 'Price Band Announced'),
        ('open', 'IPO Opens'),
        ('close', 'IPO Closes'),
        ('allotment', 'Allotment Finalized'),
        ('listing', 'Stock Listed'),
        ('refund', 'Refund Initiated'),
    ]
    
    ipo = models.ForeignKey(
        IPO, 
        on_delete=models.CASCADE, 
        related_name='timeline'
    )
    event_type = models.CharField(max_length=20, choices=EVENT_CHOICES)
    event_date = models.DateField()
    description = models.TextField(blank=True)
    is_completed = models.BooleanField(default=False)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'ipo_timeline'
        verbose_name = 'IPO Timeline'
        verbose_name_plural = 'IPO Timelines'
        unique_together = ['ipo', 'event_type']
        ordering = ['event_date']
    
    def __str__(self):
        return f"{self.ipo.company.name} - {self.get_event_type_display()}"