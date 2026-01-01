import OrdersList from '@/components/dashboard/OrdersList';

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">مرحباً، أحمد محمد</h1>
        <p className="text-gray-600">إدارة طلباتك وبياناتك الشخصية</p>
      </div>
      
      <OrdersList />
    </div>
  );
}