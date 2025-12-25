<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use App\Models\SystemSetting;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        $locale = SystemSetting::get('default_language', 'en');
        
        if (in_array($locale, ['en', 'ar'])) {
            App::setLocale($locale);
        }
        
        return $next($request);
    }
}