#!/usr/bin/env python3
"""
Database creation script for Bluestock IPO Backend API
"""
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT


def try_connect_and_create_db():
    """Try to connect with different passwords and create database."""
    passwords = ['postgres', 'admin', 'password', '123456', '', 'root']
    
    for password in passwords:
        try:
            print(f"🔄 Trying to connect with password: {'(empty)' if not password else password}")
            
            # Connect to PostgreSQL server
            conn = psycopg2.connect(
                host='localhost',
                user='postgres',
                password=password,
                port=5432
            )
            conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
            cursor = conn.cursor()
            
            print(f"✅ Connected successfully with password: {'(empty)' if not password else password}")
            
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
            
            # Update .env file with correct password
            with open('.env', 'r') as f:
                content = f.read()
            
            content = content.replace('DB_PASSWORD=postgres', f'DB_PASSWORD={password}')
            
            with open('.env', 'w') as f:
                f.write(content)
            
            print(f"✅ Updated .env file with correct password")
            return True
            
        except psycopg2.OperationalError as e:
            print(f"❌ Failed with password {'(empty)' if not password else password}: {e}")
            continue
        except Exception as e:
            print(f"❌ Unexpected error: {e}")
            continue
    
    return False


def main():
    """Main function."""
    print("🗄️ Creating PostgreSQL database for Bluestock IPO Backend")
    print("=" * 60)
    
    if try_connect_and_create_db():
        print("\n✅ Database setup completed successfully!")
        print("🚀 You can now run: python setup.py")
    else:
        print("\n❌ Could not connect to PostgreSQL.")
        print("\n📋 Please check:")
        print("1. PostgreSQL is installed and running")
        print("2. PostgreSQL service is started")
        print("3. Check your PostgreSQL password")
        print("4. Try connecting manually: psql -U postgres -h localhost")


if __name__ == '__main__':
    main()