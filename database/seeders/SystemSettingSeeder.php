<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SystemSetting;

class SystemSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // General Settings
            [
                'key' => 'site_name',
                'value' => 'TailAdmin Marketplace',
                'type' => 'string',
                'group' => 'general',
                'description' => 'Website name displayed in header and emails'
            ],
            [
                'key' => 'default_language',
                'value' => 'en',
                'type' => 'select',
                'group' => 'general',
                'description' => 'Default language for the marketplace'
            ],
            [
                'key' => 'site_description',
                'value' => 'Modern marketplace for vendors and customers',
                'type' => 'text',
                'group' => 'general',
                'description' => 'Website description for SEO'
            ],
            [
                'key' => 'site_logo',
                'value' => '',
                'type' => 'file',
                'group' => 'general',
                'description' => 'Website logo'
            ],
            [
                'key' => 'admin_email',
                'value' => 'admin@tailadmin.com',
                'type' => 'email',
                'group' => 'general',
                'description' => 'Main admin email for notifications'
            ],
            [
                'key' => 'maintenance_mode',
                'value' => false,
                'type' => 'boolean',
                'group' => 'general',
                'description' => 'Enable maintenance mode'
            ],

            // Currency Settings
            [
                'key' => 'default_currency',
                'value' => 'USD',
                'type' => 'select',
                'group' => 'currency',
                'description' => 'Default currency for the marketplace'
            ],
            [
                'key' => 'supported_currencies',
                'value' => ['USD', 'EUR', 'EGP', 'SAR', 'AED'],
                'type' => 'array',
                'group' => 'currency',
                'description' => 'List of supported currencies'
            ],
            [
                'key' => 'currency_auto_update',
                'value' => true,
                'type' => 'boolean',
                'group' => 'currency',
                'description' => 'Auto-update exchange rates daily'
            ],

            // Tax Settings
            [
                'key' => 'tax_enabled',
                'value' => true,
                'type' => 'boolean',
                'group' => 'tax',
                'description' => 'Enable tax calculation'
            ],
            [
                'key' => 'default_tax_rate',
                'value' => 14.0,
                'type' => 'number',
                'group' => 'tax',
                'description' => 'Default tax rate percentage (Egypt VAT: 14%)'
            ],
            [
                'key' => 'tax_inclusive',
                'value' => false,
                'type' => 'boolean',
                'group' => 'tax',
                'description' => 'Prices include tax'
            ],

            // Shipping Settings
            [
                'key' => 'free_shipping_threshold',
                'value' => 500.0,
                'type' => 'number',
                'group' => 'shipping',
                'description' => 'Minimum order amount for free shipping'
            ],
            [
                'key' => 'default_shipping_cost',
                'value' => 50.0,
                'type' => 'number',
                'group' => 'shipping',
                'description' => 'Default shipping cost'
            ],
            [
                'key' => 'shipping_zones',
                'value' => [
                    'cairo' => ['name' => 'Cairo', 'cost' => 30],
                    'giza' => ['name' => 'Giza', 'cost' => 35],
                    'alexandria' => ['name' => 'Alexandria', 'cost' => 50],
                    'other' => ['name' => 'Other Governorates', 'cost' => 70]
                ],
                'type' => 'json',
                'group' => 'shipping',
                'description' => 'Shipping zones and costs'
            ],

            // Email Settings
            [
                'key' => 'smtp_host',
                'value' => '',
                'type' => 'string',
                'group' => 'email',
                'description' => 'SMTP server host'
            ],
            [
                'key' => 'smtp_port',
                'value' => 587,
                'type' => 'number',
                'group' => 'email',
                'description' => 'SMTP server port'
            ],
            [
                'key' => 'smtp_username',
                'value' => '',
                'type' => 'string',
                'group' => 'email',
                'description' => 'SMTP username'
            ],
            [
                'key' => 'smtp_password',
                'value' => '',
                'type' => 'password',
                'group' => 'email',
                'description' => 'SMTP password'
            ],

            // Vendor Settings
            [
                'key' => 'vendor_auto_approval',
                'value' => false,
                'type' => 'boolean',
                'group' => 'vendor',
                'description' => 'Auto-approve new vendor registrations'
            ],
            [
                'key' => 'vendor_commission_rate',
                'value' => 5.0,
                'type' => 'number',
                'group' => 'vendor',
                'description' => 'Commission rate percentage from vendor sales'
            ],
            [
                'key' => 'product_auto_approval',
                'value' => false,
                'type' => 'boolean',
                'group' => 'vendor',
                'description' => 'Auto-approve new products'
            ]
        ];

        foreach ($settings as $setting) {
            SystemSetting::firstOrCreate(['key' => $setting['key']], $setting);
        }
    }
}