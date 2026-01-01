'use client';

import { useState } from 'react';
import CheckoutStepper from '@/components/checkout/CheckoutStepper';
import OrderSummary from '@/components/checkout/OrderSummary';
import CartStep from '@/components/checkout/CartStep';
import ShippingStep from '@/components/checkout/ShippingStep';
import PaymentStep from '@/components/checkout/PaymentStep';
import ReviewStep from '@/components/checkout/ReviewStep';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CartStep onNext={nextStep} />;
      case 2:
        return <ShippingStep onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <PaymentStep onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <ReviewStep onBack={prevStep} />;
      default:
        return <CartStep onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <CheckoutStepper currentStep={currentStep} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {renderStep()}
            </div>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}