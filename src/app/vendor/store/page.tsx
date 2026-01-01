import StoreProfile from '@/components/vendor/StoreProfile';

export default function StorePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">إعدادات المتجر</h1>
        <p className="text-gray-600">تخصيص مظهر ومعلومات متجرك</p>
      </div>
      
      <StoreProfile />
    </div>
  );
}