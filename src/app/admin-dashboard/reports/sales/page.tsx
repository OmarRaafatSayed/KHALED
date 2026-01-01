export default function SalesReportPage() {
  const salesData = [
    { month: 'يناير 2024', totalSales: 125000, orders: 450, avgOrder: 278 },
    { month: 'ديسمبر 2023', totalSales: 98000, orders: 380, avgOrder: 258 },
    { month: 'نوفمبر 2023', totalSales: 87000, orders: 320, avgOrder: 272 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">تقرير المبيعات الشهري</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">إجمالي المبيعات</h3>
            <p className="text-3xl font-bold text-green-600">125,000 ر.س</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">عدد الطلبات</h3>
            <p className="text-3xl font-bold text-blue-600">450</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">متوسط الطلب</h3>
            <p className="text-3xl font-bold text-purple-600">278 ر.س</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">المبيعات الشهرية</h2>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الشهر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">إجمالي المبيعات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عدد الطلبات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">متوسط الطلب</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesData.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.totalSales.toLocaleString()} ر.س</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.avgOrder} ر.س</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}