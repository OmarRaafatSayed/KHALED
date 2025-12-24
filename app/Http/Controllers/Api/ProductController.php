<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['vendor.user', 'category', 'reviews'])
            ->where('status', 'active');

        // Filters
        if ($request->has('category')) {
            $query->where('category_id', $request->category);
        }

        if ($request->has('vendor')) {
            $query->where('vendor_id', $request->vendor);
        }

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
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

    public function show(Product $product)
    {
        if ($product->status !== 'active') {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $product->load(['vendor.user', 'category', 'variants', 'reviews.user']);

        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    public function categories()
    {
        $categories = Category::where('is_active', true)
            ->with('children')
            ->whereNull('parent_id')
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    public function featured()
    {
        $products = Product::with(['vendor.user', 'category'])
            ->where('status', 'active')
            ->where('is_featured', true)
            ->orderBy('sort_order')
            ->take(12)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $products
        ]);
    }
}