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
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthenticated'
                ], 401);
            }
            return redirect()->route('login');
        }

        $user = auth()->user();
        
        if (!$user->isVendor()) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Access denied. Vendor role required.'
                ], 403);
            }
            abort(403, 'Access denied. Vendor role required.');
        }

        // التحقق من وجود متجر للتاجر
        if (!$user->vendor) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Please complete your vendor setup first.'
                ], 403);
            }
            return redirect()->route('vendor.setup')
                ->with('error', 'Please complete your vendor setup first.');
        }

        // التحقق من موافقة الإدارة
        if (!$user->vendor->is_approved) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Your vendor account is pending approval.'
                ], 403);
            }
            return redirect()->route('vendor.pending')
                ->with('info', 'Your vendor account is pending approval.');
        }

        // التحقق من حالة النشاط
        if (!$user->vendor->is_active) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Your vendor account has been deactivated.'
                ], 403);
            }
            abort(403, 'Your vendor account has been deactivated.');
        }

        return $next($request);
    }
}