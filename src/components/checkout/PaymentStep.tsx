'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCartStore } from '@/hooks/useCart';
import { CreditCard, Smartphone, Truck } from 'lucide-react';

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'رقم البطاقة غير صحيح'),
  expiryDate: z.string().min(5, 'تاريخ الانتهاء مطلوب'),
  cvv: z.string().min(3, 'رمز الأمان مطلوب'),
  cardholderName: z.string().min(2, 'اسم حامل البطاقة مطلوب')
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PaymentStep({ onNext, onBack }: PaymentStepProps) {
  const [paymentType, setPaymentType] = useState<'card' | 'paypal' | 'cod'>('card');
  const { setPaymentMethod } = useCartStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema)
  });

  const onSubmit = (data: PaymentFormData) => {
    setPaymentMethod({ type: paymentType, ...data });
    onNext();
  };

  const handlePayPalPayment = () => {
    setPaymentMethod({ type: 'paypal' });
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">طريقة الدفع</h2>

      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => setPaymentType('card')}
          className={`p-4 border-2 rounded-lg flex items-center gap-3 ${
            paymentType === 'card' 
              ? 'border-blue-600 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <CreditCard size={24} />
          <div className="text-right">
            <p className="font-medium">بطاقة ائتمان</p>
            <p className="text-sm text-gray-500">Visa, MasterCard</p>
          </div>
        </button>

        <button
          onClick={() => setPaymentType('paypal')}
          className={`p-4 border-2 rounded-lg flex items-center gap-3 ${
            paymentType === 'paypal' 
              ? 'border-blue-600 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Smartphone size={24} />
          <div className="text-right">
            <p className="font-medium">PayPal</p>
            <p className="text-sm text-gray-500">دفع آمن</p>
          </div>
        </button>

        <button
          onClick={() => setPaymentType('cod')}
          className={`p-4 border-2 rounded-lg flex items-center gap-3 ${
            paymentType === 'cod' 
              ? 'border-blue-600 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Truck size={24} />
          <div className="text-right">
            <p className="font-medium">الدفع عند الاستلام</p>
            <p className="text-sm text-gray-500">نقداً للمندوب</p>
          </div>
        </button>
      </div>

      {paymentType === 'card' ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رقم البطاقة *
            </label>
            <input
              {...register('cardNumber')}
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.cardNumber && (
              <p className="text-red-600 text-sm mt-1">{errors.cardNumber.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تاريخ الانتهاء *
              </label>
              <input
                {...register('expiryDate')}
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.expiryDate && (
                <p className="text-red-600 text-sm mt-1">{errors.expiryDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رمز الأمان *
              </label>
              <input
                {...register('cvv')}
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.cvv && (
                <p className="text-red-600 text-sm mt-1">{errors.cvv.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              اسم حامل البطاقة *
            </label>
            <input
              {...register('cardholderName')}
              placeholder="الاسم كما هو مكتوب على البطاقة"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.cardholderName && (
              <p className="text-red-600 text-sm mt-1">{errors.cardholderName.message}</p>
            )}
          </div>

          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              العودة للشحن
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              مراجعة الطلب
            </button>
          </div>
        </form>
      ) : paymentType === 'paypal' ? (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800">سيتم توجيهك إلى PayPal لإتمام عملية الدفع بشكل آمن</p>
          </div>
          
          <div className="flex justify-between pt-6">
            <button
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              العودة للشحن
            </button>
            <button
              onClick={handlePayPalPayment}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              متابعة مع PayPal
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-800">ستدفع نقداً عند استلام الطلب من المندوب</p>
            <p className="text-sm text-green-600 mt-1">تأكد من توفر المبلغ المطلوب عند التسليم</p>
          </div>
          
          <div className="flex justify-between pt-6">
            <button
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              العودة للشحن
            </button>
            <button
              onClick={() => {
                setPaymentMethod({ type: 'cod' });
                onNext();
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              مراجعة الطلب
            </button>
          </div>
        </div>
      )}
    </div>
  );
}