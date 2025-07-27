#!/usr/bin/env python3
"""
Test script to verify API endpoints are working
"""
import requests
import json
import time


def test_api():
    """Test the API endpoints."""
    base_url = "http://localhost:8000/api"
    
    print("🧪 Testing Bluestock IPO Backend API")
    print("=" * 50)
    
    # Wait for server to start
    print("⏳ Waiting for server to start...")
    time.sleep(3)
    
    # Test 1: Get companies (public endpoint)
    print("\n1️⃣ Testing GET /api/companies/")
    try:
        response = requests.get(f"{base_url}/companies/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success! Found {data['count']} companies")
            if data['results']:
                print(f"   Sample company: {data['results'][0]['name']}")
        else:
            print(f"❌ Failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 2: Get IPOs (public endpoint)
    print("\n2️⃣ Testing GET /api/ipos/")
    try:
        response = requests.get(f"{base_url}/ipos/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success! Found {data['count']} IPOs")
            if data['results']:
                print(f"   Sample IPO: {data['results'][0]['ipo_name']}")
        else:
            print(f"❌ Failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 3: Admin login
    print("\n3️⃣ Testing POST /api/auth/login/")
    try:
        login_data = {
            "username": "admin",
            "password": "admin123"
        }
        response = requests.post(f"{base_url}/auth/login/", json=login_data)
        if response.status_code == 200:
            data = response.json()
            access_token = data.get('access_token')
            print("✅ Login successful!")
            print(f"   Token: {access_token[:20]}...")
            
            # Test 4: Admin endpoint with token
            print("\n4️⃣ Testing GET /api/admin/stats/ (with auth)")
            headers = {"Authorization": f"Bearer {access_token}"}
            response = requests.get(f"{base_url}/admin/stats/", headers=headers)
            if response.status_code == 200:
                data = response.json()
                print("✅ Admin stats retrieved successfully!")
                print(f"   Total companies: {data['companies']['total']}")
                print(f"   Total IPOs: {data['ipos']['total']}")
            else:
                print(f"❌ Failed with status {response.status_code}")
        else:
            print(f"❌ Login failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 5: Swagger documentation
    print("\n5️⃣ Testing Swagger documentation")
    try:
        response = requests.get("http://localhost:8000/swagger/")
        if response.status_code == 200:
            print("✅ Swagger documentation is accessible!")
        else:
            print(f"❌ Failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    print("\n" + "=" * 50)
    print("🎉 API testing completed!")
    print("\n📋 Access points:")
    print("   API Base: http://localhost:8000/api/")
    print("   Swagger: http://localhost:8000/swagger/")
    print("   Admin: http://localhost:8000/admin/")
    print("\n🔐 Admin credentials:")
    print("   Username: admin")
    print("   Password: admin123")


if __name__ == '__main__':
    test_api()