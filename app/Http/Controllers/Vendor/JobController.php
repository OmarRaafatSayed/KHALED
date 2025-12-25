<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index()
    {
        $vendor = auth()->user()->vendor;
        
        $jobs = $vendor->jobs()
            ->when(request('status'), function($query, $status) {
                return $query->where('status', $status);
            })
            ->latest()
            ->paginate(20);

        return view('vendor.jobs.index', compact('jobs'));
    }

    public function create()
    {
        return view('vendor.jobs.create');
    }

    public function store(Request $request)
    {
        $vendor = auth()->user()->vendor;
        
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'type' => 'required|in:full-time,part-time,contract,freelance',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0|gte:salary_min',
            'currency' => 'required|string|max:3',
            'requirements' => 'nullable|string',
            'contact_email' => 'required|email',
            'contact_phone' => 'nullable|string',
            'expires_at' => 'nullable|date|after:today'
        ]);

        $vendor->jobs()->create($request->all());

        return redirect()->route('vendor.jobs')
            ->with('success', 'تم إنشاء الوظيفة بنجاح. ستتم مراجعتها من قبل الإدارة.');
    }

    public function show(Job $job)
    {
        if ($job->vendor_id !== auth()->user()->vendor->id) {
            abort(403);
        }

        return view('vendor.jobs.show', compact('job'));
    }

    public function edit(Job $job)
    {
        if ($job->vendor_id !== auth()->user()->vendor->id) {
            abort(403);
        }

        return view('vendor.jobs.edit', compact('job'));
    }

    public function update(Request $request, Job $job)
    {
        if ($job->vendor_id !== auth()->user()->vendor->id) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'type' => 'required|in:full-time,part-time,contract,freelance',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0|gte:salary_min',
            'currency' => 'required|string|max:3',
            'requirements' => 'nullable|string',
            'contact_email' => 'required|email',
            'contact_phone' => 'nullable|string',
            'expires_at' => 'nullable|date|after:today'
        ]);

        $job->update($request->all());

        return redirect()->route('vendor.jobs')
            ->with('success', 'تم تحديث الوظيفة بنجاح.');
    }

    public function destroy(Job $job)
    {
        if ($job->vendor_id !== auth()->user()->vendor->id) {
            abort(403);
        }

        $job->delete();

        return back()->with('success', 'تم حذف الوظيفة بنجاح.');
    }

    public function toggleStatus(Job $job)
    {
        if ($job->vendor_id !== auth()->user()->vendor->id) {
            abort(403);
        }

        $newStatus = $job->status === 'active' ? 'closed' : 'active';
        $job->update(['status' => $newStatus]);

        return back()->with('success', 'تم تحديث حالة الوظيفة بنجاح.');
    }
}