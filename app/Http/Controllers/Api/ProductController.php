<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'vendor.user', 'variants'])
            ->where('status', 'active');

        // Filters
        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->vendor_id) {
            $query->where('vendor_id', $request->vendor_id);
        }

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        // Sorting
        $sortBy = $request->sort_by ?? 'created_at';
        $sortOrder = $request->sort_order ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        $products = $query->paginate($request->per_page ?? 20);

        return $this->paginated($products, 'Products retrieved successfully');
    }

    public function show($id)
    {
        $product = Product::with(['category', 'vendor.user', 'variants', 'reviews.user'])
            ->where('status', 'active')
            ->findOrFail($id);

        return $this->success($product, 'Product retrieved successfully');
    }

    public function categories()
    {
        $categories = Category::where('is_active', true)
            ->withCount('products')
            ->orderBy('sort_order')
            ->get();

        return $this->success($categories, 'Categories retrieved successfully');
    }

    public function featured()
    {
        $products = Product::with(['category', 'vendor.user'])
            ->where('status', 'active')
            ->where('is_featured', true)
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return $this->success($products, 'Featured products retrieved successfully');
    }

    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|string|min:2'
        ]);

        $products = Product::with(['category', 'vendor.user'])
            ->where('status', 'active')
            ->where(function($query) use ($request) {
                $query->where('name', 'like', '%' . $request->q . '%')
                      ->orWhere('description', 'like', '%' . $request->q . '%');
            })
            ->paginate(20);

        return $this->paginated($products, 'Search results retrieved successfully');
    }
}