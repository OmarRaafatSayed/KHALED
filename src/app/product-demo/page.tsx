'use client';

import ProductActions from '@/components/ProductActions';
import { Star } from 'lucide-react';

export default function ProductDemoPage() {
  const product = {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 5999,
    image: '/api/placeholder/400/400',
    vendor: 'متجر التقنية المتقدمة'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="grid grid-cols-4 gap-2">
                {[1,2,3,4].map(i => (
                  <img
                    key={i}
                    src={product.image}
                    alt=""
                    className="w-full h-20 object-cover rounded border-2 border-transparent hover:border-blue-500 cursor-pointer"
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600">البائع: {product.vendor}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">(128 تقييم)</span>
              </div>

              <div className="space-y-2">
                <p className="text-4xl font-bold text-blue-600">
                  {product.price.toFixed(2)} ر.س
                </p>
                <p className="text-sm text-gray-500">شامل الضريبة</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">المواصفات الرئيسية:</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• شاشة 6.7 بوصة Super Retina XDR</li>
                    <li>• معالج A17 Pro</li>
                    <li>• كاميرا 48 ميجابكسل</li>
                    <li>• ذاكرة 256 جيجابايت</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-green-800 text-sm">✓ متوفر في المخزن - شحن فوري</p>
                </div>
              </div>

              <ProductActions product={product} />

              <div className="border-t pt-6 space-y-3 text-sm text-gray-600">
                <p>🚚 شحن مجاني للطلبات أكثر من 200 ر.س</p>
                <p>↩️ إمكانية الإرجاع خلال 14 يوم</p>
                <p>🛡️ ضمان سنة من الشركة المصنعة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}