export default function VerificationPage() {
  const requests = [
    { id: 1, name: 'خالد سعد', email: 'khaled@example.com', type: 'بائع', submitDate: '2024-01-22', status: 'معلق' },
    { id: 2, name: 'ليلى أحمد', email: 'layla@example.com', type: 'بائع', submitDate: '2024-01-21', status: 'معلق' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">طلبات التحقق</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الاسم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البريد الإلكتروني</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نوع الطلب</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ التقديم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.submitDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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