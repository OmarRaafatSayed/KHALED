'use client'

import ProductCard from '@/components/home/ProductCard'
import { Product } from '@/types/marketplace'

interface RelatedProductsProps {
  currentProductId: string
  categoryId: string
}

// Mock data للمنتجات ذات الصلة
const mockRelatedProducts: Product[] = [
  {
    id: '10',
    name: 'iPhone 15 Pro',
    description: 'هاتف آيفون 15 برو',
    price: 4299,
    originalPrice: 4999,
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
    rating: 4.4,
    reviewCount: 67,
    inStock: true,
    tags: ['مميز'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '11',
    name: 'AirPods Pro',
    description: 'سماعات آبل اللاسلكية',
    price: 899,
    originalPrice: 1099,
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
    rating: 4.6,
    reviewCount: 123,
    inStock: true,
    tags: ['جديد'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '12',
    name: 'Apple Watch Series 9',
    description: 'ساعة آبل الذكية الجديدة',
    price: 1599,
    originalPrice: 1899,
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
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    tags: ['حصري'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '13',
    name: 'iPad Air',
    description: 'تابلت آيباد إير بشاشة كبيرة',
    price: 2299,
    originalPrice: 2599,
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
    reviewCount: 156,
    inStock: true,
    tags: ['مميز'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

export default function RelatedProducts({ currentProductId, categoryId }: RelatedProductsProps) {
  // فلترة المنتجات لاستبعاد المنتج الحالي
  const relatedProducts = mockRelatedProducts.filter(product => 
    product.id !== currentProductId && product.category.id === categoryId
  )

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">منتجات ذات صلة</h2>
        <p className="text-gray-600">منتجات قد تعجبك أيضاً</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}