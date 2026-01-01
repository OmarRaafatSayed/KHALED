import AnalyticsOverview from '@/components/vendor/AnalyticsOverview';

export default function VendorDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">مرحباً بك في لوحة البائع</h1>
        <p className="text-gray-600">إدارة متجرك ومنتجاتك ومبيعاتك</p>
      </div>
      
      <AnalyticsOverview />
    </div>
  );
}