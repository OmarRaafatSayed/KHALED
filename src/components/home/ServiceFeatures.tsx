import { Truck, Shield, Headphones, RotateCcw } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'شحن مجاني',
    description: 'للطلبات أكثر من 200 ريال'
  },
  {
    icon: Shield,
    title: 'دفع آمن',
    description: 'حماية كاملة لبياناتك'
  },
  {
    icon: Headphones,
    title: 'دعم 24/7',
    description: 'خدمة عملاء متاحة دائماً'
  },
  {
    icon: RotateCcw,
    title: 'إرجاع مجاني',
    description: 'خلال 30 يوم من الشراء'
  }
]

export default function ServiceFeatures() {
  return (
    <section className="py-8 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-4 space-x-reverse">
            <div className="bg-primary text-white p-3 rounded-full flex-shrink-0">
              <feature.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}