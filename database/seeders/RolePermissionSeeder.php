<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // إنشاء الأدوار الأساسية
        $roles = [
            [
                'name' => 'Super Admin',
                'slug' => 'super-admin',
                'description' => 'Full system access and control'
            ],
            [
                'name' => 'Admin',
                'slug' => 'admin',
                'description' => 'Administrative access to manage vendors and products'
            ],
            [
                'name' => 'Vendor',
                'slug' => 'vendor',
                'description' => 'Vendor access to manage their store and products'
            ],
            [
                'name' => 'Customer',
                'slug' => 'customer',
                'description' => 'Customer access to browse and purchase products'
            ]
        ];

        foreach ($roles as $roleData) {
            Role::firstOrCreate(['slug' => $roleData['slug']], $roleData);
        }

        // إنشاء الصلاحيات الأساسية
        $permissions = [
            // User Management
            ['name' => 'View Users', 'slug' => 'users.view', 'module' => 'users'],
            ['name' => 'Create Users', 'slug' => 'users.create', 'module' => 'users'],
            ['name' => 'Edit Users', 'slug' => 'users.edit', 'module' => 'users'],
            ['name' => 'Delete Users', 'slug' => 'users.delete', 'module' => 'users'],
            
            // Vendor Management
            ['name' => 'View Vendors', 'slug' => 'vendors.view', 'module' => 'vendors'],
            ['name' => 'Approve Vendors', 'slug' => 'vendors.approve', 'module' => 'vendors'],
            ['name' => 'Edit Vendors', 'slug' => 'vendors.edit', 'module' => 'vendors'],
            ['name' => 'Delete Vendors', 'slug' => 'vendors.delete', 'module' => 'vendors'],
            
            // Product Management
            ['name' => 'View Products', 'slug' => 'products.view', 'module' => 'products'],
            ['name' => 'Create Products', 'slug' => 'products.create', 'module' => 'products'],
            ['name' => 'Edit Products', 'slug' => 'products.edit', 'module' => 'products'],
            ['name' => 'Delete Products', 'slug' => 'products.delete', 'module' => 'products'],
            ['name' => 'Moderate Products', 'slug' => 'products.moderate', 'module' => 'products'],
            
            // Order Management
            ['name' => 'View Orders', 'slug' => 'orders.view', 'module' => 'orders'],
            ['name' => 'Edit Orders', 'slug' => 'orders.edit', 'module' => 'orders'],
            ['name' => 'Process Orders', 'slug' => 'orders.process', 'module' => 'orders'],
            
            // Subscription Management
            ['name' => 'View Subscriptions', 'slug' => 'subscriptions.view', 'module' => 'subscriptions'],
            ['name' => 'Create Subscriptions', 'slug' => 'subscriptions.create', 'module' => 'subscriptions'],
            ['name' => 'Edit Subscriptions', 'slug' => 'subscriptions.edit', 'module' => 'subscriptions'],
            
            // Category Management
            ['name' => 'View Categories', 'slug' => 'categories.view', 'module' => 'categories'],
            ['name' => 'Create Categories', 'slug' => 'categories.create', 'module' => 'categories'],
            ['name' => 'Edit Categories', 'slug' => 'categories.edit', 'module' => 'categories'],
            
            // Financial Reports
            ['name' => 'View Financial Reports', 'slug' => 'reports.financial', 'module' => 'reports'],
            ['name' => 'View Analytics', 'slug' => 'analytics.view', 'module' => 'analytics'],
        ];

        foreach ($permissions as $permissionData) {
            Permission::firstOrCreate(['slug' => $permissionData['slug']], $permissionData);
        }

        // ربط الصلاحيات بالأدوار
        $this->assignPermissionsToRoles();
    }

    private function assignPermissionsToRoles(): void
    {
        $superAdmin = Role::where('slug', 'super-admin')->first();
        $admin = Role::where('slug', 'admin')->first();
        $vendor = Role::where('slug', 'vendor')->first();
        $customer = Role::where('slug', 'customer')->first();

        // Super Admin - جميع الصلاحيات
        $allPermissions = Permission::all();
        $superAdmin->permissions()->sync($allPermissions->pluck('id'));

        // Admin - صلاحيات إدارية محددة
        $adminPermissions = Permission::whereIn('slug', [
            'vendors.view', 'vendors.approve', 'vendors.edit',
            'products.view', 'products.moderate',
            'orders.view', 'orders.edit', 'orders.process',
            'categories.view', 'analytics.view'
        ])->pluck('id');
        $admin->permissions()->sync($adminPermissions);

        // Vendor - صلاحيات التاجر
        $vendorPermissions = Permission::whereIn('slug', [
            'products.view', 'products.create', 'products.edit',
            'orders.view', 'orders.process'
        ])->pluck('id');
        $vendor->permissions()->sync($vendorPermissions);

        // Customer - صلاحيات العميل (محدودة)
        $customerPermissions = Permission::whereIn('slug', [
            'products.view', 'orders.view'
        ])->pluck('id');
        $customer->permissions()->sync($customerPermissions);
    }
}