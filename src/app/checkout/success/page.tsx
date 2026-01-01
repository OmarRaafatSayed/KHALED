'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, Truck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-123456';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            تم تأكيد طلبك بنجاح!
          </h1>
          <p className="text-gray-600">
            شكراً لك على الشراء من متجرنا
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">رقم الطلب</p>
          <p className="text-lg font-semibold text-gray-900">{orderId}</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Package className="w-5 h-5 text-blue-500" />
            <span>سيتم تحضير طلبك خلال 24 ساعة</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Truck className="w-5 h-5 text-green-500" />
            <span>التوصيل خلال 2-3 أيام عمل</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href={`/orders/${orderId}`}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            تتبع الطلب
          </Link>
          <Link
            href="/"
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors inline-block"
          >
            العودة للرئيسية
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            سيتم إرسال تفاصيل الطلب إلى بريدك الإلكتروني
          </p>
        </div>
      </div>
    </div>
  );
}