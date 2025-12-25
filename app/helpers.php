<?php

if (!function_exists('t')) {
    function t($key, $default = null) {
        return __('dashboard.' . $key, [], null) !== 'dashboard.' . $key 
            ? __('dashboard.' . $key) 
            : ($default ?? $key);
    }
}