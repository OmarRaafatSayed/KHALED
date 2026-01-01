'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/hooks/useCart';
import Link from 'next/link';

export default function CartDemoPage() {
  const { items, addItem } = useCartStore();

  // Add demo items to cart
  useEffect(() => {
    if (items.length === 0) {
      const demoItems = [
        {
          id: '1',
          name: 'iPhone 15 Pro',
          price: 4999,
          quantity: 1,
          image: '/api/placeholder/200/200',
          vendor: 'متجر التقنية'
        },
        {
          id: '2',
          name: 'Samsung Galaxy S24',
          price: 3999,
          quantity: 2,
          image: '/api/placeholder/200/200',
          vendor: 'متجر الجوالات'
        },
        {
          id: '3',
          name: 'MacBook Air M3',
          price: 8999,
          quantity: 1,
          image: '/api/placeholder/200/200',
          vendor: 'متجر الكمبيوتر'
        }
      ];

      demoItems.forEach(item => addItem(item));
    }
  }, [items.length, addItem]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          تم إضافة منتجات تجريبية للسلة
        </h1>
        <p className="text-gray-600 mb-8">
          يمكنك الآن تجربة نظام الدفع متعدد الخطوات
        </p>
        
        <div className="space-y-4">
          <Link
            href="/checkout"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            بدء عملية الشراء
          </Link>
          <Link
            href="/"
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors inline-block"
          >
            العودة للرئيسية
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            المنتجات: {items.length} | 
            الإجمالي: {items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)} ر.س
          </p>
        </div>
      </div>
    </div>
  );
}