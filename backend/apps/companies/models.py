"""
Company models for the Bluestock IPO platform.
"""
from django.db import models
from django.core.validators import RegexValidator, MinValueValidator
from django.utils import timezone


class Company(models.Model):
    """
    Model representing a company that may have IPOs.
    """
    SECTOR_CHOICES = [
        ('technology', 'Technology'),
        ('healthcare', 'Healthcare'),
        ('finance', 'Finance'),
        ('energy', 'Energy'),
        ('manufacturing', 'Manufacturing'),
        ('retail', 'Retail'),
        ('telecommunications', 'Telecommunications'),
        ('real_estate', 'Real Estate'),
        ('automotive', 'Automotive'),
        ('pharmaceuticals', 'Pharmaceuticals'),
        ('food_beverage', 'Food & Beverage'),
        ('textiles', 'Textiles'),
        ('chemicals', 'Chemicals'),
        ('infrastructure', 'Infrastructure'),
        ('media', 'Media & Entertainment'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    sector = models.CharField(max_length=50, choices=SECTOR_CHOICES)
    founded_year = models.PositiveIntegerField(
        validators=[MinValueValidator(1800)],
        null=True, 
        blank=True
    )
    headquarters = models.CharField(max_length=255, blank=True)
    website = models.URLField(blank=True)
    
    # Company identifiers
    cin = models.CharField(
        max_length=21,
        unique=True,
        validators=[RegexValidator(
            regex=r'^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$',
            message='Enter a valid CIN number'
        )],
        help_text='Corporate Identification Number'
    )
    
    # Financial information
    market_cap = models.DecimalField(
        max_digits=15, 
        decimal_places=2, 
        null=True, 
        blank=True,
        help_text='Market capitalization in crores'
    )
    
    # Contact information
    contact_email = models.EmailField(blank=True)
    contact_phone = models.CharField(
        max_length=15,
        blank=True,
        validators=[RegexValidator(
            regex=r'^\+?1?\d{9,15}$',
            message='Enter a valid phone number'
        )]
    )
    
    # Management
    ceo_name = models.CharField(max_length=255, blank=True)
    cfo_name = models.CharField(max_length=255, blank=True)
    
    # Status and metadata
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'companies'
        verbose_name = 'Company'
        verbose_name_plural = 'Companies'
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
    @property
    def total_ipos(self):
        """Return the total number of IPOs for this company."""
        return self.ipos.count()
    
    @property
    def active_ipos(self):
        """Return the number of active IPOs for this company."""
        return self.ipos.filter(status__in=['upcoming', 'open']).count()


class CompanyFinancial(models.Model):
    """
    Model to store financial information for companies.
    """
    company = models.ForeignKey(
        Company, 
        on_delete=models.CASCADE, 
        related_name='financials'
    )
    
    # Financial year
    financial_year = models.CharField(max_length=9, help_text='e.g., 2023-2024')
    
    # Revenue and profit (in crores)
    revenue = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    net_profit = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    total_assets = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    total_liabilities = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    
    # Ratios
    debt_to_equity = models.DecimalField(max_digits=10, decimal_places=4, null=True, blank=True)
    return_on_equity = models.DecimalField(max_digits=10, decimal_places=4, null=True, blank=True)
    profit_margin = models.DecimalField(max_digits=10, decimal_places=4, null=True, blank=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'company_financials'
        verbose_name = 'Company Financial'
        verbose_name_plural = 'Company Financials'
        unique_together = ['company', 'financial_year']
        ordering = ['-financial_year']
    
    def __str__(self):
        return f"{self.company.name} - {self.financial_year}"