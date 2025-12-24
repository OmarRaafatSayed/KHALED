<?php

namespace App\Services;

use App\Models\Discount;

class DiscountService
{
    public function validateCode(string $code, float $amount, array $productIds = []): array
    {
        $discount = Discount::where('code', $code)->first();

        if (!$discount) {
            return ['valid' => false, 'message' => 'Invalid discount code'];
        }

        if (!$discount->isValid()) {
            return ['valid' => false, 'message' => 'Discount code has expired or is not active'];
        }

        if ($amount < ($discount->min_amount ?? 0)) {
            return ['valid' => false, 'message' => "Minimum order amount is {$discount->min_amount}"];
        }

        $discountAmount = $discount->calculateDiscount($amount, $productIds);

        return [
            'valid' => true,
            'discount' => $discount,
            'discount_amount' => $discountAmount,
            'final_amount' => $amount - $discountAmount
        ];
    }

    public function applyDiscount(Discount $discount): void
    {
        $discount->increment('used_count');
    }

    public function createDiscount(array $data): Discount
    {
        return Discount::create($data);
    }

    public function getActiveDiscounts(int $vendorId = null): \Illuminate\Database\Eloquent\Collection
    {
        return Discount::where('is_active', true)
            ->where('starts_at', '<=', now())
            ->where('expires_at', '>=', now())
            ->when($vendorId, function($query, $vendorId) {
                return $query->where('vendor_id', $vendorId);
            })
            ->get();
    }
}