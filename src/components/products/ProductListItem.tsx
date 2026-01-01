'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/types/marketplace'

interface ProductListItemProps {
  product: Product
}

export default function ProductListItem({ product }: ProductListItemProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <Link href={`/products/${product.id}`}>
            <img
              src={product.images[0] || '/api/placeholder/300/300'}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>
          
          {discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discountPercentage}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>
            
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-2 rounded-full transition-colors ${
                isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className="h-5 w-5" fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-2 space-x-reverse mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviewCount})</span>
          </div>

          {/* Vendor */}
          <div className="text-sm text-gray-500 mb-3">
            بواسطة <span className="text-primary hover:underline cursor-pointer">{product.vendor.storeName}</span>
          </div>

          <div className="flex items-center justify-between">
            {/* Price */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-lg font-bold text-primary">{product.price} ريال</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {product.originalPrice} ريال
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <Link href={`/products/${product.id}`}>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 ml-2" />
                  عرض
                </Button>
              </Link>
              
              <Button size="sm" disabled={!product.inStock}>
                <ShoppingCart className="h-4 w-4 ml-2" />
                {product.inStock ? 'إضافة للسلة' : 'غير متوفر'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}