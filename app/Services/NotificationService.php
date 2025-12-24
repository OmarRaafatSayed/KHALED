<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;

class NotificationService
{
    public function sendToUser(int $userId, string $type, string $title, string $message, array $data = [], string $actionUrl = null): Notification
    {
        return Notification::createForUser($userId, $type, $title, $message, $data, $actionUrl);
    }

    public function sendToVendor(int $vendorId, string $type, string $title, string $message, array $data = [], string $actionUrl = null): void
    {
        $vendor = \App\Models\Vendor::find($vendorId);
        if ($vendor && $vendor->user) {
            $this->sendToUser($vendor->user_id, $type, $title, $message, $data, $actionUrl);
        }
    }

    public function sendToAdmins(string $type, string $title, string $message, array $data = [], string $actionUrl = null): void
    {
        $admins = User::whereHas('roles', function($query) {
            $query->whereIn('slug', ['admin', 'super-admin']);
        })->get();

        foreach ($admins as $admin) {
            $this->sendToUser($admin->id, $type, $title, $message, $data, $actionUrl);
        }
    }

    public function markAsRead(int $notificationId, int $userId): bool
    {
        $notification = Notification::where('id', $notificationId)
            ->where('user_id', $userId)
            ->first();

        if ($notification) {
            $notification->markAsRead();
            return true;
        }

        return false;
    }

    public function getUnreadCount(int $userId): int
    {
        return Notification::where('user_id', $userId)
            ->where('is_read', false)
            ->count();
    }
}