'use client'

import { useState } from 'react'
import { CreditCard, Smartphone, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface PaymentFormProps {
  onNext: (data: any) => void
  onBack: () => void
}

export default function PaymentForm({ onNext, onBack }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })

  const paymentMethods = [
    {
      id: 'card',
      name: 'بطاقة ائتمانية',
      icon: CreditCard,
      description: 'Visa, MasterCard, Mada'
    },
    {
      id: 'stc_pay',
      name: 'STC Pay',
      icon: Smartphone,
      description: 'الدفع عبر STC Pay'
    },
    {
      id: 'bank_transfer',
      name: 'تحويل بنكي',
      icon: Building,
      description: 'تحويل مباشر من البنك'
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ 
      paymentMethod,
      paymentData: paymentMethod === 'card' ? cardData : null
    })
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-6">طريقة الدفع</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Methods */}
        <div>
          <h3 className="font-medium mb-4">اختر طريقة الدفع</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === method.id
                    ? 'border-primary bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="sr-only"
                />
                
                <div className="flex items-center space-x-3 space-x-reverse">
                  <method.icon className="h-6 w-6 text-gray-600" />
                  <div>
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-gray-500">{method.description}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Card Details Form */}
        {paymentMethod === 'card' && (
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-4">تفاصيل البطاقة</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم البطاقة *
                </label>
                <Input
                  type="text"
                  required
                  maxLength={19}
                  value={cardData.number}
                  onChange={(e) => setCardData(prev => ({ 
                    ...prev, 
                    number: formatCardNumber(e.target.value) 
                  }))}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    تاريخ الانتهاء *
                  </label>
                  <Input
                    type="text"
                    required
                    maxLength={5}
                    value={cardData.expiry}
                    onChange={(e) => setCardData(prev => ({ 
                      ...prev, 
                      expiry: formatExpiry(e.target.value) 
                    }))}
                    placeholder="MM/YY"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV *
                  </label>
                  <Input
                    type="text"
                    required
                    maxLength={4}
                    value={cardData.cvv}
                    onChange={(e) => setCardData(prev => ({ 
                      ...prev, 
                      cvv: e.target.value.replace(/[^0-9]/g, '') 
                    }))}
                    placeholder="123"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسم حامل البطاقة *
                </label>
                <Input
                  type="text"
                  required
                  value={cardData.name}
                  onChange={(e) => setCardData(prev => ({ 
                    ...prev, 
                    name: e.target.value 
                  }))}
                  placeholder="الاسم كما هو مكتوب على البطاقة"
                />
              </div>
            </div>
          </div>
        )}

        {/* STC Pay Instructions */}
        {paymentMethod === 'stc_pay' && (
          <div className="border rounded-lg p-4 bg-blue-50">
            <h4 className="font-medium mb-2">تعليمات الدفع عبر STC Pay</h4>
            <ol className="text-sm text-gray-700 space-y-1">
              <li>1. افتح تطبيق STC Pay على هاتفك</li>
              <li>2. اختر "دفع فاتورة" أو "QR Code"</li>
              <li>3. ستظهر لك تفاصيل الدفع بعد تأكيد الطلب</li>
            </ol>
          </div>
        )}

        {/* Bank Transfer Instructions */}
        {paymentMethod === 'bank_transfer' && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium mb-2">تعليمات التحويل البنكي</h4>
            <p className="text-sm text-gray-700 mb-2">
              ستحصل على تفاصيل التحويل البنكي بعد تأكيد الطلب
            </p>
            <div className="text-sm text-gray-600">
              <p>• البنك: البنك الأهلي السعودي</p>
              <p>• رقم الحساب: سيتم إرساله عبر البريد الإلكتروني</p>
              <p>• مدة المعالجة: 1-2 يوم عمل</p>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="text-green-600">🔒</div>
            <div className="text-sm text-green-700">
              <p className="font-medium">معاملاتك آمنة ومحمية</p>
              <p>نستخدم تشفير SSL 256-bit لحماية بياناتك المالية</p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button type="button" variant="outline" onClick={onBack}>
            العودة للشحن
          </Button>
          
          <Button type="submit">
            مراجعة الطلب
          </Button>
        </div>
      </form>
    </div>
  )
}