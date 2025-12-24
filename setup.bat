@echo off
echo ========================================
echo   TailAdmin Marketplace Setup
echo ========================================

echo.
echo [1/8] Installing Composer dependencies...
call composer install --no-interaction

echo.
echo [2/8] Installing NPM dependencies...
call npm install

echo.
echo [3/8] Generating application key...
call php artisan key:generate

echo.
echo [4/8] Creating MySQL database...
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS tailadmin_marketplace;"

echo.
echo [5/8] Running migrations...
call php artisan migrate --force

echo.
echo [6/8] Seeding database...
call php artisan db:seed --force

echo.
echo [7/8] Creating storage link...
call php artisan storage:link

echo.
echo [8/8] Clearing caches...
call php artisan config:clear
call php artisan cache:clear
call php artisan view:clear

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Login Credentials:
echo - Super Admin: superadmin@tailadmin.com / password
echo - Admin: admin@tailadmin.com / password
echo - Vendor: vendor@tailadmin.com / password
echo - Customer: customer@tailadmin.com / password
echo.
echo To start the development server:
echo 1. Run: php artisan serve
echo 2. Run: npm run dev (in another terminal)
echo 3. Visit: http://localhost:8000
echo.
pause