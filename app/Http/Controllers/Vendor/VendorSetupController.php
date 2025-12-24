<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VendorSetupController extends Controller
{
    public function show()
    {
        $user = auth()->user();
        
        if ($user->vendor) {
            return redirect()->route('vendor.dashboard');
        }

        $subscriptions = Subscription::where('is_active', true)->get();
        
        return view('vendor.setup', compact('subscriptions'));
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        
        if ($user->vendor) {
            return redirect()->route('vendor.dashboard');
        }

        $request->validate([
            'store_name' => 'required|string|max:255',
            'store_description' => 'nullable|string',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'city' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'subscription_id' => 'required|exists:subscriptions,id'
        ]);

        $subscription = Subscription::find($request->subscription_id);
        
        Vendor::create([
            'user_id' => $user->id,
            'subscription_id' => $subscription->id,
            'store_name' => $request->store_name,
            'store_slug' => Str::slug($request->store_name) . '-' . Str::random(6),
            'store_description' => $request->store_description,
            'phone' => $request->phone,
            'address' => $request->address,
            'city' => $request->city,
            'country' => $request->country,
            'is_approved' => false, // Needs admin approval
            'is_active' => true,
            'subscription_expires_at' => $subscription->price > 0 ? 
                now()->addDays($subscription->duration_days) : 
                now()->addYear()
        ]);

        return redirect()->route('vendor.pending')
            ->with('success', 'Your vendor application has been submitted for review.');
    }

    public function pending()
    {
        return view('vendor.pending');
    }
}