<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaService
{
    private array $imageSizes = [
        'thumbnail' => ['width' => 150, 'height' => 150],
        'medium' => ['width' => 400, 'height' => 400],
        'large' => ['width' => 800, 'height' => 800]
    ];

    public function uploadProductImages(array $files, string $productSlug): array
    {
        $uploadedImages = [];

        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $imageData = $this->processImage($file, "products/{$productSlug}");
                $uploadedImages[] = $imageData;
            }
        }

        return $uploadedImages;
    }

    public function uploadReviewImages(array $files, int $reviewId): array
    {
        $uploadedImages = [];

        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $imageData = $this->processImage($file, "reviews/{$reviewId}");
                $uploadedImages[] = $imageData;
            }
        }

        return $uploadedImages;
    }

    public function uploadSingleImage(UploadedFile $file, string $path): array
    {
        return $this->processImage($file, $path);
    }

    private function processImage(UploadedFile $file, string $basePath): array
    {
        $filename = Str::random(40) . '.' . $file->getClientOriginalExtension();
        
        $imageData = [
            'filename' => $filename,
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'paths' => []
        ];

        // حفظ الصورة الأصلية فقط
        $originalPath = "{$basePath}/original/{$filename}";
        Storage::disk('public')->putFileAs("{$basePath}/original", $file, $filename);
        $imageData['paths']['original'] = $originalPath;
        
        // نسخ نفس المسار لجميع الأحجام مؤقتاً
        foreach ($this->imageSizes as $sizeName => $dimensions) {
            $imageData['paths'][$sizeName] = $originalPath;
        }

        return $imageData;
    }

    private function createResizedImage(UploadedFile $file, string $basePath, string $filename, string $sizeName, array $dimensions): string
    {
        // استخدام GD library بدلاً من Intervention Image
        $sourceImage = $this->createImageFromFile($file);
        if (!$sourceImage) {
            return null;
        }

        $resized = $this->resizeImage($sourceImage, $dimensions['width'], $dimensions['height']);
        
        $resizedPath = "{$basePath}/{$sizeName}/{$filename}";
        $fullPath = storage_path("app/public/{$resizedPath}");
        
        // إنشاء المجلد إذا لم يكن موجود
        $directory = dirname($fullPath);
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        // حفظ الصورة
        $this->saveImage($resized, $fullPath, $file->getClientOriginalExtension());
        
        imagedestroy($sourceImage);
        imagedestroy($resized);
        
        return $resizedPath;
    }

    private function createImageFromFile(UploadedFile $file)
    {
        $mimeType = $file->getMimeType();
        
        switch ($mimeType) {
            case 'image/jpeg':
                return imagecreatefromjpeg($file->getPathname());
            case 'image/png':
                return imagecreatefrompng($file->getPathname());
            case 'image/gif':
                return imagecreatefromgif($file->getPathname());
            default:
                return null;
        }
    }

    private function resizeImage($sourceImage, int $newWidth, int $newHeight)
    {
        $sourceWidth = imagesx($sourceImage);
        $sourceHeight = imagesy($sourceImage);
        
        // حساب النسبة للحفاظ على الأبعاد
        $ratio = min($newWidth / $sourceWidth, $newHeight / $sourceHeight);
        $finalWidth = intval($sourceWidth * $ratio);
        $finalHeight = intval($sourceHeight * $ratio);
        
        $resizedImage = imagecreatetruecolor($finalWidth, $finalHeight);
        
        // الحفاظ على الشفافية للـ PNG
        imagealphablending($resizedImage, false);
        imagesavealpha($resizedImage, true);
        
        imagecopyresampled(
            $resizedImage, $sourceImage,
            0, 0, 0, 0,
            $finalWidth, $finalHeight,
            $sourceWidth, $sourceHeight
        );
        
        return $resizedImage;
    }

    private function saveImage($image, string $path, string $extension): void
    {
        switch (strtolower($extension)) {
            case 'jpg':
            case 'jpeg':
                imagejpeg($image, $path, 85);
                break;
            case 'png':
                imagepng($image, $path, 8);
                break;
            case 'gif':
                imagegif($image, $path);
                break;
        }
    }

    public function deleteImages(array $images): void
    {
        foreach ($images as $imageData) {
            if (isset($imageData['paths'])) {
                foreach ($imageData['paths'] as $path) {
                    Storage::disk('public')->delete($path);
                }
            }
        }
    }

    public function getImageUrl(array $imageData, string $size = 'medium'): ?string
    {
        if (isset($imageData['paths'][$size])) {
            return Storage::disk('public')->url($imageData['paths'][$size]);
        }
        
        if (isset($imageData['paths']['original'])) {
            return Storage::disk('public')->url($imageData['paths']['original']);
        }
        
        return null;
    }
}