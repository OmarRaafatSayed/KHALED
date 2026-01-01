'use client'

import { Check } from 'lucide-react'

interface CheckoutStepperProps {
  currentStep: number
  steps: Array<{
    id: number
    title: string
    description: string
  }>
}

export default function CheckoutStepper({ currentStep, steps }: CheckoutStepperProps) {
  return (
    <div className="bg-white rounded-lg border p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  step.id < currentStep
                    ? 'bg-green-500 border-green-500 text-white'
                    : step.id === currentStep
                    ? 'bg-primary border-primary text-white'
                    : 'bg-gray-100 border-gray-300 text-gray-500'
                }`}
              >
                {step.id < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="font-medium">{step.id}</span>
                )}
              </div>
              
              {/* Step Info */}
              <div className="mr-3 text-right">
                <div
                  className={`font-medium ${
                    step.id <= currentStep ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-sm text-gray-500">{step.description}</div>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 ${
                  step.id < currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}