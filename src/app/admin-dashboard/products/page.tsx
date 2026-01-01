'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  image: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'pending';
  vendor: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    image: '/api/placeholder/60/60',
    name: 'iPhone 15 Pro Max',
    category: 'Electronics > Smartphones',
    brand: 'Apple',
    price: 1299,
    stock: 25,
    status: 'active',
    vendor: 'TechStore'
  },
  {
    id: 2,
    image: '/api/placeholder/60/60',
    name: 'Samsung Galaxy S24',
    category: 'Electronics > Smartphones',
    brand: 'Samsung',
    price: 999,
    stock: 0,
    status: 'inactive',
    vendor: 'MobileHub'
  },
  {
    id: 3,
    image: '/api/placeholder/60/60',
    name: 'MacBook Pro 16"',
    category: 'Electronics > Laptops',
    brand: 'Apple',
    price: 2499,
    stock: 12,
    status: 'active',
    vendor: 'TechStore'
  }
];

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    status: '',
    vendor: ''
  });

  const handleSelectAll = (checked: boolean) => {
    setSelectedProducts(checked ? products.map(p => p.id) : []);
  };

  const handleSelectProduct = (productId: number, checked: boolean) => {
    setSelectedProducts(prev => 
      checked 
        ? [...prev, productId]
        : prev.filter(id => id !== productId)
    );
  };

  const handleStatusToggle = (productId: number) => {
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
    ));
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">إدارة المنتجات</h1>
            <Link 
              href="/admin-dashboard/products/add"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              إضافة منتج جديد
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="">جميع الفئات</option>
              <option value="electronics">الإلكترونيات</option>
              <option value="fashion">الأزياء</option>
              <option value="home">المنزل والحديقة</option>
            </select>

            <select 
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={filters.brand}
              onChange={(e) => setFilters({...filters, brand: e.target.value})}
            >
              <option value="">جميع البراندات</option>
              <option value="apple">Apple</option>
              <option value="samsung">Samsung</option>
              <option value="nike">Nike</option>
            </select>

            <select 
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
              <option value="pending">في الانتظار</option>
            </select>

            <select 
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={filters.vendor}
              onChange={(e) => setFilters({...filters, vendor: e.target.value})}
            >
              <option value="">جميع البائعين</option>
              <option value="techstore">TechStore</option>
              <option value="mobilehub">MobileHub</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <span className="text-blue-800">تم تحديد {selectedProducts.length} منتج</span>
              <div className="space-x-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  تفعيل المحدد
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  إلغاء تفعيل المحدد
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                  حذف المحدد
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === products.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المنتج
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الفئة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    البراند
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    السعر
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المخزون
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    البائع
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
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover ml-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                        {product.stock > 0 ? `${product.stock} قطعة` : 'نفد المخزون'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.vendor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(product.status)}>
                        {product.status === 'active' ? 'نشط' : 
                         product.status === 'inactive' ? 'غير نشط' : 'في الانتظار'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link 
                          href={`/admin-dashboard/products/edit/${product.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          تعديل
                        </Link>
                        <button
                          onClick={() => handleStatusToggle(product.id)}
                          className={`${product.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                        >
                          {product.status === 'active' ? 'إلغاء تفعيل' : 'تفعيل'}
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
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6 rounded-lg shadow">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              السابق
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              التالي
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                عرض <span className="font-medium">1</span> إلى <span className="font-medium">3</span> من <span className="font-medium">3</span> نتيجة
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  السابق
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  التالي
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}