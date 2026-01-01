'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId: number | null;
  children: Category[];
  productsCount: number;
  isActive: boolean;
  sortOrder: number;
}

const mockCategories: Category[] = [
  {
    id: 1,
    name: 'الإلكترونيات',
    slug: 'electronics',
    description: 'جميع المنتجات الإلكترونية',
    image: '/api/placeholder/60/60',
    parentId: null,
    productsCount: 150,
    isActive: true,
    sortOrder: 1,
    children: [
      {
        id: 2,
        name: 'الهواتف الذكية',
        slug: 'smartphones',
        description: 'هواتف ذكية من جميع الماركات',
        image: '/api/placeholder/60/60',
        parentId: 1,
        productsCount: 45,
        isActive: true,
        sortOrder: 1,
        children: []
      },
      {
        id: 3,
        name: 'أجهزة الكمبيوتر',
        slug: 'computers',
        description: 'أجهزة كمبيوتر محمولة ومكتبية',
        image: '/api/placeholder/60/60',
        parentId: 1,
        productsCount: 32,
        isActive: true,
        sortOrder: 2,
        children: []
      }
    ]
  },
  {
    id: 4,
    name: 'الأزياء',
    slug: 'fashion',
    description: 'ملابس وإكسسوارات',
    image: '/api/placeholder/60/60',
    parentId: null,
    productsCount: 89,
    isActive: true,
    sortOrder: 2,
    children: [
      {
        id: 5,
        name: 'ملابس رجالية',
        slug: 'mens-clothing',
        description: 'ملابس للرجال',
        image: '/api/placeholder/60/60',
        parentId: 4,
        productsCount: 34,
        isActive: true,
        sortOrder: 1,
        children: []
      }
    ]
  }
];

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([1, 4]);

  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    parentId: null as number | null,
    image: null as File | null
  });

  const toggleExpanded = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAddCategory = () => {
    const category: Category = {
      id: Date.now(),
      name: newCategory.name,
      slug: newCategory.slug,
      description: newCategory.description,
      image: '/api/placeholder/60/60',
      parentId: newCategory.parentId,
      children: [],
      productsCount: 0,
      isActive: true,
      sortOrder: 1
    };

    if (newCategory.parentId) {
      // Add as subcategory
      setCategories(prev => prev.map(cat => 
        cat.id === newCategory.parentId 
          ? { ...cat, children: [...cat.children, category] }
          : cat
      ));
    } else {
      // Add as main category
      setCategories(prev => [...prev, category]);
    }

    setNewCategory({ name: '', slug: '', description: '', parentId: null, image: null });
    setShowAddModal(false);
  };

  const handleToggleStatus = (categoryId: number, parentId?: number) => {
    if (parentId) {
      setCategories(prev => prev.map(cat => 
        cat.id === parentId 
          ? {
              ...cat,
              children: cat.children.map(child => 
                child.id === categoryId 
                  ? { ...child, isActive: !child.isActive }
                  : child
              )
            }
          : cat
      ));
    } else {
      setCategories(prev => prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, isActive: !cat.isActive }
          : cat
      ));
    }
  };

  const renderCategory = (category: Category, level = 0) => (
    <div key={category.id} className={`${level > 0 ? 'ml-8' : ''}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {category.children.length > 0 && (
              <button
                onClick={() => toggleExpanded(category.id)}
                className="text-gray-500 hover:text-gray-700"
              >
                {expandedCategories.includes(category.id) ? '▼' : '▶'}
              </button>
            )}
            
            <img 
              src={category.image} 
              alt={category.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.description}</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-gray-400">/{category.slug}</span>
                <span className="text-xs text-blue-600">{category.productsCount} منتج</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              category.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {category.isActive ? 'نشط' : 'غير نشط'}
            </span>

            <button
              onClick={() => handleToggleStatus(category.id, category.parentId || undefined)}
              className={`px-3 py-1 text-xs rounded ${
                category.isActive 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {category.isActive ? 'إلغاء تفعيل' : 'تفعيل'}
            </button>

            <button
              onClick={() => setEditingCategory(category)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              تعديل
            </button>

            <button className="text-red-600 hover:text-red-800 text-sm">
              حذف
            </button>
          </div>
        </div>
      </div>

      {expandedCategories.includes(category.id) && category.children.map(child => 
        renderCategory(child, level + 1)
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">إدارة التصنيفات</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              إضافة تصنيف جديد
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">إحصائيات التصنيفات</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
              <div className="text-sm text-blue-800">التصنيفات الرئيسية</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {categories.reduce((acc, cat) => acc + cat.children.length, 0)}
              </div>
              <div className="text-sm text-green-800">التصنيفات الفرعية</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {categories.reduce((acc, cat) => acc + cat.productsCount, 0)}
              </div>
              <div className="text-sm text-purple-800">إجمالي المنتجات</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {categories.filter(cat => cat.isActive).length}
              </div>
              <div className="text-sm text-orange-800">التصنيفات النشطة</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {categories.map(category => renderCategory(category))}
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">إضافة تصنيف جديد</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم التصنيف
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل اسم التصنيف"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الرابط (Slug)
                </label>
                <input
                  type="text"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="category-slug"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  التصنيف الأب
                </label>
                <select
                  value={newCategory.parentId || ''}
                  onChange={(e) => setNewCategory({ 
                    ...newCategory, 
                    parentId: e.target.value ? parseInt(e.target.value) : null 
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">تصنيف رئيسي</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الوصف
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="وصف التصنيف"
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
                onClick={handleAddCategory}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                إضافة التصنيف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}