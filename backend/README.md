# Bluestock IPO Backend API

A robust Django REST API backend for the Bluestock IPO platform, providing comprehensive IPO management, company information, document handling, and admin dashboard functionality.

## 🚀 Features

- **JWT Authentication** with role-based access control
- **Company Management** - CRUD operations for companies
- **IPO Management** - Complete IPO lifecycle management
- **Document Management** - Secure RHP/DRHP PDF upload and download
- **Admin Dashboard** - Comprehensive statistics and activity logs
- **RESTful API** - JSON-based API with Swagger documentation
- **PostgreSQL Database** - Robust data storage
- **File Upload** - Local file storage with validation

## 🛠️ Tech Stack

- **Backend**: Django 4.2.7
- **Database**: PostgreSQL
- **Authentication**: JWT (PyJWT)
- **API Framework**: Django REST Framework
- **Documentation**: drf-yasg (Swagger/OpenAPI)
- **File Storage**: Local filesystem
- **CORS**: django-cors-headers

## 📁 Project Structure

```
backend/
├── bluestock_backend/          # Django project settings
├── apps/                       # Django applications
│   ├── authentication/         # JWT auth, user management
│   ├── companies/             # Company CRUD operations
│   ├── ipos/                  # IPO management
│   ├── documents/             # Document upload/download
│   └── admin_dashboard/       # Admin statistics & logs
├── uploads/                   # File storage directory
├── logs/                      # Application logs
├── requirements.txt           # Python dependencies
├── setup.py                  # Automated setup script
└── README.md                 # This file
```

## 🔧 Installation & Setup

### Prerequisites

- Python 3.8+
- PostgreSQL 12+
- pip (Python package manager)

### Quick Setup

1. **Clone and navigate to backend directory**
   ```bash
   cd "c:/Users/shikh/bluestock project/backend"
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Linux/Mac
   ```

3. **Configure environment**
   ```bash
   copy .env.example .env
   # Edit .env file with your database credentials
   ```

4. **Run automated setup**
   ```bash
   python setup.py
   ```

### Manual Setup

If you prefer manual setup:

1. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Setup database**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

3. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

4. **Collect static files**
   ```bash
   python manage.py collectstatic
   ```

## 🚀 Running the Server

```bash
python manage.py runserver
```

The API will be available at:
- **API Base URL**: http://localhost:8000/api/
- **Swagger Documentation**: http://localhost:8000/swagger/
- **Admin Panel**: http://localhost:8000/admin/

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/login/` | Admin login (JWT) | Public |
| POST | `/api/auth/logout/` | Logout | Admin |
| POST | `/api/auth/refresh/` | Refresh token | Public |
| GET | `/api/auth/profile/` | Get user profile | Admin |
| GET | `/api/auth/verify/` | Verify token | Admin |

### Company Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/companies/` | List all companies | Public |
| POST | `/api/companies/` | Add new company | Admin |
| GET | `/api/companies/{id}/` | Get company details | Public |
| PUT | `/api/companies/{id}/` | Update company | Admin |
| DELETE | `/api/companies/{id}/` | Delete company | Admin |
| GET | `/api/companies/sectors/` | Get available sectors | Public |

### IPO Endpoints

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

### Document Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/ipos/{id}/upload/` | Upload RHP/DRHP | Admin |
| GET | `/api/ipos/{id}/download/` | Download document | Public |
| DELETE | `/api/ipos/{id}/delete-doc/` | Delete document | Admin |
| GET | `/api/ipos/{id}/documents/` | List IPO documents | Public |

### Admin Dashboard Endpoints

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

## 📊 Database Models

### Key Models

- **User** - Custom user model with role-based access
- **Company** - Company information and financials
- **IPO** - IPO details, pricing, and timeline
- **Document** - RHP/DRHP file management
- **LoginLog** - User activity tracking

## 🔧 Configuration

### Environment Variables (.env)

```env
# Database
DB_NAME=bluestock_ipo
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# Django
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# JWT
JWT_SECRET_KEY=your-jwt-secret
JWT_ACCESS_TOKEN_LIFETIME=3600
JWT_REFRESH_TOKEN_LIFETIME=86400

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000

# File Upload
MAX_UPLOAD_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,doc,docx
```

## 📱 Mobile App Integration

All public endpoints are mobile-friendly:
- GET `/api/ipos/` - List IPOs
- GET `/api/ipos/{id}/` - IPO details
- GET `/api/ipos/{id}/download/` - Document download
- GET `/api/companies/` - List companies

Use `Authorization: Bearer <token>` header for admin operations.

## 🧪 Testing

Run tests with:
```bash
python manage.py test
```

## 📝 API Testing

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

### Postman Collection

Import the API endpoints into Postman:
1. Open Postman
2. Import > Link
3. Use: http://localhost:8000/swagger.json

## 🚀 Deployment

### Production Checklist

1. **Environment Configuration**
   - Set `DEBUG=False`
   - Configure proper `SECRET_KEY`
   - Set production database credentials
   - Configure `ALLOWED_HOSTS`

2. **Database Setup**
   - Create production PostgreSQL database
   - Run migrations: `python manage.py migrate`

3. **Static Files**
   - Configure static file serving
   - Run: `python manage.py collectstatic`

4. **Security**
   - Change default admin credentials
   - Configure HTTPS
   - Set up proper CORS origins

### Using Gunicorn

```bash
pip install gunicorn
gunicorn bluestock_backend.wsgi:application --bind 0.0.0.0:8000
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **File Upload Issues**
   - Check `uploads/` directory permissions
   - Verify `MAX_UPLOAD_SIZE` setting
   - Ensure file type is allowed

3. **JWT Token Issues**
   - Check token expiration
   - Verify `JWT_SECRET_KEY` consistency
   - Ensure proper Authorization header format

## 📞 Support

For issues and questions:
- Check the API documentation at `/swagger/`
- Review the logs in `logs/django.log`
- Ensure all environment variables are properly set

## 📄 License

This project is part of the Bluestock IPO Platform.

---

**Happy Coding! 🚀**