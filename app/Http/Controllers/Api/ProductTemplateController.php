<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductTemplate;
use App\Services\ProductTemplateService;
use Illuminate\Http\JsonResponse;

class ProductTemplateController extends Controller
{
    protected ProductTemplateService $templateService;

    public function __construct(ProductTemplateService $templateService)
    {
        $this->templateService = $templateService;
    }

    public function index(): JsonResponse
    {
        $templates = ProductTemplate::where('is_active', true)
            ->orderBy('sort_order')
            ->get(['id', 'name', 'slug', 'description', 'icon']);

        return response()->json([
            'success' => true,
            'data' => $templates
        ]);
    }

    public function show(ProductTemplate $template): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'template' => $template,
                'fields' => $this->templateService->getTemplateFields($template)
            ]
        ]);
    }

    public function getFields(ProductTemplate $template): JsonResponse
    {
        $fields = $this->templateService->getTemplateFields($template);
        
        return response()->json([
            'success' => true,
            'data' => $fields
        ]);
    }
}