<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subscription;

class SubscriptionSeeder extends Seeder
{
    public function run(): void
    {
        $subscriptions = [
            [
                'name' => 'Free Plan',
                'slug' => 'free',
                'description' => 'Basic plan for new vendors',
                'price' => 0.00,
                'duration_days' => 365,
                'product_limit' => 10,
                'features' => [
                    'Up to 10 products',
                    'Basic analytics',
                    'Email support',
                    'Standard listing'
                ],
                'is_active' => true
            ],
            [
                'name' => 'Starter Plan',
                'slug' => 'starter',
                'description' => 'Perfect for small businesses',
                'price' => 29.99,
                'duration_days' => 30,
                'product_limit' => 50,
                'features' => [
                    'Up to 50 products',
                    'Advanced analytics',
                    'Priority support',
                    'Featured listings',
                    'Custom store design'
                ],
                'is_active' => true
            ],
            [
                'name' => 'Professional Plan',
                'slug' => 'professional',
                'description' => 'For growing businesses',
                'price' => 79.99,
                'duration_days' => 30,
                'product_limit' => 200,
                'features' => [
                    'Up to 200 products',
                    'Advanced analytics',
                    'Priority support',
                    'Featured listings',
                    'Custom store design',
                    'Marketing tools',
                    'Bulk import/export'
                ],
                'is_active' => true
            ],
            [
                'name' => 'Enterprise Plan',
                'slug' => 'enterprise',
                'description' => 'For large businesses',
                'price' => 199.99,
                'duration_days' => 30,
                'product_limit' => -1, // Unlimited
                'features' => [
                    'Unlimited products',
                    'Advanced analytics',
                    'Dedicated support',
                    'Premium listings',
                    'Custom store design',
                    'Marketing tools',
                    'Bulk import/export',
                    'API access',
                    'White-label options'
                ],
                'is_active' => true
            ]
        ];

        foreach ($subscriptions as $subscriptionData) {
            Subscription::firstOrCreate(['slug' => $subscriptionData['slug']], $subscriptionData);
        }
    }
}