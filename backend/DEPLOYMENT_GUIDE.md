# 🚀 Bluestock IPO Backend API - Deployment Guide

## 📋 Overview

This is a complete Django REST API backend for the Bluestock IPO platform with the following features:

- **JWT Authentication** with role-based access control (Admin/Public)
- **Company Management** - CRUD operations for companies
- **IPO Management** - Complete IPO lifecycle management
- **Document Management** - Secure RHP/DRHP PDF upload and download
- **Admin Dashboard** - Comprehensive statistics and activity logs
- **PostgreSQL/SQLite Support** - Flexible database configuration
- **Swagger Documentation** - Interactive API documentation

## 🛠️ Tech Stack

- **Backend**: Django 4.2.7
- **Database**: PostgreSQL (production) / SQLite (development)
- **Authentication**: JWT (PyJWT)
- **API Framework**: Django REST Framework 3.14.0
- **Documentation**: drf-yasg (Swagger/OpenAPI)
- **File Storage**: Local filesystem
- **CORS**: django-cors-headers

## 📁 Project Structure

```
backend/
├── bluestock_backend/          # Django project settings
│   ├── settings.py            # Main settings
│   ├── urls.py               # URL routing
│   └── wsgi.py               # WSGI application
├── apps/                      # Django applications
│   ├── authentication/        # JWT auth, user management
│   ├── companies/            # Company CRUD operations
│   ├── ipos/                 # IPO management
│   ├── documents/            # Document upload/download
│   └── admin_dashboard/      # Admin statistics & logs
├── uploads/                  # File storage directory
├── logs/                     # Application logs
├── staticfiles/              # Static files
├── requirements.txt          # Python dependencies
├── setup.py                 # Automated setup script
├── manage.py                # Django management script
├── .env                     # Environment variables
└── README.md                # Documentation
```

## 🔧 Installation & Setup

### Prerequisites

- Python 3.8+
- PostgreSQL 12+ (optional, SQLite fallback available)
- pip (Python package manager)

### Quick Setup

1. **Navigate to backend directory**
   ```bash
   cd "c:/Users/shikh/bluestock project/backend"
   ```

2. **Create virtual environment (recommended)**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Linux/Mac
   ```

3. **Run automated setup**
   ```bash
   python setup.py
   ```

This will:
- Install all dependencies
- Set up the database (SQLite by default)
- Create admin user (admin/admin123)
- Load sample data
- Collect static files

### Manual Setup

If you prefer manual setup:

1. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure environment**
   ```bash
   copy .env.example .env
   # Edit .env file with your settings
   ```

3. **Setup database**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

5. **Collect static files**
   ```bash
   python manage.py collectstatic
   ```

## 🚀 Running the Server

### Development Server
```bash
python manage.py runserver
```

### Production Server (using Gunicorn)
```bash
gunicorn bluestock_backend.wsgi:application --bind 0.0.0.0:8000
```

## 🌐 API Endpoints

The API will be available at:
- **API Base URL**: http://localhost:8000/api/
- **Swagger Documentation**: http://localhost:8000/swagger/
- **Admin Panel**: http://localhost:8000/admin/

### 🔐 Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/login/` | Admin login (JWT) | Public |
| POST | `/api/auth/logout/` | Logout | Admin |
| POST | `/api/auth/refresh/` | Refresh token | Public |
| GET | `/api/auth/profile/` | Get user profile | Admin |
| GET | `/api/auth/verify/` | Verify token | Admin |

### 🏢 Company Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/companies/` | List all companies | Public |
| POST | `/api/companies/` | Add new company | Admin |
| GET | `/api/companies/{id}/` | Get company details | Public |
| PUT | `/api/companies/{id}/` | Update company | Admin |
| DELETE | `/api/companies/{id}/` | Delete company | Admin |
| GET | `/api/companies/sectors/` | Get available sectors | Public |

### 📈 IPO Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/ipos/` | Get all IPOs (paginated) | Public |
| POST | `/api/ipos/` | Create new IPO | Admin |
| GET | `/api/ipos/search/` | Search IPOs | Public |
| GET | `/api/ipos/{id}/` | Get IPO details | Public |
| PUT | `/api/ipos/{id}/` | Update IPO | Admin |
| DELETE | `/api/ipos/{id}/` | Delete IPO | Admin |
| GET | `/api/ipos/statuses/` | Get IPO statuses | Public |
| GET | `/api/ipos/stats/` | Get IPO statistics | Public |

### 📄 Document Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/ipos/{id}/upload/` | Upload RHP/DRHP | Admin |
| GET | `/api/ipos/{id}/download/` | Download document | Public |
| DELETE | `/api/ipos/{id}/delete-doc/` | Delete document | Admin |
| GET | `/api/ipos/{id}/documents/` | List IPO documents | Public |

### 📊 Admin Dashboard Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/admin/stats/` | Dashboard statistics | Admin |
| GET | `/api/admin/logs/` | Login logs & activities | Admin |
| GET | `/api/admin/activity/` | Activity timeline | Admin |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Default Admin Credentials
- **Username**: admin
- **Password**: admin123
- **⚠️ Change these credentials after first login!**

## 🗄️ Database Configuration

### SQLite (Development)
```env
DATABASE_ENGINE=sqlite
```

### PostgreSQL (Production)
```env
DATABASE_ENGINE=postgresql
DB_NAME=bluestock_ipo
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

## 📱 Mobile App Integration

All public endpoints are mobile-friendly:
- GET `/api/ipos/` - List IPOs
- GET `/api/ipos/{id}/` - IPO details
- GET `/api/ipos/{id}/download/` - Document download
- GET `/api/companies/` - List companies

Use `Authorization: Bearer <token>` header for admin operations.

## 🧪 Testing the API

### Using curl

```bash
# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

# Get IPOs
curl -X GET http://localhost:8000/api/ipos/ \
  -H "Authorization: Bearer <your-token>"

# Upload document
curl -X POST http://localhost:8000/api/ipos/1/upload/ \
  -H "Authorization: Bearer <your-token>" \
  -F "document_type=rhp" \
  -F "title=RHP Document" \
  -F "file=@document.pdf"
```

### Using Postman

Import the provided Postman collection:
```
Bluestock_API_Collection.postman_collection.json
```

## 🚀 Production Deployment

### Environment Configuration

1. **Update .env for production**
   ```env
   DEBUG=False
   DATABASE_ENGINE=postgresql
   SECRET_KEY=your-production-secret-key
   ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
   ```

2. **Database Setup**
   - Install PostgreSQL
   - Create database: `CREATE DATABASE bluestock_ipo;`
   - Run migrations: `python manage.py migrate`

3. **Static Files**
   ```bash
   python manage.py collectstatic
   ```

4. **Security**
   - Change admin credentials
   - Configure HTTPS
   - Set up proper CORS origins
   - Configure firewall

### Using Gunicorn + Nginx

1. **Install Gunicorn**
   ```bash
   pip install gunicorn
   ```

2. **Run with Gunicorn**
   ```bash
   gunicorn bluestock_backend.wsgi:application --bind 0.0.0.0:8000 --workers 3
   ```

3. **Configure Nginx** (example)
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location /api/ {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
       
       location /static/ {
           alias /path/to/staticfiles/;
       }
       
       location /media/ {
           alias /path/to/uploads/;
       }
   }
   ```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check database is running
   - Verify credentials in `.env`
   - Ensure database exists

2. **File Upload Issues**
   - Check `uploads/` directory permissions
   - Verify `MAX_UPLOAD_SIZE` setting
   - Ensure file type is allowed

3. **JWT Token Issues**
   - Check token expiration
   - Verify `JWT_SECRET_KEY` consistency
   - Ensure proper Authorization header format

4. **CORS Issues**
   - Update `CORS_ALLOWED_ORIGINS` in settings
   - Check frontend domain is allowed

## 📊 Sample Data

The setup script loads sample data including:
- 3 sample companies (TechCorp, HealthPlus, GreenEnergy)
- 2 sample IPOs with different statuses
- Admin user with proper permissions

## 🔒 Security Features

- JWT-based authentication
- Role-based access control
- File upload validation
- SQL injection protection (Django ORM)
- CSRF protection
- Secure password hashing

## 📈 Performance

- Database query optimization
- Pagination for large datasets
- File upload size limits
- Efficient serialization
- Static file serving

## 📞 Support

For issues and questions:
- Check the API documentation at `/swagger/`
- Review the logs in `logs/django.log`
- Ensure all environment variables are properly set
- Test database connectivity

## 🎯 Next Steps

1. **Configure PostgreSQL** for production
2. **Set up SSL certificates** for HTTPS
3. **Configure monitoring** and logging
4. **Set up backup** procedures
5. **Implement caching** (Redis/Memcached)
6. **Add rate limiting** for API endpoints

---

**🎉 Your Bluestock IPO Backend API is ready to use!**

Access the API documentation at: http://localhost:8000/swagger/
Admin panel at: http://localhost:8000/admin/