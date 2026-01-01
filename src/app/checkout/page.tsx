'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CheckoutStepper from '@/components/cart/CheckoutStepper'
import ShippingForm from '@/components/cart/ShippingForm'
import PaymentForm from '@/components/cart/PaymentForm'
import OrderSummary from '@/components/cart/OrderSummary'

const checkoutSteps = [
  { id: 1, title: 'السلة', description: 'مراجعة المنتجات' },
  { id: 2, title: 'الشحن', description: 'عنوان التوصيل' },
  { id: 3, title: 'الدفع', description: 'طريقة الدفع' },
  { id: 4, title: 'المراجعة', description: 'تأكيد الطلب' }
]

export default function CheckoutPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(2)
  const [checkoutData, setCheckoutData] = useState({
    shippingAddress: null,
    paymentMethod: null,
    paymentData: null
  })

  // Mock order data
  const orderData = {
    subtotal: 5898,
    shipping: 0,
    tax: 884,
    discount: 0,
    total: 6782
  }

  const handleStepComplete = (stepData: any) => {
    setCheckoutData(prev => ({ ...prev, ...stepData }))
    
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1)
    } else {
      // إتمام الطلب
      router.push('/checkout/success')
    }
  }

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    } else {
      router.push('/cart')
    }
  }

  const handleApplyCoupon = (code: string) => {
    // محاكاة تطبيق كود الخصم
    console.log('Applied coupon:', code)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 2:
        return (
          <ShippingForm
            onNext={handleStepComplete}
            onBack={handleStepBack}
          />
        )
      case 3:
        return (
          <PaymentForm
            onNext={handleStepComplete}
            onBack={handleStepBack}
          />
        )
      case 4:
        return (
          <OrderReview
            checkoutData={checkoutData}
            orderData={orderData}
            onConfirm={handleStepComplete}
            onBack={handleStepBack}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">إتمام الطلب</h1>
          <p className="text-gray-600">أكمل بياناتك لإتمام عملية الشراء</p>
        </div>

        {/* Checkout Stepper */}
        <CheckoutStepper currentStep={currentStep} steps={checkoutSteps} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {renderStepContent()}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <OrderSummary
              subtotal={orderData.subtotal}
              shipping={orderData.shipping}
              tax={orderData.tax}
              discount={orderData.discount}
              total={orderData.total}
              onApplyCoupon={handleApplyCoupon}
              showCheckoutButton={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// مكون مراجعة الطلب
function OrderReview({ checkoutData, orderData, onConfirm, onBack }: any) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleConfirmOrder = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    onConfirm()
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-6">مراجعة الطلب</h2>
      
      <div className="space-y-6">
        {/* Shipping Address */}
        <div>
          <h3 className="font-medium mb-3">عنوان الشحن</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">{checkoutData.shippingAddress?.name}</p>
            <p className="text-sm text-gray-600">{checkoutData.shippingAddress?.phone}</p>
            <p className="text-sm text-gray-600">
              {checkoutData.shippingAddress?.street}, {checkoutData.shippingAddress?.city}
            </p>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="font-medium mb-3">طريقة الدفع</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">
              {checkoutData.paymentMethod === 'card' && 'بطاقة ائتمانية'}
              {checkoutData.paymentMethod === 'stc_pay' && 'STC Pay'}
              {checkoutData.paymentMethod === 'bank_transfer' && 'تحويل بنكي'}
            </p>
            {checkoutData.paymentData?.number && (
              <p className="text-sm text-gray-600">
                **** **** **** {checkoutData.paymentData.number.slice(-4)}
              </p>
            )}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="border-t pt-6">
          <label className="flex items-start space-x-3 space-x-reverse">
            <input
              type="checkbox"
              required
              className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">
              أوافق على <a href="#" className="text-primary hover:underline">الشروط والأحكام</a> و
              <a href="#" className="text-primary hover:underline">سياسة الخصوصية</a>
            </span>
          </label>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            العودة للدفع
          </button>
          
          <button
            onClick={handleConfirmOrder}
            disabled={isProcessing}
            className="px-8 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>جاري المعالجة...</span>
              </div>
            ) : (
              'تأكيد الطلب'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}