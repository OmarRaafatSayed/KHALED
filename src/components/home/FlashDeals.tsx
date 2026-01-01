'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import ProductCard from './ProductCard'
import { Product } from '@/types/marketplace'

// Mock data for flash deals
const flashDealsProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    description: 'أحدث هاتف من آبل',
    price: 4999,
    originalPrice: 5999,
    images: ['/api/placeholder/300/300'],
    category: { id: '1', name: 'إلكترونيات', slug: 'electronics' },
    vendor: {
      id: '1',
      name: 'Tech Store',
      email: 'tech@store.com',
      storeName: 'متجر التقنية',
      rating: 4.8,
      reviewCount: 150,
      verified: true,
      createdAt: '2024-01-01'
    },
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    tags: ['جديد', 'مميز'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    description: 'هاتف سامسونج الجديد',
    price: 3499,
    originalPrice: 4299,
    images: ['/api/placeholder/300/300'],
    category: { id: '1', name: 'إلكترونيات', slug: 'electronics' },
    vendor: {
      id: '2',
      name: 'Mobile World',
      email: 'mobile@world.com',
      storeName: 'عالم الموبايل',
      rating: 4.6,
      reviewCount: 200,
      verified: true,
      createdAt: '2024-01-01'
    },
    rating: 4.3,
    reviewCount: 156,
    inStock: true,
    tags: ['عرض خاص'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
}

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 23, minutes: 59, seconds: 59 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          return { hours: 23, minutes: 59, seconds: 59 }
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4 space-x-reverse">
          <h2 className="text-2xl font-bold text-gray-900">عروض البرق ⚡</h2>
          <div className="flex items-center space-x-2 space-x-reverse bg-red-100 text-red-600 px-4 py-2 rounded-full">
            <Clock className="h-4 w-4" />
            <span className="font-mono text-sm">
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
        
        <button className="text-primary hover:text-primary-dark font-medium">
          عرض الكل ←
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {flashDealsProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}