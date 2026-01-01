'use client'

import ProductCard from './ProductCard'
import { Product } from '@/types/marketplace'

const newArrivals: Product[] = [
  {
    id: '3',
    name: 'MacBook Pro M3',
    description: 'أحدث لابتوب من آبل',
    price: 8999,
    originalPrice: 9999,
    images: ['/api/placeholder/300/300'],
    category: { id: '1', name: 'إلكترونيات', slug: 'electronics' },
    vendor: {
      id: '3',
      name: 'Apple Store',
      email: 'apple@store.com',
      storeName: 'متجر آبل الرسمي',
      rating: 4.9,
      reviewCount: 500,
      verified: true,
      createdAt: '2024-01-01'
    },
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    tags: ['جديد', 'حصري'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '4',
    name: 'فستان صيفي أنيق',
    description: 'فستان صيفي بتصميم عصري',
    price: 299,
    originalPrice: 399,
    images: ['/api/placeholder/300/300'],
    category: { id: '2', name: 'أزياء', slug: 'fashion' },
    vendor: {
      id: '4',
      name: 'Fashion Hub',
      email: 'fashion@hub.com',
      storeName: 'مركز الأزياء',
      rating: 4.5,
      reviewCount: 120,
      verified: true,
      createdAt: '2024-01-01'
    },
    rating: 4.2,
    reviewCount: 67,
    inStock: true,
    tags: ['جديد', 'صيفي'],
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14'
  }
]

export default function NewArrivals() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">وصل حديثاً 🆕</h2>
        <button className="text-primary hover:text-primary-dark font-medium">
          عرض الكل ←
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}