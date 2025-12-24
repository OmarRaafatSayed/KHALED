<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class,
            SubscriptionSeeder::class,
            CategorySeeder::class,
            ProductTemplateSeeder::class,
            UserSeeder::class,
            PaymentGatewaySeeder::class,
            SystemSettingSeeder::class,
            HeroSlideSeeder::class,
        ]);
        
        // إنشاء بيانات تجريبية للخصومات
        if (app()->environment('local')) {
            \App\Models\Discount::create([
                'vendor_id' => 1,
                'name' => 'خصم 10% للعملاء الجدد',
                'code' => 'NEW10',
                'type' => 'percentage',
                'value' => 10,
                'min_amount' => 100,
                'usage_limit' => 100,
                'starts_at' => now(),
                'expires_at' => now()->addMonth()
            ]);
        }
    }
}
