<?php

namespace App\Http\Controllers\Api;

use App\Models\ProductReview;
use App\Models\Product;
use Illuminate\Http\Request;

class ReviewController extends BaseApiController
{
    public function index($productId)
    {
        $reviews = ProductReview::with(['user', 'replies.user'])
            ->where('product_id', $productId)
            ->where('is_approved', true)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return $this->paginated($reviews, 'Reviews retrieved successfully');
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'nullable|string|max:255',
            'comment' => 'nullable|string',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Check if user already reviewed this product
        $existingReview = ProductReview::where('product_id', $request->product_id)
            ->where('user_id', $request->user()->id)
            ->first();

        if ($existingReview) {
            return $this->error('You have already reviewed this product');
        }

        $images = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('reviews', 'public');
                $images[] = $path;
            }
        }

        $review = ProductReview::create([
            'product_id' => $request->product_id,
            'user_id' => $request->user()->id,
            'rating' => $request->rating,
            'title' => $request->title,
            'comment' => $request->comment,
            'images' => $images,
            'is_approved' => false
        ]);

        return $this->success($review, 'Review submitted successfully. It will be reviewed by admin.', 201);
    }

    public function update($id, Request $request)
    {
        $review = ProductReview::where('user_id', $request->user()->id)->findOrFail($id);

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'nullable|string|max:255',
            'comment' => 'nullable|string'
        ]);

        $review->update([
            'rating' => $request->rating,
            'title' => $request->title,
            'comment' => $request->comment,
            'is_approved' => false // Needs re-approval after edit
        ]);

        return $this->success($review, 'Review updated successfully');
    }

    public function destroy($id, Request $request)
    {
        $review = ProductReview::where('user_id', $request->user()->id)->findOrFail($id);
        $review->delete();

        return $this->success(null, 'Review deleted successfully');
    }

    public function myReviews(Request $request)
    {
        $reviews = ProductReview::with(['product'])
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return $this->paginated($reviews, 'Your reviews retrieved successfully');
    }
}