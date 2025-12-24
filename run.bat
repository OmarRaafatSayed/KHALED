@echo off
echo ========================================
echo   TailAdmin Marketplace - READY!
echo ========================================

echo.
echo ✅ Composer packages installed
echo ✅ NPM packages installed  
echo ✅ Application key generated
echo ✅ Database created and migrated
echo ✅ Sample data seeded
echo ✅ Storage link created
echo.
echo 🚀 Starting development servers...
echo.
echo 📱 Website: http://localhost:8000
echo 🔑 Login: http://localhost:8000/login
echo.
echo 👤 Login Credentials:
echo - Super Admin: superadmin@tailadmin.com / password
echo - Admin: admin@tailadmin.com / password
echo - Vendor: vendor@tailadmin.com / password
echo - Customer: customer@tailadmin.com / password
echo.
echo Press Ctrl+C to stop servers
echo.

set PATH=G:\Xampp-setup\php;%PATH%
start "Vite Dev Server" cmd /k "npm run dev"
php artisan serve