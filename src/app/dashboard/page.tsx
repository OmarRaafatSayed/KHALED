import OrdersList from '@/components/dashboard/OrdersList';

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">مرحباً، أحمد محمد</h1>
        <p className="text-gray-600">إدارة طلباتك وبياناتك الشخصية</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">طلباتي الأخيرة</h2>
        </div>
        <OrdersList />
      </div>
    </div>
  );
}