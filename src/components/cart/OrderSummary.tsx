'use client'

import { useState } from 'react'
import { Tag, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface OrderSummaryProps {
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  onApplyCoupon: (code: string) => void
  onProceedToCheckout?: () => void
  showCheckoutButton?: boolean
}

export default function OrderSummary({
  subtotal,
  shipping,
  tax,
  discount,
  total,
  onApplyCoupon,
  onProceedToCheckout,
  showCheckoutButton = true
}: OrderSummaryProps) {
  const [couponCode, setCouponCode] = useState('')
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return
    
    setIsApplyingCoupon(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    onApplyCoupon(couponCode)
    setIsApplyingCoupon(false)
  }

  return (
    <div className="bg-white rounded-lg border p-6 sticky top-6">
      <h3 className="text-lg font-semibold mb-4">ملخص الطلب</h3>
      
      {/* Price Breakdown */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">المجموع الفرعي</span>
          <span className="font-medium">{subtotal} ريال</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 flex items-center">
            <Truck className="h-4 w-4 ml-1" />
            الشحن
          </span>
          <span className="font-medium">
            {shipping === 0 ? 'مجاني' : `${shipping} ريال`}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">ضريبة القيمة المضافة</span>
          <span className="font-medium">{tax} ريال</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>الخصم</span>
            <span>-{discount} ريال</span>
          </div>
        )}
        
        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>المجموع الكلي</span>
            <span className="text-primary">{total} ريال</span>
          </div>
        </div>
      </div>

      {/* Coupon Code */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          كود الخصم
        </label>
        <div className="flex space-x-2 space-x-reverse">
          <Input
            type="text"
            placeholder="أدخل كود الخصم"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={handleApplyCoupon}
            disabled={!couponCode.trim() || isApplyingCoupon}
            className="px-3"
          >
            {isApplyingCoupon ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            ) : (
              <Tag className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Free Shipping Notice */}
      {shipping > 0 && subtotal < 200 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-blue-700">
            أضف منتجات بقيمة {200 - subtotal} ريال للحصول على شحن مجاني!
          </p>
        </div>
      )}

      {/* Checkout Button */}
      {showCheckoutButton && (
        <Button 
          onClick={onProceedToCheckout}
          className="w-full py-3"
          size="lg"
        >
          متابعة للدفع
        </Button>
      )}

      {/* Security Notice */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          🔒 معاملاتك آمنة ومحمية بتشفير SSL
        </p>
      </div>
    </div>
  )
}