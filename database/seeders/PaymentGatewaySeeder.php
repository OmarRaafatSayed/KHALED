<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PaymentGateway;

class PaymentGatewaySeeder extends Seeder
{
    public function run(): void
    {
        $gateways = [
            [
                'name' => 'Paymob',
                'slug' => 'paymob',
                'description' => 'Egyptian payment gateway supporting local and international payments (Fawry, Vodafone Cash, Cards)',
                'config' => [
                    'api_key' => '',
                    'secret_key' => '',
                    'public_key' => '',
                    'integration_id_card' => '',
                    'integration_id_wallet' => '',
                    'integration_id_fawry' => '',
                    'hmac_secret' => ''
                ],
                'is_active' => false,
                'is_sandbox' => true,
                'sort_order' => 1
            ],
            [
                'name' => 'Stripe',
                'slug' => 'stripe',
                'description' => 'International payment gateway for credit/debit cards worldwide',
                'config' => [
                    'publishable_key' => '',
                    'secret_key' => '',
                    'webhook_secret' => '',
                    'currency' => 'USD'
                ],
                'is_active' => false,
                'is_sandbox' => true,
                'sort_order' => 2
            ],
            [
                'name' => 'PayPal',
                'slug' => 'paypal',
                'description' => 'Global digital payment platform',
                'config' => [
                    'client_id' => '',
                    'client_secret' => '',
                    'webhook_id' => '',
                    'currency' => 'USD'
                ],
                'is_active' => false,
                'is_sandbox' => true,
                'sort_order' => 3
            ]
        ];

        foreach ($gateways as $gatewayData) {
            PaymentGateway::firstOrCreate(['slug' => $gatewayData['slug']], $gatewayData);
        }
    }
}