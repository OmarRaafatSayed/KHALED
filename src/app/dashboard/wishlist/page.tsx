import WishlistGrid from '@/components/dashboard/WishlistGrid';

export default function WishlistPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">المفضلة</h1>
        <p className="text-gray-600">المنتجات التي أضفتها لقائمة المفضلة</p>
      </div>
      
      <WishlistGrid />
    </div>
  );
}