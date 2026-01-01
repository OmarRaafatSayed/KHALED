export default function PendingProductsPage() {
  const products = [
    { id: 1, name: 'هاتف ذكي جديد', vendor: 'متجر التقنية', price: 899, submitDate: '2024-01-22', status: 'قيد المراجعة' },
    { id: 2, name: 'ساعة ذكية', vendor: 'متجر الإلكترونيات', price: 299, submitDate: '2024-01-21', status: 'قيد المراجعة' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">مراجعة المنتجات الجديدة</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">اسم المنتج</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البائع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">السعر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ التقديم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price} ر.س</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.submitDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 ml-4">عرض</button>
                    <button className="text-green-600 hover:text-green-900 ml-4">قبول</button>
                    <button className="text-red-600 hover:text-red-900">رفض</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}