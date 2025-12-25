@extends('layouts.dashboard')

@section('title', 'Product Reviews')

@section('content')
<div class="mx-auto max-w-7xl">
    <div class="flex flex-col gap-9">
        <!-- Header -->
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 class="font-medium text-black dark:text-white">Product Reviews</h3>
            </div>

            <!-- Reviews List -->
            <div class="p-6.5">
                @if($reviews->count() > 0)
                    <div class="space-y-6">
                        @foreach($reviews as $review)
                            <div class="border rounded-lg p-6">
                                <div class="flex items-start justify-between mb-4">
                                    <div>
                                        <h4 class="font-medium text-gray-900">{{ $review->product->name }}</h4>
                                        <p class="text-sm text-gray-500">by {{ $review->user->name }}</p>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <div class="flex items-center">
                                            @for($i = 1; $i <= 5; $i++)
                                                <svg class="w-4 h-4 {{ $i <= $review->rating ? 'text-yellow-400' : 'text-gray-300' }}" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                                                </svg>
                                            @endfor
                                        </div>
                                        @if(!$review->is_approved)
                                            <span class="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                                Pending
                                            </span>
                                        @else
                                            <span class="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                                Approved
                                            </span>
                                        @endif
                                    </div>
                                </div>
                                
                                @if($review->title)
                                    <h5 class="font-medium mb-2">{{ $review->title }}</h5>
                                @endif
                                
                                @if($review->comment)
                                    <p class="text-gray-700 mb-4">{{ $review->comment }}</p>
                                @endif
                                
                                <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span>{{ $review->created_at->format('M d, Y') }}</span>
                                    @if($review->is_verified_purchase)
                                        <span class="inline-flex items-center text-green-600">
                                            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                            </svg>
                                            Verified Purchase
                                        </span>
                                    @endif
                                </div>
                                
                                <div class="flex items-center space-x-4">
                                    @if(!$review->is_approved)
                                        <form action="{{ route('vendor.reviews.approve', $review) }}" method="POST" class="inline">
                                            @csrf
                                            @method('PATCH')
                                            <button type="submit" class="text-green-600 hover:text-green-800 text-sm font-medium">
                                                Approve
                                            </button>
                                        </form>
                                    @endif
                                    
                                    <button onclick="toggleReplyForm({{ $review->id }})" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        Reply
                                    </button>
                                </div>
                                
                                <!-- Reply Form -->
                                <div id="reply-form-{{ $review->id }}" class="hidden mt-4">
                                    <form action="{{ route('vendor.reviews.reply', $review) }}" method="POST">
                                        @csrf
                                        <textarea name="reply" rows="3" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" placeholder="Write your reply..."></textarea>
                                        <div class="mt-2 flex space-x-2">
                                            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                                                Send Reply
                                            </button>
                                            <button type="button" onclick="toggleReplyForm({{ $review->id }})" class="bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-400">
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                
                                <!-- Existing Replies -->
                                @if($review->replies && $review->replies->count() > 0)
                                    <div class="mt-4 pl-4 border-l-2 border-gray-200">
                                        @foreach($review->replies as $reply)
                                            <div class="mb-3">
                                                <div class="flex items-center space-x-2 mb-1">
                                                    <span class="text-sm font-medium text-gray-900">{{ $reply->user->name }}</span>
                                                    <span class="text-xs text-gray-500">{{ $reply->created_at->diffForHumans() }}</span>
                                                </div>
                                                <p class="text-sm text-gray-700">{{ $reply->reply }}</p>
                                            </div>
                                        @endforeach
                                    </div>
                                @endif
                            </div>
                        @endforeach
                    </div>
                    
                    <div class="mt-6">
                        {{ $reviews->links() }}
                    </div>
                @else
                    <div class="text-center py-12">
                        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                            </svg>
                        </div>
                        <h3 class="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
                        <p class="mt-1 text-sm text-gray-500">Your products haven't received any reviews yet.</p>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>

<script>
function toggleReplyForm(reviewId) {
    const form = document.getElementById('reply-form-' + reviewId);
    form.classList.toggle('hidden');
}
</script>
@endsection