<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VendorMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();
        
        if (!$user->isVendor()) {
            abort(403, 'Access denied. Vendor role required.');
        }

        // التحقق من وجود متجر للتاجر
        if (!$user->vendor) {
            return redirect()->route('vendor.setup')
                ->with('error', 'Please complete your vendor setup first.');
        }

        // التحقق من موافقة الإدارة
        if (!$user->vendor->is_approved) {
            return redirect()->route('vendor.pending')
                ->with('info', 'Your vendor account is pending approval.');
        }

        // التحقق من حالة النشاط
        if (!$user->vendor->is_active) {
            abort(403, 'Your vendor account has been deactivated.');
        }

        return $next($request);
    }
}