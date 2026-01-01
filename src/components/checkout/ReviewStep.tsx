'use client';

import { useCartStore } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';

interface ReviewStepProps {
  onBack: () => void;
}

export default function ReviewStep({ onBack }: ReviewStepProps) {
  const { items, shippingAddress, paymentMethod, getTotal, clearCart } = useCartStore();
  const router = useRouter();

  const handlePlaceOrder = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Clear cart and redirect to success page
    clearCart();
    router.push('/checkout/success?orderId=ORD-' + Date.now());
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">مراجعة الطلب</h2>

      <div className="space-y-6">
        {/* Order Items */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-3">المنتجات ({items.length})</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>{(item.price * item.quantity).toFixed(2)} ر.س</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-3">عنوان الشحن</h3>
          {shippingAddress && (
            <div className="text-sm text-gray-600 space-y-1">
              <p>{shippingAddress.fullName}</p>
              <p>{shippingAddress.phone}</p>
              <p>{shippingAddress.address}</p>
              <p>{shippingAddress.city}, {shippingAddress.postalCode}</p>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-3">طريقة الدفع</h3>
          {paymentMethod && (
            <div className="text-sm text-gray-600">
              {paymentMethod.type === 'card' ? (
                <div>
                  <p>بطاقة ائتمان</p>
                  <p>**** **** **** {paymentMethod.cardNumber?.slice(-4)}</p>
                </div>
              ) : paymentMethod.type === 'paypal' ? (
                <p>PayPal</p>
              ) : (
                <p>الدفع عند الاستلام</p>
              )}
            </div>
          )}
        </div>

        {/* Order Total */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">إجمالي الطلب</span>
            <span className="text-xl font-bold text-blue-600">
              {getTotal().toFixed(2)} ر.س
            </span>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2">
          <input type="checkbox" id="terms" className="mt-1" />
          <label htmlFor="terms" className="text-sm text-gray-600">
            أوافق على <a href="#" className="text-blue-600 hover:underline">الشروط والأحكام</a> و
            <a href="#" className="text-blue-600 hover:underline"> سياسة الخصوصية</a>
          </label>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          العودة للدفع
        </button>
        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-medium"
        >
          تأكيد الطلب
        </button>
      </div>
    </div>
  );
}