'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import ImageGallery from '@/components/product-details/ImageGallery'
import ProductInfo from '@/components/product-details/ProductInfo'
import ProductTabs from '@/components/product-details/ProductTabs'
import RelatedProducts from '@/components/product-details/RelatedProducts'
import FrequentlyBoughtTogether from '@/components/product-details/FrequentlyBoughtTogether'
import { Product } from '@/types/marketplace'

const mockProduct: Product = {
  id: '1',
  name: 'iPhone 15 Pro Max 256GB',
  description: 'أحدث هاتف من آبل بتقنيات متطورة وكاميرا احترافية تدعم التصوير بدقة 4K وشاشة Super Retina XDR مقاس 6.7 بوصة',
  price: 4999,
  originalPrice: 5999,
  images: [
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600'
  ],
  category: { id: '1', name: 'إلكترونيات', slug: 'electronics' },
  vendor: {
    id: '1',
    name: 'Tech Store',
    email: 'tech@store.com',
    storeName: 'متجر التقنية الرسمي',
    rating: 4.8,
    reviewCount: 1250,
    verified: true,
    createdAt: '2024-01-01'
  },
  rating: 4.5,
  reviewCount: 189,
  inStock: true,
  tags: ['جديد', 'مميز', 'الأكثر مبيعاً'],
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01'
}

export default function ProductDetailsPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProduct(mockProduct)
      setLoading(false)
    }

    loadProduct()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container py-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">المنتج غير موجود</h2>
          <p className="text-gray-600 mb-4">عذراً، لم نتمكن من العثور على هذا المنتج</p>
          <Link href="/products" className="text-primary hover:text-primary-dark font-medium">
            العودة للمنتجات ←
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-6">
        <nav className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-primary">الرئيسية</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/products" className="hover:text-primary">المنتجات</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/products?category=${product.category.id}`} className="hover:text-primary">
            {product.category.name}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ImageGallery images={product.images} productName={product.name} />
            </div>
            <div>
              <ProductInfo product={product} />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <FrequentlyBoughtTogether mainProduct={product} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <ProductTabs product={product} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <RelatedProducts 
            currentProductId={product.id} 
            categoryId={product.category.id} 
          />
        </div>
      </div>
    </div>
  )
}