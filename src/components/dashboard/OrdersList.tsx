'use client';

import { Eye } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

const orders: Order[] = [
  { id: '#12345', date: '2024-01-15', status: 'delivered', total: 299.99, items: 3 },
  { id: '#12346', date: '2024-01-10', status: 'processing', total: 149.50, items: 2 },
  { id: '#12347', date: '2024-01-05', status: 'cancelled', total: 89.99, items: 1 },
];

const statusConfig = {
  processing: { label: 'قيد المعالجة', color: 'bg-yellow-100 text-yellow-800' },
  delivered: { label: 'تم التسليم', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'ملغي', color: 'bg-red-100 text-red-800' },
};

export default function OrdersList() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">طلباتي</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">رقم الطلب</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العناصر</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[order.status].color}`}>
                    {statusConfig[order.status].label}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.items} عنصر
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    <Eye size={16} />
                    عرض التفاصيل
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}