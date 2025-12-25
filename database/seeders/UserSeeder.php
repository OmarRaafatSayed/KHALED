<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;
use App\Models\Vendor;
use App\Models\Subscription;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // إنشاء Super Admin
        $superAdmin = User::firstOrCreate(
            ['email' => 'superadmin@tailadmin.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'phone' => '+1234567890',
                'is_active' => true,
                'email_verified_at' => now()
            ]
        );

        $superAdminRole = Role::where('slug', 'super-admin')->first();
        if ($superAdminRole && !$superAdmin->roles()->where('role_id', $superAdminRole->id)->exists()) {
            $superAdmin->roles()->attach($superAdminRole->id);
        }

        // إنشاء Admin
        $admin = User::firstOrCreate(
            ['email' => 'admin@tailadmin.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'phone' => '+1234567891',
                'is_active' => true,
                'email_verified_at' => now()
            ]
        );

        $adminRole = Role::where('slug', 'admin')->first();
        if ($adminRole && !$admin->roles()->where('role_id', $adminRole->id)->exists()) {
            $admin->roles()->attach($adminRole->id);
        }

        // إنشاء Vendor تجريبي
        $vendorUser = User::firstOrCreate(
            ['email' => 'vendor@tailadmin.com'],
            [
                'name' => 'Ahmed Vendor',
                'password' => Hash::make('password'),
                'phone' => '+1234567892',
                'is_active' => true,
                'email_verified_at' => now()
            ]
        );

        $vendorRole = Role::where('slug', 'vendor')->first();
        if ($vendorRole && !$vendorUser->roles()->where('role_id', $vendorRole->id)->exists()) {
            $vendorUser->roles()->attach($vendorRole->id);
        }

        // إنشاء متجر للتاجر التجريبي
        $freeSubscription = Subscription::where('slug', 'free')->first();
        if ($freeSubscription && !$vendorUser->vendor) {
            Vendor::create([
                'user_id' => $vendorUser->id,
                'subscription_id' => $freeSubscription->id,
                'store_name' => 'Ahmed Store',
                'store_slug' => 'ahmed-store',
                'store_description' => 'This is a test store for demonstration purposes.',
                'phone' => '+1234567892',
                'address' => '123 Test Street, Test City',
                'city' => 'Test City',
                'country' => 'Test Country',
                'is_approved' => true,
                'is_active' => true,
                'subscription_expires_at' => now()->addYear()
            ]);
        }

        // إنشاء Customer تجريبي
        $customer = User::firstOrCreate(
            ['email' => 'customer@tailadmin.com'],
            [
                'name' => 'Test Customer',
                'password' => Hash::make('password'),
                'phone' => '+1234567893',
                'is_active' => true,
                'email_verified_at' => now()
            ]
        );

        $customerRole = Role::where('slug', 'customer')->first();
        if ($customerRole && !$customer->roles()->where('role_id', $customerRole->id)->exists()) {
            $customer->roles()->attach($customerRole->id);
        }
    }
}