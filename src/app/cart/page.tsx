'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  vendor: string;
  inStock: boolean;
}

const mockCartItems: CartItem[] = [
  {
    id: 1,
    productId: 1,
    name: 'iPhone 15 Pro Max',
    price: 1299,
    originalPrice: 1399,
    image: '/api/placeholder/100/100',
    quantity: 1,
    vendor: 'متجر التقنية',
    inStock: true
  },
  {
    id: 2,
    productId: 3,
    name: 'Nike Air Max 270',
    price: 450,
    originalPrice: 550,
    image: '/api/placeholder/100/100',
    quantity: 2,
    vendor: 'متجر الرياضة',
    inStock: true
  },
  {
    id: 3,
    productId: 5,
    name: 'Sony WH-1000XM5',
    price: 350,
    image: '/api/placeholder/100/100',
    quantity: 1,
    vendor: 'متجر الصوتيات',
    inStock: false
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    if (window.confirm('هل أنت متأكد من حذف جميع المنتجات من السلة؟')) {
      setCartItems([]);
    }
  };

  const applyCoupon = () => {
    // Simulate coupon validation
    if (couponCode === 'SAVE10') {
      setAppliedCoupon({ code: couponCode, discount: 10 });
      setCouponCode('');
    } else if (couponCode === 'WELCOME20') {
      setAppliedCoupon({ code: couponCode, discount: 20 });
      setCouponCode('');
    } else {
      alert('كود الخصم غير صحيح');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);
  const couponDiscount = appliedCoupon ? (subtotal * appliedCoupon.discount / 100) : 0;
  const shipping = subtotal > 500 ? 0 : 25; // Free shipping over 500 SAR
  const tax = (subtotal - couponDiscount) * 0.15; // 15% VAT
  const total = subtotal - couponDiscount + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-gray-400 text-8xl mb-8">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">سلة المشتريات فارغة</h1>
            <p className="text-gray-600 mb-8">لم تقم بإضافة أي منتجات إلى سلة المشتريات بعد</p>
            <Link 
              href="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              تصفح المنتجات
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">سلة المشتريات</h1>
          <p className="text-gray-600">{cartItems.length} منتج في السلة</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">المنتجات</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    مسح السلة
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <Link 
                          href={`/products/${item.productId}`}
                          className="text-lg font-medium text-gray-900 hover:text-blue-600"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">بواسطة: {item.vendor}</p>
                        
                        <div className="flex items-center mt-2">
                          <span className="text-lg font-bold text-gray-900">{item.price} ريال</span>
                          {item.originalPrice && (
                            <span className="mr-2 text-sm text-gray-500 line-through">
                              {item.originalPrice} ريال
                            </span>
                          )}
                        </div>

                        {!item.inStock && (
                          <div className="mt-2">
                            <span className="text-red-600 text-sm">⚠️ هذا المنتج غير متوفر حالياً</span>
                          </div>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 text-gray-600 hover:text-gray-800"
                          >
                            -
                          </button>
                          <span className="px-4 py-2 border-x border-gray-300">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 text-gray-600 hover:text-gray-800"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800 p-2"
                        >
                          🗑️
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-left">
                        <div className="text-lg font-bold text-gray-900">
                          {(item.price * item.quantity).toLocaleString()} ريال
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">ملخص الطلب</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">المجموع الفرعي:</span>
                  <span className="font-medium">{subtotal.toLocaleString()} ريال</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>وفرت:</span>
                    <span className="font-medium">-{savings.toLocaleString()} ريال</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>خصم الكوبون ({appliedCoupon.code}):</span>
                    <div className="flex items-center">
                      <span className="font-medium">-{couponDiscount.toLocaleString()} ريال</span>
                      <button
                        onClick={removeCoupon}
                        className="mr-2 text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">الشحن:</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'مجاني' : `${shipping} ريال`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">ضريبة القيمة المضافة (15%):</span>
                  <span className="font-medium">{tax.toLocaleString()} ريال</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>الإجمالي:</span>
                    <span>{total.toLocaleString()} ريال</span>
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              {!appliedCoupon && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    كود الخصم
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="أدخل كود الخصم"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={!couponCode.trim()}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      تطبيق
                    </button>
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center block font-medium"
              >
                متابعة للدفع
              </Link>

              {/* Continue Shopping */}
              <Link
                href="/products"
                className="w-full mt-3 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors text-center block"
              >
                متابعة التسوق
              </Link>

              {/* Security Badge */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <span className="ml-2">🔒</span>
                  دفع آمن ومشفر
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}