<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductReview;
use App\Services\ReviewService;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ReviewController extends Controller
{
    protected ReviewService $reviewService;
    protected MediaService $mediaService;

    public function __construct(ReviewService $reviewService, MediaService $mediaService)
    {
        $this->reviewService = $reviewService;
        $this->mediaService = $mediaService;
    }

    public function index(Request $request): JsonResponse
    {
        $productId = $request->get('product_id');
        $reviews = $this->reviewService->getProductReviews($productId);
        $stats = $this->reviewService->getReviewStats($productId);

        return response()->json([
            'success' => true,
            'data' => [
                'reviews' => $reviews->items(),
                'stats' => $stats,
                'pagination' => [
                    'current_page' => $reviews->currentPage(),
                    'last_page' => $reviews->lastPage(),
                    'total' => $reviews->total()
                ]
            ]
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
            'images.*' => 'image|max:2048'
        ]);

        $data = $request->only(['product_id', 'rating', 'title', 'comment']);
        $data['user_id'] = auth()->id();

        if ($request->hasFile('images')) {
            $images = $this->mediaService->uploadReviewImages($request->file('images'), 0);
            $data['images'] = $images;
        }

        $review = $this->reviewService->createReview($data);

        return response()->json([
            'success' => true,
            'message' => 'Review submitted successfully',
            'data' => $review->load('user')
        ], 201);
    }

    public function addHelpfulVote(Request $request, ProductReview $review): JsonResponse
    {
        $request->validate([
            'type' => 'required|in:helpful,not_helpful'
        ]);

        $success = $this->reviewService->addHelpfulVote(
            $review->id,
            auth()->id(),
            $request->type
        );

        return response()->json([
            'success' => $success,
            'message' => $success ? 'Vote recorded' : 'Failed to record vote'
        ]);
    }

    public function reply(Request $request, ProductReview $review): JsonResponse
    {
        $request->validate([
            'reply' => 'required|string'
        ]);

        $isVendorReply = auth()->user()->isVendor() && 
                        auth()->user()->vendor->id === $review->product->vendor_id;

        $reply = $this->reviewService->addReply(
            $review->id,
            auth()->id(),
            $request->reply,
            $isVendorReply
        );

        return response()->json([
            'success' => true,
            'message' => 'Reply added successfully',
            'data' => $reply->load('user')
        ], 201);
    }
}