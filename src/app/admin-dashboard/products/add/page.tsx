'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ProductForm {
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  brand: string;
  sku: string;
  price: number;
  comparePrice: number;
  cost: number;
  stock: number;
  lowStockThreshold: number;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  images: File[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  status: 'active' | 'inactive' | 'draft';
  featured: boolean;
}

export default function AddProduct() {
  const [activeTab, setActiveTab] = useState('basic');
  const [form, setForm] = useState<ProductForm>({
    name: '',
    description: '',
    shortDescription: '',
    category: '',
    brand: '',
    sku: '',
    price: 0,
    comparePrice: 0,
    cost: 0,
    stock: 0,
    lowStockThreshold: 5,
    weight: 0,
    dimensions: { length: 0, width: 0, height: 0 },
    images: [],
    seo: { title: '', description: '', keywords: '' },
    status: 'draft',
    featured: false
  });

  const tabs = [
    { id: 'basic', name: 'المعلومات الأساسية', icon: '📝' },
    { id: 'images', name: 'الصور', icon: '🖼️' },
    { id: 'pricing', name: 'التسعير والمخزون', icon: '💰' },
    { id: 'seo', name: 'تحسين محركات البحث', icon: '🔍' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm({ ...form, images: [...form.images, ...Array.from(e.target.files)] });
    }
  };

  const removeImage = (index: number) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product data:', form);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin-dashboard/products"
                className="text-gray-500 hover:text-gray-700"
              >
                ← العودة للمنتجات
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">إضافة منتج جديد</h1>
            </div>
            <div className="flex space-x-3">
              <button 
                type="button"
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                حفظ كمسودة
              </button>
              <button 
                type="submit"
                form="product-form"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                نشر المنتج
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="ml-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <form id="product-form" onSubmit={handleSubmit} className="p-6">
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم المنتج *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="أدخل اسم المنتج"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رمز المنتج (SKU) *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.sku}
                      onChange={(e) => setForm({ ...form, sku: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="مثال: PROD-001"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الفئة *
                    </label>
                    <select
                      required
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">اختر الفئة</option>
                      <option value="electronics">الإلكترونيات</option>
                      <option value="fashion">الأزياء</option>
                      <option value="home">المنزل والحديقة</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      البراند
                    </label>
                    <select
                      value={form.brand}
                      onChange={(e) => setForm({ ...form, brand: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">اختر البراند</option>
                      <option value="apple">Apple</option>
                      <option value="samsung">Samsung</option>
                      <option value="nike">Nike</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وصف مختصر
                  </label>
                  <textarea
                    value={form.shortDescription}
                    onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="وصف مختصر للمنتج (سيظهر في قوائم المنتجات)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الوصف التفصيلي
                  </label>
                  <div className="border border-gray-300 rounded-lg">
                    <div className="bg-gray-50 px-3 py-2 border-b border-gray-300 flex space-x-2">
                      <button type="button" className="p-1 text-gray-600 hover:text-gray-800">
                        <strong>B</strong>
                      </button>
                      <button type="button" className="p-1 text-gray-600 hover:text-gray-800">
                        <em>I</em>
                      </button>
                      <button type="button" className="p-1 text-gray-600 hover:text-gray-800">
                        U
                      </button>
                    </div>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={8}
                      className="w-full px-3 py-2 border-0 focus:ring-0 resize-none"
                      placeholder="وصف تفصيلي للمنتج مع المميزات والمواصفات..."
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                    منتج مميز (سيظهر في الصفحة الرئيسية)
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'images' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    صور المنتج
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="text-gray-400 mb-2">
                        <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">
                        اضغط لرفع الصور أو اسحبها هنا
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF حتى 10MB
                      </p>
                    </label>
                  </div>
                </div>

                {form.images.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">الصور المرفوعة</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {form.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Product ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                          {index === 0 && (
                            <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                              الصورة الرئيسية
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      السعر *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                      <span className="absolute right-3 top-2 text-gray-500">$</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      السعر المقارن
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        value={form.comparePrice}
                        onChange={(e) => setForm({ ...form, comparePrice: parseFloat(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                      <span className="absolute right-3 top-2 text-gray-500">$</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      التكلفة
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        value={form.cost}
                        onChange={(e) => setForm({ ...form, cost: parseFloat(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                      <span className="absolute right-3 top-2 text-gray-500">$</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الكمية المتاحة
                    </label>
                    <input
                      type="number"
                      value={form.stock}
                      onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      حد التنبيه للمخزون المنخفض
                    </label>
                    <input
                      type="number"
                      value={form.lowStockThreshold}
                      onChange={(e) => setForm({ ...form, lowStockThreshold: parseInt(e.target.value) })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="5"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">معلومات الشحن</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الوزن (كجم)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={form.weight}
                        onChange={(e) => setForm({ ...form, weight: parseFloat(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الطول (سم)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={form.dimensions.length}
                        onChange={(e) => setForm({ 
                          ...form, 
                          dimensions: { ...form.dimensions, length: parseFloat(e.target.value) }
                        })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        العرض (سم)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={form.dimensions.width}
                        onChange={(e) => setForm({ 
                          ...form, 
                          dimensions: { ...form.dimensions, width: parseFloat(e.target.value) }
                        })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الارتفاع (سم)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={form.dimensions.height}
                        onChange={(e) => setForm({ 
                          ...form, 
                          dimensions: { ...form.dimensions, height: parseFloat(e.target.value) }
                        })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان SEO
                  </label>
                  <input
                    type="text"
                    value={form.seo.title}
                    onChange={(e) => setForm({ 
                      ...form, 
                      seo: { ...form.seo, title: e.target.value }
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="عنوان محسن لمحركات البحث"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    الطول المثالي: 50-60 حرف
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وصف SEO
                  </label>
                  <textarea
                    value={form.seo.description}
                    onChange={(e) => setForm({ 
                      ...form, 
                      seo: { ...form.seo, description: e.target.value }
                    })}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="وصف محسن لمحركات البحث"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    الطول المثالي: 150-160 حرف
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الكلمات المفتاحية
                  </label>
                  <input
                    type="text"
                    value={form.seo.keywords}
                    onChange={(e) => setForm({ 
                      ...form, 
                      seo: { ...form.seo, keywords: e.target.value }
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="كلمة مفتاحية 1, كلمة مفتاحية 2, كلمة مفتاحية 3"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    افصل الكلمات المفتاحية بفاصلة
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">معاينة نتيجة البحث</h3>
                  <div className="bg-white p-3 rounded border">
                    <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                      {form.seo.title || form.name || 'عنوان المنتج'}
                    </div>
                    <div className="text-green-600 text-sm">
                      https://example.com/products/{form.sku || 'product-url'}
                    </div>
                    <div className="text-gray-600 text-sm mt-1">
                      {form.seo.description || form.shortDescription || 'وصف المنتج سيظهر هنا...'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}