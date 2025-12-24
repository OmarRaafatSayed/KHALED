<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DiscountService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DiscountController extends Controller
{
    protected DiscountService $discountService;

    public function __construct(DiscountService $discountService)
    {
        $this->discountService = $discountService;
    }

    public function validateCode(Request $request): JsonResponse
    {
        $request->validate([
            'code' => 'required|string',
            'amount' => 'required|numeric|min:0',
            'product_ids' => 'array'
        ]);

        $result = $this->discountService->validateCode(
            $request->code,
            $request->amount,
            $request->product_ids ?? []
        );

        return response()->json([
            'success' => $result['valid'],
            'message' => $result['message'] ?? null,
            'data' => $result['valid'] ? [
                'discount_amount' => $result['discount_amount'],
                'final_amount' => $result['final_amount']
            ] : null
        ]);
    }

    public function getActiveDiscounts(): JsonResponse
    {
        $discounts = $this->discountService->getActiveDiscounts();

        return response()->json([
            'success' => true,
            'data' => $discounts->map(function($discount) {
                return [
                    'id' => $discount->id,
                    'name' => $discount->name,
                    'code' => $discount->code,
                    'type' => $discount->type,
                    'value' => $discount->value,
                    'min_amount' => $discount->min_amount,
                    'expires_at' => $discount->expires_at
                ];
            })
        ]);
    }
}