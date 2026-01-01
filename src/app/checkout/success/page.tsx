'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Package, Truck, Eye, Download, Share2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function OrderSuccessPage() {
  const [orderId] = useState('ORD-2024-001234')
  const [estimatedDelivery] = useState('3-5 أيام عمل')

  useEffect(() => {
    // إرسال تأكيد الطلب عبر البريد الإلكتروني
    // تحديث حالة السلة
    // إرسال إشعارات
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              تم تأكيد طلبك بنجاح! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              شكراً لك على ثقتك بنا. سنقوم بمعالجة طلبك في أقرب وقت ممكن.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">تفاصيل الطلب</h2>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                مؤكد
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">رقم الطلب</h3>
                <p className="text-2xl font-bold text-primary">{orderId}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">موعد التوصيل المتوقع</h3>
                <p className="text-lg text-gray-700">{estimatedDelivery}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">المبلغ الإجمالي</h3>
                <p className="text-xl font-bold text-gray-900">6,782 ريال</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">طريقة الدفع</h3>
                <p className="text-gray-700">بطاقة ائتمانية **** 3456</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">الخطوات التالية</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">تحضير الطلب</h4>
                  <p className="text-sm text-gray-600">
                    سنقوم بتحضير وتغليف منتجاتك بعناية فائقة
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Truck className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">الشحن والتوصيل</h4>
                  <p className="text-sm text-gray-600">
                    سيتم شحن طلبك وتوصيله إلى العنوان المحدد
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">استلام الطلب</h4>
                  <p className="text-sm text-gray-600">
                    استلم طلبك واستمتع بمنتجاتك الجديدة
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Link href={`/orders/${orderId}`}>
              <Button className="w-full" size="lg">
                <Eye className="h-4 w-4 ml-2" />
                تتبع الطلب
              </Button>
            </Link>
            
            <Button variant="outline" className="w-full" size="lg">
              <Download className="h-4 w-4 ml-2" />
              تحميل الفاتورة
            </Button>
          </div>

          {/* Additional Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button variant="outline">
                متابعة التسوق
              </Button>
            </Link>
            
            <Button variant="outline">
              <Share2 className="h-4 w-4 ml-2" />
              مشاركة
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-2">
              هل تحتاج مساعدة؟ تواصل معنا
            </p>
            <div className="flex justify-center space-x-4 space-x-reverse text-sm">
              <a href="tel:+966501234567" className="text-primary hover:underline">
                📞 +966 50 123 4567
              </a>
              <a href="mailto:support@tailadmin.com" className="text-primary hover:underline">
                ✉️ support@tailadmin.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}