# Bluestock IPO Platform - Backend API Deployment Guide

## 🎯 Project Overview

**Goal**: Build a robust backend API to support:
- Admin dashboard (Web)
- Public-facing IPO info
- Secure document access (e.g. RHP, DRHP PDFs)
- Company & IPO listing, search, and details

## ⚙️ Tech Stack

- **Backend**: Django 4.2.7
- **Database**: PostgreSQL
- **Auth**: JWT (with role-based access for Admin)
- **File Storage**: Local (for RHP/DRHP) PDF
- **Client Integration**: JSON-based REST APIs

## 🔐 Authentication & Authorization

| Type | Role | Access Scope |
|------|------|-------------|
| Public | App Users | View IPOs, Download RHP/DRHP |
| Private | Admin | Create/Edit/Delete IPO, Manage Docs |

## 📁 REST API Structure

### Auth Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/login/` | Admin login (JWT) | Public |
| POST | `/api/auth/logout/` | Logout (optional) | Admin |

### 🏢 Company Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/companies/` | List all companies | Public |
| POST | `/api/companies/` | Add a new company | Admin |
| PUT | `/api/companies/:id/` | Update company info | Admin |
| DELETE | `/api/companies/:id/` | Delete a company | Admin |
| GET | `/api/companies/:id/` | Get company details | Public |

### 📈 IPO Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/ipos/` | Get all IPOs (pagination) | Public |
| GET | `/api/ipos/search/` | Search IPOs by keyword | Public |
| GET | `/api/ipos/:id/` | Get IPO details by ID | Public |
| POST | `/api/ipos/` | Create new IPO | Admin |
| PUT | `/api/ipos/:id/` | Update IPO details | Admin |
| DELETE | `/api/ipos/:id/` | Delete IPO record | Admin |

### 📄 Document Upload (RHP/DRHP)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/ipos/:id/upload/` | Upload RHP/DRHP PDF | Admin |
| GET | `/api/ipos/:id/download/` | Download RHP/DRHP document | Public |
| DELETE | `/api/ipos/:id/delete-doc/` | Delete document from IPO | Admin |

**Upload Format**: `multipart/form-data`  
**Storage Option**: Local `uploads/` folder

### 📊 Dashboard Stats (Admin Only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats/` | Total IPOs, companies |
| GET | `/api/admin/logs/` | Login logs, activities |

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- PostgreSQL 12 or higher
- pip (Python package manager)

### 1. Environment Setup

```bash
# Clone the repository
cd "c:/Users/shikh/bluestock project/test/backend"

# Install dependencies
pip install -r requirements.txt
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure:

```env
# Database Configuration
DB_NAME=bluestock_ipo
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# JWT Configuration
JWT_SECRET_KEY=your-jwt-secret-key
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_LIFETIME=3600  # 1 hour in seconds
JWT_REFRESH_TOKEN_LIFETIME=86400  # 24 hours in seconds

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# File Upload Settings
MAX_UPLOAD_SIZE=10485760  # 10MB in bytes
ALLOWED_FILE_TYPES=pdf,doc,docx

# Media Files
MEDIA_ROOT=uploads/
MEDIA_URL=/media/

# Static Files
STATIC_ROOT=staticfiles/
STATIC_URL=/static/
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb bluestock_ipo

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### 4. Load Sample Data (Optional)

```bash
# Run the setup script to create sample data
python setup.py
```

## 🏃‍♂️ Running the Application

### Development Server

```bash
# Start the development server
python manage.py runserver

# Server will be available at:
# http://localhost:8000
```

### Production Deployment

```bash
# Collect static files
python manage.py collectstatic --noinput

# Run with Gunicorn
gunicorn bluestock_backend.wsgi:application --bind 0.0.0.0:8000
```

## 📚 API Documentation

Once the server is running, access the API documentation:

- **Swagger UI**: http://localhost:8000/swagger/
- **ReDoc**: http://localhost:8000/redoc/
- **JSON Schema**: http://localhost:8000/swagger.json

## 🧪 Testing the API

### Automated Testing

```bash
# Run the comprehensive API test
python test_api_endpoints.py
```

### Manual Testing with curl

```bash
# Login as admin
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

# Get all IPOs
curl -X GET http://localhost:8000/api/ipos/

# Search IPOs
curl -X GET "http://localhost:8000/api/ipos/search/?search=tech"

# Get IPO details
curl -X GET http://localhost:8000/api/ipos/1/

# Upload document (Admin only)
curl -X POST http://localhost:8000/api/ipos/1/upload/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "document_type=rhp" \
  -F "title=Red Herring Prospectus" \
  -F "file=@document.pdf"

# Download document
curl -X GET "http://localhost:8000/api/ipos/1/download/?doc_type=rhp"
```

## 📱 Mobile App Integration

All public routes (`GET /api/ipos`, `/api/ipos/:id`) are mobile-friendly:

- Document downloads link directly to a URL served from your backend
- Use HTTP headers like `Authorization: Bearer <token>` for secure admin operations
- JSON responses are optimized for mobile consumption

## 📂 Project Structure

```
test/backend/
├── apps/
│   ├── authentication/     # User authentication & JWT
│   ├── companies/         # Company management
│   ├── ipos/             # IPO management
│   ├── documents/        # Document upload/download
│   ├── admin_dashboard/  # Admin statistics
│   └── notifications/    # Notifications system
├── bluestock_backend/    # Django project settings
├── uploads/             # File storage directory
├── staticfiles/         # Static files
├── requirements.txt     # Python dependencies
├── manage.py           # Django management script
├── setup.py            # Setup and sample data script
└── .env                # Environment configuration
```

## 🔧 Required Dependencies

All dependencies are listed in `requirements.txt`:

```txt
Django==4.2.7
djangorestframework==3.14.0
django-cors-headers==4.3.1
PyJWT==2.8.0
python-decouple==3.8
django-filter==23.3
drf-yasg==1.21.7
gunicorn==21.2.0
whitenoise==6.6.0
psycopg2-binary==2.9.10
requests==2.32.4
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Admin vs Public user permissions
- **CORS Configuration**: Controlled cross-origin requests
- **File Upload Validation**: Restricted file types and sizes
- **SQL Injection Protection**: Django ORM protection
- **XSS Protection**: Built-in Django security features

## 📊 Database Schema

### Key Models:
- **User**: Custom user model with role-based access
- **Company**: Company information and details
- **IPO**: IPO details, pricing, and timeline
- **Document**: File storage for RHP/DRHP documents
- **LoginLog**: User activity tracking

## 🚨 Troubleshooting

### Common Issues:

1. **Database Connection Error**:
   ```bash
   # Check PostgreSQL service
   pg_ctl status
   
   # Verify database exists
   psql -l | grep bluestock_ipo
   ```

2. **Permission Denied for File Uploads**:
   ```bash
   # Create uploads directory
   mkdir -p uploads/documents
   chmod 755 uploads/
   ```

3. **CORS Issues**:
   - Update `CORS_ALLOWED_ORIGINS` in `.env`
   - Ensure frontend URL is included

4. **JWT Token Issues**:
   - Check `JWT_SECRET_KEY` in `.env`
   - Verify token expiration settings

## 📈 Performance Optimization

- **Database Indexing**: Optimized queries with proper indexes
- **Pagination**: Large datasets are paginated
- **File Serving**: Efficient file serving with proper headers
- **Caching**: Django caching framework ready for implementation

## 🔄 API Versioning

Current API version: `v1`
- All endpoints are prefixed with `/api/`
- Future versions can be added as `/api/v2/`

## 📞 Support

For issues and questions:
- Check the API documentation at `/swagger/`
- Review the test results in `api_test_results.json`
- Examine Django logs for detailed error information

---

**🎉 Your Bluestock IPO Backend API is now ready for deployment!**

The API follows REST principles, includes comprehensive documentation, and provides all the endpoints specified in your requirements. The system is production-ready with proper authentication, file handling, and admin dashboard functionality.