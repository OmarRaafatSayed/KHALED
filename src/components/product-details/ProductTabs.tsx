'use client'

import { useState } from 'react'
import { Star, User } from 'lucide-react'

interface ProductTabsProps {
  product: any
}

const mockReviews = [
  {
    id: '1',
    user: 'أحمد محمد',
    rating: 5,
    comment: 'منتج ممتاز وجودة عالية، أنصح بشرائه',
    date: '2024-01-15',
    verified: true
  },
  {
    id: '2',
    user: 'فاطمة علي',
    rating: 4,
    comment: 'جيد جداً ولكن التوصيل كان متأخر قليلاً',
    date: '2024-01-10',
    verified: true
  }
]

const mockSpecs = {
  'العلامة التجارية': 'Apple',
  'الموديل': 'iPhone 15 Pro Max',
  'اللون': 'تيتانيوم طبيعي',
  'السعة': '256 جيجابايت',
  'الشاشة': '6.7 بوصة Super Retina XDR',
  'المعالج': 'A17 Pro',
  'الكاميرا': '48 ميجابكسل',
  'البطارية': 'حتى 29 ساعة تشغيل فيديو'
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description')

  const tabs = [
    { id: 'description', label: 'الوصف' },
    { id: 'specifications', label: 'المواصفات' },
    { id: 'reviews', label: `التقييمات (${mockReviews.length})` }
  ]

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Tab Headers */}
      <div className="border-b">
        <div className="flex space-x-8 space-x-reverse">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-4">وصف المنتج</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {product.description}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              هذا المنتج يتميز بجودة عالية ومواصفات متطورة تلبي احتياجات العملاء المختلفة. 
              تم تصميمه بعناية فائقة لضمان الأداء الأمثل والمتانة طويلة المدى.
            </p>
            <h4 className="font-semibold mb-2">المميزات الرئيسية:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>جودة عالية ومواد متينة</li>
              <li>تصميم عصري وأنيق</li>
              <li>سهولة في الاستخدام</li>
              <li>ضمان شامل من الشركة المصنعة</li>
            </ul>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">المواصفات التقنية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(mockSpecs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-900">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">تقييمات العملاء</h3>
              <button className="text-primary hover:text-primary-dark font-medium">
                إضافة تقييم
              </button>
            </div>

            {/* Rating Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{product.rating}</div>
                  <div className="flex justify-center mb-1">
                    {renderStars(Math.floor(product.rating))}
                  </div>
                  <div className="text-sm text-gray-600">من 5 نجوم</div>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-2">
                    بناءً على {product.reviewCount} تقييم
                  </div>
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center space-x-2 space-x-reverse mb-1">
                      <span className="text-sm w-8">{stars}</span>
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${Math.random() * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="bg-gray-200 rounded-full p-2">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 space-x-reverse mb-2">
                        <span className="font-medium">{review.user}</span>
                        {review.verified && (
                          <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                            مشتري موثق
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse mb-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}