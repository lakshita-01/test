#!/usr/bin/env python3
"""
Reset PostgreSQL password and create database
"""
import subprocess
import os


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
    """Main function to reset PostgreSQL password."""
    print("🔐 Resetting PostgreSQL password and creating database")
    print("=" * 60)
    
    # Try to find PostgreSQL installation
    postgres_paths = [
        "C:\\Program Files\\PostgreSQL\\17\\bin",
        "C:\\Program Files\\PostgreSQL\\16\\bin",
        "C:\\Program Files\\PostgreSQL\\15\\bin",
        "C:\\Program Files\\PostgreSQL\\14\\bin",
        "C:\\Program Files (x86)\\PostgreSQL\\17\\bin",
        "C:\\Program Files (x86)\\PostgreSQL\\16\\bin",
    ]
    
    postgres_bin = None
    for path in postgres_paths:
        if os.path.exists(os.path.join(path, "psql.exe")):
            postgres_bin = path
            break
    
    if not postgres_bin:
        print("❌ PostgreSQL installation not found in standard locations")
        print("📋 Please manually:")
        print("1. Open pgAdmin or psql as superuser")
        print("2. Run: ALTER USER postgres PASSWORD 'postgres123';")
        print("3. Run: CREATE DATABASE bluestock_ipo;")
        return False
    
    print(f"✅ Found PostgreSQL at: {postgres_bin}")
    
    # Add to PATH temporarily
    os.environ['PATH'] = postgres_bin + os.pathsep + os.environ['PATH']
    
    # Try to connect as postgres user with peer authentication (Windows)
    print("\n🔄 Attempting to reset password...")
    
    # Create SQL commands file
    sql_commands = """
ALTER USER postgres PASSWORD 'postgres123';
CREATE DATABASE bluestock_ipo;
\\q
"""
    
    with open('temp_commands.sql', 'w') as f:
        f.write(sql_commands)
    
    # Try to execute as postgres user
    result = run_command(
        f'psql -U postgres -f temp_commands.sql',
        "Executing SQL commands"
    )
    
    # Clean up
    if os.path.exists('temp_commands.sql'):
        os.remove('temp_commands.sql')
    
    if result is not None:
        print("✅ Password reset and database created successfully!")
        
        # Update .env file
        with open('.env', 'r') as f:
            content = f.read()
        
        content = content.replace('DB_PASSWORD=postgres', 'DB_PASSWORD=postgres123')
        
        with open('.env', 'w') as f:
            f.write(content)
        
        print("✅ Updated .env file with new password")
        return True
    else:
        print("❌ Failed to reset password automatically")
        print("\n📋 Manual steps:")
        print("1. Open Command Prompt as Administrator")
        print("2. Navigate to PostgreSQL bin directory")
        print("3. Run: psql -U postgres")
        print("4. Execute: ALTER USER postgres PASSWORD 'postgres123';")
        print("5. Execute: CREATE DATABASE bluestock_ipo;")
        return False


if __name__ == '__main__':
    main()