export default function AddressesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">عناويني</h1>
        <p className="text-gray-600">إدارة عناوين الشحن والفوترة</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-gray-800">المنزل</h3>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">افتراضي</span>
          </div>
          <p className="text-gray-600 text-sm mb-2">أحمد محمد علي</p>
          <p className="text-gray-600 text-sm mb-2">شارع الملك فهد، حي النخيل</p>
          <p className="text-gray-600 text-sm mb-4">الرياض 12345، السعودية</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">تعديل</button>
            <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">حذف</button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-gray-800">العمل</h3>
          </div>
          <p className="text-gray-600 text-sm mb-2">أحمد محمد علي</p>
          <p className="text-gray-600 text-sm mb-2">طريق الملك عبدالعزيز، حي العليا</p>
          <p className="text-gray-600 text-sm mb-4">الرياض 11564، السعودية</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">تعديل</button>
            <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">حذف</button>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center min-h-[200px]">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">إضافة عنوان جديد</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            إضافة عنوان
          </button>
        </div>
      </div>
    </div>
  );
}