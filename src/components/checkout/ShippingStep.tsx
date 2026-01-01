'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCartStore } from '@/hooks/useCart';

const shippingSchema = z.object({
  fullName: z.string().min(2, 'الاسم الكامل مطلوب'),
  phone: z.string().min(10, 'رقم الهاتف غير صحيح'),
  address: z.string().min(10, 'العنوان مطلوب'),
  city: z.string().min(2, 'المدينة مطلوبة'),
  postalCode: z.string().min(5, 'الرمز البريدي مطلوب')
});

type ShippingFormData = z.infer<typeof shippingSchema>;

interface ShippingStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ShippingStep({ onNext, onBack }: ShippingStepProps) {
  const { shippingAddress, setShippingAddress } = useCartStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: shippingAddress || {}
  });

  const onSubmit = (data: ShippingFormData) => {
    setShippingAddress(data);
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">معلومات الشحن</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الاسم الكامل *
          </label>
          <input
            {...register('fullName')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="أدخل اسمك الكامل"
          />
          {errors.fullName && (
            <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            رقم الهاتف *
          </label>
          <input
            {...register('phone')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="05xxxxxxxx"
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            العنوان *
          </label>
          <textarea
            {...register('address')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="أدخل عنوانك بالتفصيل"
          />
          {errors.address && (
            <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              المدينة *
            </label>
            <select
              {...register('city')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">اختر المدينة</option>
              <option value="الرياض">الرياض</option>
              <option value="جدة">جدة</option>
              <option value="الدمام">الدمام</option>
              <option value="مكة">مكة</option>
              <option value="المدينة">المدينة</option>
            </select>
            {errors.city && (
              <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الرمز البريدي *
            </label>
            <input
              {...register('postalCode')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="12345"
            />
            {errors.postalCode && (
              <p className="text-red-600 text-sm mt-1">{errors.postalCode.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            العودة للسلة
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            متابعة للدفع
          </button>
        </div>
      </form>
    </div>
  );
}