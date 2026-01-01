'use client';

interface CheckoutStepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: 'السلة', description: 'مراجعة المنتجات' },
  { id: 2, name: 'الشحن', description: 'عنوان التوصيل' },
  { id: 3, name: 'الدفع', description: 'طريقة الدفع' },
  { id: 4, name: 'المراجعة', description: 'تأكيد الطلب' }
];

export default function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                step.id <= currentStep 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step.id}
              </div>
              <div className="mt-2 text-center">
                <p className={`text-sm font-medium ${
                  step.id <= currentStep ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.name}
                </p>
                <p className="text-xs text-gray-400">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                step.id < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}