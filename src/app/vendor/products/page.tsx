import ProductInventory from '@/components/vendor/ProductInventory';

export default function ProductsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">إدارة المنتجات</h1>
        <p className="text-gray-600">عرض وإدارة جميع منتجات متجرك</p>
      </div>
      
      <ProductInventory />
    </div>
  );
}