<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Wallet;
use App\Models\WithdrawalRequest;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function index()
    {
        $vendor = auth()->user()->vendor;
        $wallet = $vendor->wallet ?? $vendor->wallet()->create();
        
        $transactions = $wallet->transactions()
            ->latest()
            ->paginate(20);
            
        $withdrawalRequests = $vendor->withdrawalRequests()
            ->latest()
            ->take(5)
            ->get();

        return view('vendor.wallet.index', compact('wallet', 'transactions', 'withdrawalRequests'));
    }

    public function requestWithdrawal()
    {
        $vendor = auth()->user()->vendor;
        $wallet = $vendor->wallet ?? $vendor->wallet()->create();
        
        return view('vendor.wallet.withdrawal', compact('wallet'));
    }

    public function submitWithdrawal(Request $request)
    {
        $vendor = auth()->user()->vendor;
        $wallet = $vendor->wallet ?? $vendor->wallet()->create();
        
        $request->validate([
            'amount' => 'required|numeric|min:10|max:' . $wallet->balance,
            'bank_name' => 'required|string|max:255',
            'account_number' => 'required|string|max:50',
            'account_holder_name' => 'required|string|max:255'
        ]);

        if ($wallet->balance < $request->amount) {
            return back()->with('error', 'رصيد غير كافي');
        }

        WithdrawalRequest::create([
            'vendor_id' => $vendor->id,
            'amount' => $request->amount,
            'bank_name' => $request->bank_name,
            'account_number' => $request->account_number,
            'account_holder_name' => $request->account_holder_name
        ]);

        // تجميد المبلغ من الرصيد المتاح
        $wallet->decrement('balance', $request->amount);
        $wallet->increment('pending_balance', $request->amount);

        return redirect()->route('vendor.wallet')
            ->with('success', 'تم إرسال طلب السحب بنجاح. سيتم مراجعته خلال 24 ساعة.');
    }

    public function withdrawalHistory()
    {
        $vendor = auth()->user()->vendor;
        
        $withdrawals = $vendor->withdrawalRequests()
            ->latest()
            ->paginate(20);

        return view('vendor.wallet.withdrawals', compact('withdrawals'));
    }
}