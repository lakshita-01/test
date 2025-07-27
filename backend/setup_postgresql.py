#!/usr/bin/env python3
"""
PostgreSQL setup script for Bluestock IPO Backend API
"""
import os
import sys
import subprocess
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT


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


def check_postgresql():
    """Check if PostgreSQL is installed and running."""
    print("\n🔍 Checking PostgreSQL installation...")
    
    # Try to connect to PostgreSQL
    try:
        conn = psycopg2.connect(
            host='localhost',
            user='postgres',
            password='postgres',
            port=5432
        )
        conn.close()
        print("✅ PostgreSQL is running and accessible")
        return True
    except psycopg2.OperationalError as e:
        print(f"❌ PostgreSQL connection failed: {e}")
        return False


def create_database():
    """Create the bluestock_ipo database."""
    print("\n🗄️ Creating database...")
    
    try:
        # Connect to PostgreSQL server
        conn = psycopg2.connect(
            host='localhost',
            user='postgres',
            password='postgres',
            port=5432
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Check if database exists
        cursor.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'bluestock_ipo'")
        exists = cursor.fetchone()
        
        if not exists:
            cursor.execute('CREATE DATABASE bluestock_ipo')
            print("✅ Database 'bluestock_ipo' created successfully")
        else:
            print("✅ Database 'bluestock_ipo' already exists")
        
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Database creation failed: {e}")
        return False


def install_postgresql_windows():
    """Install PostgreSQL on Windows using chocolatey."""
    print("\n📦 Installing PostgreSQL on Windows...")
    
    # Check if chocolatey is installed
    choco_check = run_command("choco --version", "Checking Chocolatey")
    if not choco_check:
        print("❌ Chocolatey is not installed. Please install PostgreSQL manually:")
        print("   1. Download from: https://www.postgresql.org/download/windows/")
        print("   2. Install with default settings")
        print("   3. Set password for 'postgres' user as 'postgres'")
        print("   4. Run this script again")
        return False
    
    # Install PostgreSQL
    install_result = run_command(
        "choco install postgresql --params '/Password:postgres' -y",
        "Installing PostgreSQL"
    )
    
    if install_result:
        print("✅ PostgreSQL installed successfully")
        print("⏳ Waiting for PostgreSQL service to start...")
        run_command("timeout /t 10", "Waiting for service startup")
        return True
    else:
        return False


def main():
    """Main setup function."""
    print("🚀 Setting up PostgreSQL for Bluestock IPO Backend")
    print("=" * 60)
    
    # Check if PostgreSQL is already running
    if check_postgresql():
        if create_database():
            print("\n✅ PostgreSQL setup completed successfully!")
            return True
    
    # Try to install PostgreSQL on Windows
    print("\n⚠️  PostgreSQL not found. Attempting to install...")
    
    if os.name == 'nt':  # Windows
        if install_postgresql_windows():
            # Wait a bit for service to start
            print("⏳ Waiting for PostgreSQL to initialize...")
            run_command("timeout /t 30", "Service initialization")
            
            if check_postgresql() and create_database():
                print("\n✅ PostgreSQL setup completed successfully!")
                return True
    
    # Manual installation instructions
    print("\n❌ Automatic PostgreSQL installation failed.")
    print("\n📋 Manual Installation Instructions:")
    print("=" * 40)
    print("1. Download PostgreSQL from: https://www.postgresql.org/download/")
    print("2. Install with these settings:")
    print("   - Port: 5432")
    print("   - Username: postgres")
    print("   - Password: postgres")
    print("3. Create database 'bluestock_ipo'")
    print("4. Run the Django setup: python setup.py")
    
    return False


if __name__ == '__main__':
    success = main()
    if not success:
        sys.exit(1)