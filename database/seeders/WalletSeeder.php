<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vendor;
use App\Models\Wallet;

class WalletSeeder extends Seeder
{
    public function run()
    {
        // إنشاء محفظة لكل تاجر موجود
        $vendors = Vendor::all();
        
        foreach ($vendors as $vendor) {
            if (!$vendor->wallet) {
                Wallet::create([
                    'vendor_id' => $vendor->id,
                    'balance' => rand(100, 5000), // رصيد عشوائي للاختبار
                    'pending_balance' => 0,
                    'total_earnings' => rand(1000, 10000),
                    'total_withdrawn' => rand(0, 2000)
                ]);
            }
        }
    }
}