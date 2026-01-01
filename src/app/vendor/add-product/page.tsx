import AddProductForm from '@/components/vendor/AddProductForm';

export default function AddProductPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">إضافة منتج جديد</h1>
        <p className="text-gray-600">أضف منتج جديد إلى متجرك</p>
      </div>
      
      <AddProductForm />
    </div>
  );
}