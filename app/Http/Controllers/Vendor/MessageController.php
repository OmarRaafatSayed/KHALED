<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        $vendor = auth()->user()->vendor;
        $userId = auth()->id();
        
        // جلب المحادثات (آخر رسالة مع كل مستخدم)
        $conversations = Message::where(function($query) use ($userId) {
                $query->where('sender_id', $userId)
                      ->orWhere('receiver_id', $userId);
            })
            ->with(['sender', 'receiver', 'product'])
            ->latest()
            ->get()
            ->groupBy(function($message) use ($userId) {
                return $message->sender_id == $userId ? $message->receiver_id : $message->sender_id;
            })
            ->map(function($messages) {
                return $messages->first();
            });

        return view('vendor.messages.index', compact('conversations'));
    }

    public function show($userId)
    {
        $currentUserId = auth()->id();
        
        $messages = Message::where(function($query) use ($currentUserId, $userId) {
                $query->where('sender_id', $currentUserId)->where('receiver_id', $userId);
            })
            ->orWhere(function($query) use ($currentUserId, $userId) {
                $query->where('sender_id', $userId)->where('receiver_id', $currentUserId);
            })
            ->with(['sender', 'receiver', 'product'])
            ->orderBy('created_at')
            ->get();

        // تحديد الرسائل كمقروءة
        Message::where('sender_id', $userId)
            ->where('receiver_id', $currentUserId)
            ->where('is_read', false)
            ->update(['is_read' => true, 'read_at' => now()]);

        $otherUser = User::findOrFail($userId);

        return view('vendor.messages.conversation', compact('messages', 'otherUser'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string|max:1000',
            'product_id' => 'nullable|exists:products,id'
        ]);

        Message::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $request->receiver_id,
            'product_id' => $request->product_id,
            'message' => $request->message
        ]);

        return back()->with('success', 'تم إرسال الرسالة بنجاح');
    }

    public function unreadCount()
    {
        $count = Message::where('receiver_id', auth()->id())
            ->where('is_read', false)
            ->count();

        return response()->json(['count' => $count]);
    }
}