#!/usr/bin/env python3
"""
Deployment script for Bluestock IPO Backend API
"""
import os
import sys
import subprocess


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


def main():
    """Main deployment function."""
    print("🚀 Deploying Bluestock IPO Backend API")
    print("=" * 50)
    
    # Check if .env file exists
    if not os.path.exists('.env'):
        print("⚠️  .env file not found. Creating from .env.example...")
        run_command("copy .env.example .env", "Creating .env file")
        print("📝 Please edit .env file with your configuration before continuing.")
        return
    
    # Install dependencies
    run_command("pip install -r requirements.txt", "Installing dependencies")
    
    # Collect static files
    run_command("python manage.py collectstatic --noinput", "Collecting static files")
    
    # Apply migrations
    run_command("python manage.py migrate", "Applying database migrations")
    
    print("\n" + "=" * 50)
    print("🎉 Deployment completed successfully!")
    print("\n📋 Next steps:")
    print("1. Configure your web server (nginx/apache)")
    print("2. Set up SSL certificates")
    print("3. Configure firewall rules")
    print("4. Set up monitoring and logging")
    print("\n🚀 Start the server with:")
    print("   gunicorn bluestock_backend.wsgi:application --bind 0.0.0.0:8000")


if __name__ == '__main__':
    main()