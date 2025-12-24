@echo off
echo ========================================
echo   Starting TailAdmin Marketplace
echo ========================================

echo.
echo Starting Laravel development server...
echo Visit: http://localhost:8000
echo.
echo Login Credentials:
echo - Super Admin: superadmin@tailadmin.com / password
echo - Admin: admin@tailadmin.com / password
echo - Vendor: vendor@tailadmin.com / password
echo - Customer: customer@tailadmin.com / password
echo.
echo Press Ctrl+C to stop the server
echo.

start "Vite Dev Server" cmd /k "npm run dev"
php artisan serve