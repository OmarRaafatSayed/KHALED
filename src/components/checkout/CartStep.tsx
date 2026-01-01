'use client';

import { useCartStore } from '@/hooks/useCart';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartStepProps {
  onNext: () => void;
}

export default function CartStep({ onNext }: CartStepProps) {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">سلة المشتريات فارغة</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          تصفح المنتجات
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">سلة المشتريات ({items.length} منتج)</h2>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
        >
          <Trash2 size={16} />
          إفراغ السلة
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg border flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500">البائع: {item.vendor}</p>
              <p className="text-lg font-semibold text-blue-600 mt-1">
                {item.price.toFixed(2)} ر.س
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                <Minus size={16} />
              </button>
              
              <span className="w-12 text-center font-medium">{item.quantity}</span>
              
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="text-right">
              <p className="font-semibold text-lg">
                {(item.price * item.quantity).toFixed(2)} ر.س
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-700 text-sm mt-1"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-6">
        <button
          onClick={onNext}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
        >
          متابعة إلى الشحن
        </button>
      </div>
    </div>
  );
}