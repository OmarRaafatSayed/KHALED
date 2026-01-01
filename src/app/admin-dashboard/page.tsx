'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم الأدمين</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">مرحباً، أدمين</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">إجمالي المستخدمين</h3>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">إجمالي البائعين</h3>
            <p className="text-3xl font-bold text-green-600">89</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">إجمالي المنتجات</h3>
            <p className="text-3xl font-bold text-purple-600">567</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">إجمالي الطلبات</h3>
            <p className="text-3xl font-bold text-orange-600">2,345</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">إدارة المستخدمين</h2>
            <div className="space-y-3">
              <Link href="/admin-dashboard/users" className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                قائمة جميع المستخدمين
              </Link>
              <Link href="/admin-dashboard/users/vendors" className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                إدارة البائعين
              </Link>
              <Link href="/admin-dashboard/users/roles" className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                الأدوار والصلاحيات
              </Link>
              <Link href="/admin-dashboard/users/support" className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                تذاكر الدعم الفني
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">إدارة المنتجات</h2>
            <div className="space-y-3">
              <Link href="/admin-dashboard/products" className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                قائمة جميع المنتجات
              </Link>
              <Link href="/admin-dashboard/products/add" className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                إضافة منتج جديد
              </Link>
              <Link href="/admin-dashboard/products/categories" className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                إدارة التصنيفات
              </Link>
              <Link href="/admin-dashboard/products/brands" className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                إدارة البراندات
              </Link>
              <Link href="/admin-dashboard/products/reviews" className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                تقييمات المنتجات
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">التقارير المالية</h2>
            <div className="space-y-3">
              <Link href="/admin-dashboard/reports/sales" className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                تقرير المبيعات الشهري
              </Link>
              <Link href="/admin-dashboard/reports/commissions" className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                عمولات البائعين
              </Link>
              <Link href="/admin-dashboard/reports/payments" className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                المدفوعات المعلقة
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">إعدادات النظام</h2>
            <div className="space-y-3">
              <Link href="/admin-dashboard/settings/general" className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                الإعدادات العامة
              </Link>
              <Link href="/admin-dashboard/settings/payments" className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                إعدادات طرق الدفع
              </Link>
              <Link href="/admin-dashboard/settings/localization" className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                إعدادات اللغة والعملة
              </Link>
              <Link href="/admin-dashboard/settings/seo" className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                SEO والتحليلات
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}