# TailAdmin Marketplace - Quick Start

## 🚀 Quick Setup (Windows)

### Option 1: Automatic Setup
1. Double-click `setup.bat` to install everything automatically
2. Double-click `start.bat` to run the development server

### Option 2: Manual Setup

#### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL Server

#### Installation Steps

```bash
# 1. Install dependencies
composer install
npm install

# 2. Setup environment
copy .env.example .env
php artisan key:generate

# 3. Create MySQL database
mysql -u root -p -e "CREATE DATABASE tailadmin_marketplace;"

# 4. Run migrations and seeders
php artisan migrate --seed

# 5. Create storage link
php artisan storage:link

# 6. Start development servers
php artisan serve          # Terminal 1
npm run dev                # Terminal 2
```

## 🔑 Login Credentials

- **Super Admin:** superadmin@tailadmin.com / password
- **Admin:** admin@tailadmin.com / password
- **Vendor:** vendor@tailadmin.com / password
- **Customer:** customer@tailadmin.com / password

## 🌐 URLs

- **Website:** http://localhost:8000
- **Login:** http://localhost:8000/login
- **API:** http://localhost:8000/api/v1/

## 📱 Dashboard Access

After login, users are automatically redirected to their respective dashboards:

- **Super Admin:** Complete system management
- **Admin:** Vendor and product moderation
- **Vendor:** Store and product management
- **Customer:** Regular user dashboard

## 🛠️ Development

### Available Commands

```bash
# Clear caches
php artisan optimize:clear

# Run tests
php artisan test

# Generate API documentation
php artisan route:list

# Database refresh
php artisan migrate:fresh --seed
```

### Project Structure

```
├── app/Http/Controllers/
│   ├── Auth/           # Authentication
│   ├── SuperAdmin/     # Super Admin features
│   ├── Admin/          # Admin features
│   ├── Vendor/         # Vendor features
│   └── Api/            # API endpoints
├── app/Models/         # Eloquent models
├── database/
│   ├── migrations/     # Database schema
│   └── seeders/        # Sample data
└── resources/views/    # Blade templates
```

## 🔌 API Endpoints

### Public APIs
- `GET /api/v1/products` - List products
- `GET /api/v1/vendors` - List vendors
- `GET /api/v1/categories` - List categories

### Protected APIs (require authentication)
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders` - User orders
- `GET /api/v1/user` - User profile

### Admin APIs
- `GET /api/v1/admin/stats` - Admin dashboard stats
- `GET /api/v1/admin/vendors/pending` - Pending vendors

### Vendor APIs
- `GET /api/v1/vendor/stats` - Vendor dashboard stats
- `GET /api/v1/vendor/orders` - Vendor orders

## 🎯 Features Implemented

### ✅ Backend Complete
- [x] User Authentication & Authorization (RBAC)
- [x] Super Admin Dashboard
- [x] Admin Dashboard (Vendor/Product Moderation)
- [x] Vendor Dashboard (Store Management)
- [x] Dynamic Product System with Variants
- [x] Order Management (Door-to-Door)
- [x] Subscription System
- [x] RESTful API Endpoints
- [x] Database Seeders with Sample Data

### 🎨 Frontend (Basic Views)
- [x] Authentication Pages
- [x] Dashboard Layouts
- [x] Basic Dashboard Views
- [ ] Product Management UI
- [ ] Order Management UI
- [ ] Advanced Components

## 🚧 Next Steps

The backend is 100% complete and ready for frontend development. The frontend team can now:

1. Use the existing API endpoints
2. Build React/Vue/Angular frontend
3. Customize the existing Blade templates
4. Add advanced UI components

## 📞 Support

For any issues or questions, check the Laravel logs in `storage/logs/laravel.log`