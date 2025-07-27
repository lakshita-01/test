#!/usr/bin/env python3
"""
Test script to verify all API endpoints are working correctly.
This script tests the API structure as specified in the requirements.
"""
import os
import sys
import django
import requests
import json
from datetime import datetime

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bluestock_backend.settings')
django.setup()

# Base URL for the API
BASE_URL = 'http://localhost:8000'

class APITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.access_token = None
        self.test_results = []
    
    def log_test(self, endpoint, method, status_code, expected_status, description):
        """Log test results."""
        success = status_code == expected_status
        result = {
            'endpoint': endpoint,
            'method': method,
            'status_code': status_code,
            'expected_status': expected_status,
            'success': success,
            'description': description,
            'timestamp': datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status_icon = "✅" if success else "❌"
        print(f"{status_icon} {method} {endpoint} - {status_code} (expected {expected_status}) - {description}")
    
    def login_admin(self):
        """Login as admin to get access token."""
        print("\n🔐 Testing Admin Authentication...")
        
        login_data = {
            'username': 'admin',
            'password': 'admin123'
        }
        
        try:
            response = requests.post(f"{self.base_url}/api/auth/login/", json=login_data)
            self.log_test('/api/auth/login', 'POST', response.status_code, 200, 'Admin login')
            
            if response.status_code == 200:
                data = response.json()
                self.access_token = data.get('access_token')
                print(f"✅ Admin login successful. Token obtained.")
                return True
            else:
                print(f"❌ Admin login failed: {response.text}")
                return False
                
        except requests.exceptions.ConnectionError:
            print("❌ Connection error. Make sure the Django server is running on localhost:8000")
            return False
    
    def get_headers(self, auth_required=False):
        """Get request headers."""
        headers = {'Content-Type': 'application/json'}
        if auth_required and self.access_token:
            headers['Authorization'] = f'Bearer {self.access_token}'
        return headers
    
    def test_auth_endpoints(self):
        """Test authentication endpoints."""
        print("\n📁 Testing Auth Routes...")
        
        # Test logout (optional)
        if self.access_token:
            response = requests.post(
                f"{self.base_url}/api/auth/logout/",
                headers=self.get_headers(auth_required=True)
            )
            self.log_test('/api/auth/logout', 'POST', response.status_code, 200, 'Admin logout')
    
    def test_company_endpoints(self):
        """Test company endpoints."""
        print("\n🏢 Testing Company Routes...")
        
        # GET /api/companies - List all companies (Public)
        response = requests.get(f"{self.base_url}/api/companies/")
        self.log_test('/api/companies', 'GET', response.status_code, 200, 'List all companies (Public)')
        
        # GET /api/companies/:id - Get company details (Public)
        if response.status_code == 200:
            companies = response.json()
            if companies.get('results') and len(companies['results']) > 0:
                company_id = companies['results'][0]['id']
                response = requests.get(f"{self.base_url}/api/companies/{company_id}/")
                self.log_test(f'/api/companies/{company_id}', 'GET', response.status_code, 200, 'Get company details (Public)')
        
        # POST /api/companies - Add new company (Admin only)
        if self.access_token:
            company_data = {
                'name': 'Test Company Ltd',
                'description': 'A test company for API testing',
                'sector': 'technology',
                'founded_year': 2020,
                'headquarters': 'Test City, Test State',
                'website': 'https://testcompany.com',
                'cin': 'L72200KA2020PLC123456',
                'market_cap': 1000.00,
                'contact_email': 'info@testcompany.com',
                'ceo_name': 'Test CEO',
                'cfo_name': 'Test CFO'
            }
            
            response = requests.post(
                f"{self.base_url}/api/companies/",
                json=company_data,
                headers=self.get_headers(auth_required=True)
            )
            self.log_test('/api/companies', 'POST', response.status_code, 201, 'Add new company (Admin)')
            
            # Store created company ID for further tests
            if response.status_code == 201:
                self.test_company_id = response.json()['id']
                
                # PUT /api/companies/:id - Update company (Admin only)
                update_data = {
                    'name': 'Updated Test Company Ltd',
                    'description': 'Updated description',
                    'sector': 'technology',
                    'founded_year': 2020,
                    'headquarters': 'Updated City, Test State',
                    'website': 'https://updatedtestcompany.com',
                    'cin': 'L72200KA2020PLC123456',
                    'market_cap': 1500.00,
                    'contact_email': 'info@updatedtestcompany.com',
                    'ceo_name': 'Updated CEO',
                    'cfo_name': 'Updated CFO'
                }
                
                response = requests.put(
                    f"{self.base_url}/api/companies/{self.test_company_id}/",
                    json=update_data,
                    headers=self.get_headers(auth_required=True)
                )
                self.log_test(f'/api/companies/{self.test_company_id}', 'PUT', response.status_code, 200, 'Update company (Admin)')
    
    def test_ipo_endpoints(self):
        """Test IPO endpoints."""
        print("\n📈 Testing IPO Routes...")
        
        # GET /api/ipos - Get all IPOs (Public)
        response = requests.get(f"{self.base_url}/api/ipos/")
        self.log_test('/api/ipos', 'GET', response.status_code, 200, 'Get all IPOs with pagination (Public)')
        
        # GET /api/ipos/search - Search IPOs (Public)
        response = requests.get(f"{self.base_url}/api/ipos/search/?search=tech")
        self.log_test('/api/ipos/search', 'GET', response.status_code, 200, 'Search IPOs by keyword (Public)')
        
        # GET /api/ipos/:id - Get IPO details (Public)
        ipos_response = requests.get(f"{self.base_url}/api/ipos/")
        if ipos_response.status_code == 200:
            ipos = ipos_response.json()
            if ipos.get('results') and len(ipos['results']) > 0:
                ipo_id = ipos['results'][0]['id']
                response = requests.get(f"{self.base_url}/api/ipos/{ipo_id}/")
                self.log_test(f'/api/ipos/{ipo_id}', 'GET', response.status_code, 200, 'Get IPO details by ID (Public)')
                
                # Store IPO ID for document tests
                self.test_ipo_id = ipo_id
        
        # POST /api/ipos - Create new IPO (Admin only)
        if self.access_token and hasattr(self, 'test_company_id'):
            from datetime import date, timedelta
            
            ipo_data = {
                'company': self.test_company_id,
                'ipo_name': 'Test Company IPO',
                'ipo_type': 'fresh',
                'price_band_min': 100.00,
                'price_band_max': 120.00,
                'lot_size': 100,
                'issue_size': 500.00,
                'fresh_issue_size': 500.00,
                'ipo_open_date': (date.today() + timedelta(days=5)).isoformat(),
                'ipo_close_date': (date.today() + timedelta(days=7)).isoformat(),
                'listing_date': (date.today() + timedelta(days=12)).isoformat(),
                'status': 'upcoming',
                'description': 'Test IPO for API testing',
                'objectives': 'Testing purposes',
                'registrar': 'Test Registrar',
                'lead_managers': 'Test Manager 1, Test Manager 2'
            }
            
            response = requests.post(
                f"{self.base_url}/api/ipos/",
                json=ipo_data,
                headers=self.get_headers(auth_required=True)
            )
            self.log_test('/api/ipos', 'POST', response.status_code, 201, 'Create new IPO (Admin)')
            
            if response.status_code == 201:
                created_ipo_id = response.json()['id']
                
                # PUT /api/ipos/:id - Update IPO (Admin only)
                update_data = ipo_data.copy()
                update_data['description'] = 'Updated test IPO description'
                
                response = requests.put(
                    f"{self.base_url}/api/ipos/{created_ipo_id}/",
                    json=update_data,
                    headers=self.get_headers(auth_required=True)
                )
                self.log_test(f'/api/ipos/{created_ipo_id}', 'PUT', response.status_code, 200, 'Update IPO details (Admin)')
    
    def test_document_endpoints(self):
        """Test document upload/download endpoints."""
        print("\n📄 Testing Document Upload/Download Routes...")
        
        if not hasattr(self, 'test_ipo_id'):
            print("⚠️  No IPO ID available for document testing")
            return
        
        # Note: File upload testing would require actual files
        # For now, we'll test the endpoints exist and return appropriate errors
        
        # GET /api/ipos/:id/download - Download document (Public)
        response = requests.get(f"{self.base_url}/api/ipos/{self.test_ipo_id}/download/?doc_type=rhp")
        # Expecting 404 since no document is uploaded
        self.log_test(f'/api/ipos/{self.test_ipo_id}/download', 'GET', response.status_code, 404, 'Download RHP document (Public)')
        
        # POST /api/ipos/:id/upload - Upload document (Admin only)
        if self.access_token:
            # This would normally require multipart/form-data with actual file
            # Testing endpoint accessibility
            response = requests.post(
                f"{self.base_url}/api/ipos/{self.test_ipo_id}/upload/",
                headers={'Authorization': f'Bearer {self.access_token}'}
            )
            # Expecting 400 due to missing file data
            self.log_test(f'/api/ipos/{self.test_ipo_id}/upload', 'POST', response.status_code, 400, 'Upload RHP document (Admin)')
            
            # DELETE /api/ipos/:id/delete-doc - Delete document (Admin only)
            response = requests.delete(
                f"{self.base_url}/api/ipos/{self.test_ipo_id}/delete-doc/?doc_type=rhp",
                headers=self.get_headers(auth_required=True)
            )
            # Expecting 404 since no document exists
            self.log_test(f'/api/ipos/{self.test_ipo_id}/delete-doc', 'DELETE', response.status_code, 404, 'Delete document (Admin)')
    
    def test_admin_dashboard_endpoints(self):
        """Test admin dashboard endpoints."""
        print("\n📊 Testing Dashboard Stats Routes (Admin Only)...")
        
        if not self.access_token:
            print("⚠️  No admin token available for dashboard testing")
            return
        
        # GET /api/admin/stats - Dashboard statistics
        response = requests.get(
            f"{self.base_url}/api/admin/stats/",
            headers=self.get_headers(auth_required=True)
        )
        self.log_test('/api/admin/stats', 'GET', response.status_code, 200, 'Get dashboard statistics (Admin)')
        
        # GET /api/admin/logs - Login logs and activities
        response = requests.get(
            f"{self.base_url}/api/admin/logs/",
            headers=self.get_headers(auth_required=True)
        )
        self.log_test('/api/admin/logs', 'GET', response.status_code, 200, 'Get login logs and activities (Admin)')
    
    def test_api_documentation(self):
        """Test API documentation endpoints."""
        print("\n📘 Testing API Documentation...")
        
        # Swagger UI
        response = requests.get(f"{self.base_url}/swagger/")
        self.log_test('/swagger/', 'GET', response.status_code, 200, 'Swagger UI documentation')
        
        # ReDoc
        response = requests.get(f"{self.base_url}/redoc/")
        self.log_test('/redoc/', 'GET', response.status_code, 200, 'ReDoc documentation')
        
        # Swagger JSON
        response = requests.get(f"{self.base_url}/swagger.json")
        self.log_test('/swagger.json', 'GET', response.status_code, 200, 'Swagger JSON schema')
    
    def cleanup_test_data(self):
        """Clean up test data created during testing."""
        print("\n🧹 Cleaning up test data...")
        
        if self.access_token:
            # Delete test company (this will cascade delete the IPO)
            if hasattr(self, 'test_company_id'):
                response = requests.delete(
                    f"{self.base_url}/api/companies/{self.test_company_id}/",
                    headers=self.get_headers(auth_required=True)
                )
                if response.status_code == 204:
                    print("✅ Test company deleted successfully")
                else:
                    print(f"⚠️  Could not delete test company: {response.status_code}")
    
    def run_all_tests(self):
        """Run all API tests."""
        print("🚀 Starting Bluestock IPO API Tests")
        print("=" * 50)
        
        # Login first
        if not self.login_admin():
            print("❌ Cannot proceed without admin access")
            return
        
        # Run all tests
        self.test_auth_endpoints()
        self.test_company_endpoints()
        self.test_ipo_endpoints()
        self.test_document_endpoints()
        self.test_admin_dashboard_endpoints()
        self.test_api_documentation()
        
        # Cleanup
        self.cleanup_test_data()
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary."""
        print("\n" + "=" * 50)
        print("📊 TEST SUMMARY")
        print("=" * 50)
        
        total_tests = len(self.test_results)
        passed_tests = len([r for r in self.test_results if r['success']])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests} ✅")
        print(f"Failed: {failed_tests} ❌")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n❌ Failed Tests:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  - {result['method']} {result['endpoint']} - {result['description']}")
        
        print("\n🎉 API testing completed!")
        
        # Save results to file
        with open('api_test_results.json', 'w') as f:
            json.dump(self.test_results, f, indent=2)
        print("📄 Detailed results saved to api_test_results.json")


if __name__ == '__main__':
    tester = APITester()
    tester.run_all_tests()