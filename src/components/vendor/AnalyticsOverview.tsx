'use client';

import { TrendingUp, Package, DollarSign, ShoppingCart } from 'lucide-react';

const stats = [
  {
    title: 'إجمالي المبيعات',
    value: '$12,450',
    change: '+12%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600 bg-green-50'
  },
  {
    title: 'عدد الطلبات',
    value: '156',
    change: '+8%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'text-blue-600 bg-blue-50'
  },
  {
    title: 'المنتجات',
    value: '48',
    change: '+3',
    trend: 'up',
    icon: Package,
    color: 'text-purple-600 bg-purple-50'
  },
  {
    title: 'الأرباح',
    value: '$3,240',
    change: '+15%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-orange-600 bg-orange-50'
  }
];

const salesData = [
  { month: 'يناير', sales: 4000 },
  { month: 'فبراير', sales: 3000 },
  { month: 'مارس', sales: 5000 },
  { month: 'أبريل', sales: 4500 },
  { month: 'مايو', sales: 6000 },
  { month: 'يونيو', sales: 5500 },
];

export default function AnalyticsOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} من الشهر الماضي</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">أداء المبيعات</h3>
        <div className="h-64 flex items-end justify-between gap-4">
          {salesData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-green-500 rounded-t-md transition-all hover:bg-green-600"
                style={{ height: `${(data.sales / 6000) * 100}%` }}
              ></div>
              <span className="text-sm text-gray-600 mt-2">{data.month}</span>
              <span className="text-xs text-gray-500">${data.sales}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">الطلبات الأخيرة</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((order) => (
              <div key={order} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">طلب #1234{order}</p>
                  <p className="text-sm text-gray-600">منتج إلكتروني × 2</p>
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">$299.99</p>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    مكتمل
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}