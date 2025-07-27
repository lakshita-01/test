#!/usr/bin/env python3
"""
Test database connection and create database if needed
"""
import os
import django
from django.conf import settings
from django.core.management import execute_from_command_line

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bluestock_backend.settings')
django.setup()

def test_connection():
    """Test database connection."""
    try:
        from django.db import connection
        cursor = connection.cursor()
        cursor.execute("SELECT 1")
        result = cursor.fetchone()
        print("✅ Database connection successful!")
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def main():
    """Main function."""
    print("🔍 Testing database connection...")
    
    if test_connection():
        print("🚀 Ready to run migrations!")
        return True
    else:
        print("❌ Database connection failed.")
        print("📋 Please ensure:")
        print("1. PostgreSQL is running")
        print("2. Database 'bluestock_ipo' exists")
        print("3. Credentials in .env are correct")
        return False

if __name__ == '__main__':
    main()