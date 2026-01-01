'use client';

import { useState } from 'react';

interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
  description: string;
  website: string;
  productsCount: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

const mockBrands: Brand[] = [
  {
    id: 1,
    name: 'Apple',
    slug: 'apple',
    logo: '/api/placeholder/80/80',
    description: 'شركة تقنية أمريكية متخصصة في الإلكترونيات الاستهلاكية',
    website: 'https://apple.com',
    productsCount: 45,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Samsung',
    slug: 'samsung',
    logo: '/api/placeholder/80/80',
    description: 'شركة كورية جنوبية متعددة الجنسيات',
    website: 'https://samsung.com',
    productsCount: 38,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-10'
  },
  {
    id: 3,
    name: 'Nike',
    slug: 'nike',
    logo: '/api/placeholder/80/80',
    description: 'شركة أمريكية متخصصة في الملابس والأحذية الرياضية',
    website: 'https://nike.com',
    productsCount: 67,
    isActive: true,
    isFeatured: false,
    createdAt: '2024-01-08'
  },
  {
    id: 4,
    name: 'Adidas',
    slug: 'adidas',
    logo: '/api/placeholder/80/80',
    description: 'شركة ألمانية متخصصة في الملابس والأحذية الرياضية',
    website: 'https://adidas.com',
    productsCount: 52,
    isActive: false,
    isFeatured: false,
    createdAt: '2024-01-05'
  }
];

export default function BrandManagement() {
  const [brands, setBrands] = useState<Brand[]>(mockBrands);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [newBrand, setNewBrand] = useState({
    name: '',
    slug: '',
    description: '',
    website: '',
    logo: null as File | null
  });

  const handleAddBrand = () => {
    const brand: Brand = {
      id: Date.now(),
      name: newBrand.name,
      slug: newBrand.slug,
      logo: '/api/placeholder/80/80',
      description: newBrand.description,
      website: newBrand.website,
      productsCount: 0,
      isActive: true,
      isFeatured: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBrands(prev => [...prev, brand]);
    setNewBrand({ name: '', slug: '', description: '', website: '', logo: null });
    setShowAddModal(false);
  };

  const handleToggleStatus = (brandId: number) => {
    setBrands(prev => prev.map(brand => 
      brand.id === brandId 
        ? { ...brand, isActive: !brand.isActive }
        : brand
    ));
  };

  const handleToggleFeatured = (brandId: number) => {
    setBrands(prev => prev.map(brand => 
      brand.id === brandId 
        ? { ...brand, isFeatured: !brand.isFeatured }
        : brand
    ));
  };

  const activeBrands = brands.filter(brand => brand.isActive);
  const featuredBrands = brands.filter(brand => brand.isFeatured);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">إدارة البراندات</h1>
            <div className="flex items-center space-x-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded text-sm ${
                    viewMode === 'grid' 
                      ? 'bg-white text-gray-900 shadow' 
                      : 'text-gray-600'
                  }`}
                >
                  شبكة
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded text-sm ${
                    viewMode === 'list' 
                      ? 'bg-white text-gray-900 shadow' 
                      : 'text-gray-600'
                  }`}
                >
                  قائمة
                </button>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                إضافة براند جديد
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{brands.length}</div>
              <div className="text-sm text-blue-800">إجمالي البراندات</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{activeBrands.length}</div>
              <div className="text-sm text-green-800">البراندات النشطة</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{featuredBrands.length}</div>
              <div className="text-sm text-purple-800">البراندات المميزة</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {brands.reduce((acc, brand) => acc + brand.productsCount, 0)}
              </div>
              <div className="text-sm text-orange-800">إجمالي المنتجات</div>
            </div>
          </div>
        </div>

        {/* Brands Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <div key={brand.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <img 
                      src={brand.logo} 
                      alt={brand.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex space-x-1">
                      {brand.isFeatured && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          ⭐ مميز
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        brand.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {brand.isActive ? 'نشط' : 'غير نشط'}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{brand.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{brand.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{brand.productsCount} منتج</span>
                    <span>{brand.createdAt}</span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleFeatured(brand.id)}
                      className={`flex-1 px-3 py-2 text-xs rounded ${
                        brand.isFeatured
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {brand.isFeatured ? 'إلغاء التمييز' : 'تمييز'}
                    </button>
                    <button
                      onClick={() => handleToggleStatus(brand.id)}
                      className={`flex-1 px-3 py-2 text-xs rounded ${
                        brand.isActive
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {brand.isActive ? 'إلغاء تفعيل' : 'تفعيل'}
                    </button>
                  </div>

                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => setEditingBrand(brand)}
                      className="flex-1 px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      تعديل
                    </button>
                    <button className="flex-1 px-3 py-2 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200">
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    البراند
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الوصف
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المنتجات
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {brands.map((brand) => (
                  <tr key={brand.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={brand.logo} 
                          alt={brand.name}
                          className="w-12 h-12 rounded-lg object-cover ml-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {brand.name}
                            {brand.isFeatured && (
                              <span className="mr-2 text-yellow-500">⭐</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">/{brand.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {brand.description}
                      </div>
                      {brand.website && (
                        <a 
                          href={brand.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          زيارة الموقع
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {brand.productsCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        brand.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {brand.isActive ? 'نشط' : 'غير نشط'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingBrand(brand)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => handleToggleStatus(brand.id)}
                          className={`${
                            brand.isActive 
                              ? 'text-red-600 hover:text-red-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {brand.isActive ? 'إلغاء تفعيل' : 'تفعيل'}
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Brand Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">إضافة براند جديد</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم البراند
                </label>
                <input
                  type="text"
                  value={newBrand.name}
                  onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل اسم البراند"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الرابط (Slug)
                </label>
                <input
                  type="text"
                  value={newBrand.slug}
                  onChange={(e) => setNewBrand({ ...newBrand, slug: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="brand-slug"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  موقع البراند
                </label>
                <input
                  type="url"
                  value={newBrand.website}
                  onChange={(e) => setNewBrand({ ...newBrand, website: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الوصف
                </label>
                <textarea
                  value={newBrand.description}
                  onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="وصف البراند"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  لوجو البراند
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewBrand({ ...newBrand, logo: e.target.files?.[0] || null })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddBrand}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                إضافة البراند
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}