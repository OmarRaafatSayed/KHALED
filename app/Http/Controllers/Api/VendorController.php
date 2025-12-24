<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    public function index(Request $request)
    {
        $query = Vendor::with(['user', 'subscription'])
            ->where('is_approved', true)
            ->where('is_active', true);

        if ($request->has('search')) {
            $query->where('store_name', 'like', '%' . $request->search . '%');
        }

        if ($request->has('city')) {
            $query->where('city', $request->city);
        }

        if ($request->has('country')) {
            $query->where('country', $request->country);
        }

        $vendors = $query->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $vendors->items(),
            'pagination' => [
                'current_page' => $vendors->currentPage(),
                'last_page' => $vendors->lastPage(),
                'per_page' => $vendors->perPage(),
                'total' => $vendors->total(),
            ]
        ]);
    }

    public function show(Vendor $vendor)
    {
        if (!$vendor->is_approved || !$vendor->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Vendor not found'
            ], 404);
        }

        $vendor->load(['user', 'subscription']);
        
        // Get vendor's active products
        $products = $vendor->products()
            ->where('status', 'active')
            ->with(['category', 'reviews'])
            ->paginate(12);

        return response()->json([
            'success' => true,
            'data' => [
                'vendor' => $vendor,
                'products' => $products->items(),
                'products_pagination' => [
                    'current_page' => $products->currentPage(),
                    'last_page' => $products->lastPage(),
                    'per_page' => $products->perPage(),
                    'total' => $products->total(),
                ]
            ]
        ]);
    }

    public function products(Vendor $vendor, Request $request)
    {
        if (!$vendor->is_approved || !$vendor->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Vendor not found'
            ], 404);
        }

        $query = $vendor->products()
            ->where('status', 'active')
            ->with(['category', 'reviews']);

        if ($request->has('category')) {
            $query->where('category_id', $request->category);
        }

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        if (in_array($sortBy, ['name', 'price', 'created_at'])) {
            $query->orderBy($sortBy, $sortOrder);
        }

        $products = $query->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $products->items(),
            'pagination' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ]
        ]);
    }
}