export default function VendorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم البائع</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">مرحباً، محمد أحمد</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">منتجاتي</h3>
            <p className="text-3xl font-bold text-blue-600">24</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">الطلبات الجديدة</h3>
            <p className="text-3xl font-bold text-green-600">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">إجمالي المبيعات</h3>
            <p className="text-3xl font-bold text-purple-600">12,450 ر.س</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">التقييم</h3>
            <p className="text-3xl font-bold text-orange-600">4.8 ⭐</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">إدارة المنتجات</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded text-blue-700">
                إضافة منتج جديد
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                عرض جميع المنتجات
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                المنتجات غير المتوفرة
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                إحصائيات المنتجات
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">إدارة الطلبات</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-red-50 hover:bg-red-100 rounded text-red-700">
                الطلبات الجديدة (8)
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                الطلبات قيد التنفيذ
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                الطلبات المكتملة
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                الطلبات المرتجعة
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">التقارير المالية</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                تقرير المبيعات الشهري
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                الأرباح والعمولات
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                طلبات السحب
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                تاريخ المدفوعات
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">إعدادات المتجر</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                معلومات المتجر
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                سياسات الشحن
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                سياسة الإرجاع
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                إعدادات الإشعارات
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">الطلبات الأخيرة</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">رقم الطلب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العميل</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#12345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">أحمد علي</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">250 ر.س</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      قيد التنفيذ
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-15</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#12344</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">فاطمة محمد</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">180 ر.س</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      مكتمل
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-14</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}