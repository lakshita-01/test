#!/usr/bin/env python3
"""
Setup script for Bluestock IPO Backend API
"""
import os
import sys
import subprocess
import django
from django.core.management import execute_from_command_line
from django.contrib.auth import get_user_model


def run_command(command, description):
    """Run a shell command and handle errors."""
    print(f"\n🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        print(f"Error output: {e.stderr}")
        return None


def setup_environment():
    """Set up the Django environment."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bluestock_backend.settings')
    django.setup()


def create_directories():
    """Create necessary directories."""
    directories = [
        'uploads',
        'uploads/documents',
        'logs',
        'staticfiles'
    ]
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"📁 Created directory: {directory}")


def install_dependencies():
    """Install Python dependencies."""
    print("\n📦 Installing Python dependencies...")
    run_command("pip install -r requirements.txt", "Installing dependencies")


def setup_database():
    """Set up the database."""
    print("\n🗄️ Setting up database...")
    
    # Test database connection first
    print("🔍 Testing database connection...")
    test_result = run_command("python test_db_connection.py", "Testing database connection")
    
    if not test_result:
        print("⚠️  PostgreSQL connection failed. Switching to SQLite for development...")
        # Update .env to use SQLite
        with open('.env', 'r') as f:
            content = f.read()
        content = content.replace('DATABASE_ENGINE=postgresql', 'DATABASE_ENGINE=sqlite')
        with open('.env', 'w') as f:
            f.write(content)
        print("✅ Switched to SQLite database")
    
    # Apply migrations
    run_command("python manage.py migrate", "Applying migrations")


def create_superuser():
    """Create a superuser if it doesn't exist."""
    print("\n👤 Setting up admin user...")
    
    setup_environment()
    User = get_user_model()
    
    # Check if admin user already exists
    if User.objects.filter(username='admin').exists():
        print("✅ Admin user already exists")
        return
    
    try:
        # Create admin user
        admin_user = User.objects.create_user(
            username='admin',
            email='admin@bluestock.com',
            password='admin123',
            role='admin',
            first_name='Admin',
            last_name='User'
        )
        admin_user.is_staff = True
        admin_user.is_superuser = True
        admin_user.save()
        
        print("✅ Admin user created successfully")
        print("   Username: admin")
        print("   Password: admin123")
        print("   ⚠️  Please change the password after first login!")
        
    except Exception as e:
        print(f"❌ Failed to create admin user: {e}")


def collect_static():
    """Collect static files."""
    print("\n📄 Collecting static files...")
    run_command("python manage.py collectstatic --noinput", "Collecting static files")


def load_sample_data():
    """Load sample data for development."""
    print("\n📊 Loading sample data...")
    
    setup_environment()
    
    from apps.companies.models import Company
    from apps.ipos.models import IPO
    from datetime import date, timedelta
    
    # Create sample companies
    companies_data = [
        {
            'name': 'TechCorp Solutions Ltd',
            'description': 'Leading technology solutions provider specializing in AI and machine learning.',
            'sector': 'technology',
            'founded_year': 2015,
            'headquarters': 'Bangalore, Karnataka',
            'website': 'https://techcorp.com',
            'cin': 'L72200KA2015PLC123456',
            'market_cap': 5000.00,
            'contact_email': 'info@techcorp.com',
            'ceo_name': 'Rajesh Kumar',
            'cfo_name': 'Priya Sharma'
        },
        {
            'name': 'HealthPlus Pharmaceuticals',
            'description': 'Pharmaceutical company specializing in generic drugs and healthcare solutions.',
            'sector': 'pharmaceuticals',
            'founded_year': 2010,
            'headquarters': 'Mumbai, Maharashtra',
            'website': 'https://healthplus.com',
            'cin': 'L24230MH2010PLC234567',
            'market_cap': 3500.00,
            'contact_email': 'contact@healthplus.com',
            'ceo_name': 'Dr. Amit Patel',
            'cfo_name': 'Sunita Gupta'
        },
        {
            'name': 'GreenEnergy Solutions',
            'description': 'Renewable energy solutions provider focusing on solar and wind power.',
            'sector': 'energy',
            'founded_year': 2018,
            'headquarters': 'Pune, Maharashtra',
            'website': 'https://greenenergy.com',
            'cin': 'L40100MH2018PLC345678',
            'market_cap': 7500.00,
            'contact_email': 'info@greenenergy.com',
            'ceo_name': 'Vikram Singh',
            'cfo_name': 'Meera Joshi'
        }
    ]
    
    created_companies = []
    for company_data in companies_data:
        company, created = Company.objects.get_or_create(
            name=company_data['name'],
            defaults=company_data
        )
        if created:
            created_companies.append(company)
            print(f"✅ Created company: {company.name}")
    
    # Create sample IPOs
    if created_companies:
        today = date.today()
        
        ipos_data = [
            {
                'company': created_companies[0],
                'ipo_name': 'TechCorp Solutions IPO',
                'ipo_type': 'fresh',
                'price_band_min': 100.00,
                'price_band_max': 120.00,
                'lot_size': 100,
                'issue_size': 500.00,
                'fresh_issue_size': 500.00,
                'ipo_open_date': today + timedelta(days=5),
                'ipo_close_date': today + timedelta(days=7),
                'listing_date': today + timedelta(days=12),
                'status': 'upcoming',
                'description': 'IPO to raise funds for expansion and technology development.',
                'objectives': 'Expansion of operations, R&D investment, working capital',
                'registrar': 'Link Intime India Pvt Ltd',
                'lead_managers': 'ICICI Securities, HDFC Bank'
            },
            {
                'company': created_companies[1],
                'ipo_name': 'HealthPlus Pharmaceuticals IPO',
                'ipo_type': 'mixed',
                'price_band_min': 80.00,
                'price_band_max': 95.00,
                'lot_size': 150,
                'issue_size': 300.00,
                'fresh_issue_size': 200.00,
                'ofs_size': 100.00,
                'ipo_open_date': today + timedelta(days=10),
                'ipo_close_date': today + timedelta(days=12),
                'listing_date': today + timedelta(days=17),
                'status': 'upcoming',
                'description': 'IPO for business expansion and debt repayment.',
                'objectives': 'Capacity expansion, debt repayment, working capital',
                'registrar': 'Karvy Fintech Pvt Ltd',
                'lead_managers': 'Kotak Mahindra Capital, Axis Capital'
            }
        ]
        
        for ipo_data in ipos_data:
            ipo, created = IPO.objects.get_or_create(
                ipo_name=ipo_data['ipo_name'],
                defaults=ipo_data
            )
            if created:
                print(f"✅ Created IPO: {ipo.ipo_name}")
    
    print("✅ Sample data loaded successfully")


def main():
    """Main setup function."""
    print("🚀 Setting up Bluestock IPO Backend API")
    print("=" * 50)
    
    # Check if .env file exists
    if not os.path.exists('.env'):
        print("⚠️  .env file not found. Please copy .env.example to .env and configure it.")
        print("   cp .env.example .env")
        return
    
    # Create directories
    create_directories()
    
    # Install dependencies
    install_dependencies()
    
    # Setup database
    setup_database()
    
    # Create superuser
    create_superuser()
    
    # Collect static files
    collect_static()
    
    # Load sample data
    load_sample_data()
    
    print("\n" + "=" * 50)
    print("🎉 Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Start the development server: python manage.py runserver")
    print("2. Access the API documentation: http://localhost:8000/swagger/")
    print("3. Access the admin panel: http://localhost:8000/admin/")
    print("4. Login with username: admin, password: admin123")
    print("\n⚠️  Remember to:")
    print("- Change the admin password")
    print("- Configure your database settings in .env")
    print("- Set up proper SECRET_KEY for production")


if __name__ == '__main__':
    main()