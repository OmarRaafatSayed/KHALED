'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/hooks/useCart';

export default function OrderSummary() {
  const [mounted, setMounted] = useState(false);
  const { items, discountCode, discountAmount, getSubtotal, getTotal, applyDiscount } = useCartStore();
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg sticky top-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ملخص الطلب</h3>
        <div className="space-y-3 mb-4">
          <div className="text-sm text-gray-600">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const shipping = 50;
  const tax = subtotal * 0.15;
  const total = getTotal();

  const handleApplyDiscount = () => {
    applyDiscount(couponCode);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg sticky top-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">ملخص الطلب</h3>
      
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-gray-600">{item.name} × {item.quantity}</span>
            <span className="font-medium">{((item.price || 0) * item.quantity).toFixed(2)} ر.س</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">المجموع الفرعي</span>
          <span>{subtotal.toFixed(2)} ر.س</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">الشحن</span>
          <span>{shipping.toFixed(2)} ر.س</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">الضريبة</span>
          <span>{tax.toFixed(2)} ر.س</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>خصم ({discountCode})</span>
            <span>-{discountAmount.toFixed(2)} ر.س</span>
          </div>
        )}
      </div>

      <div className="border-t pt-4 mb-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>الإجمالي</span>
          <span>{total.toFixed(2)} ر.س</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="كود الخصم"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <button
            onClick={handleApplyDiscount}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
          >
            تطبيق
          </button>
        </div>
      </div>
    </div>
  );
}