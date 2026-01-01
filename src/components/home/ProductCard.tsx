'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/types/marketplace'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <Link href={`/products/${product.id}`}>
          <img
            src={product.images[0] || '/api/placeholder/300/300'}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discountPercentage}%
          </div>
        )}

        {/* Quick Actions */}
        <div className={`absolute top-2 left-2 flex flex-col space-y-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-2 rounded-full shadow-lg transition-colors ${
              isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart className="h-4 w-4" fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          
          <Link
            href={`/products/${product.id}`}
            className="p-2 bg-white text-gray-600 hover:text-primary rounded-full shadow-lg transition-colors"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>

        {/* Add to Cart Button */}
        <div className={`absolute bottom-2 left-2 right-2 transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <Button className="w-full" size="sm">
            <ShoppingCart className="h-4 w-4 ml-2" />
            إضافة للسلة
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-1 space-x-reverse mb-2">
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

        {/* Price */}
        <div className="flex items-center space-x-2 space-x-reverse mb-2">
          <span className="text-lg font-bold text-primary">{product.price} ريال</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {product.originalPrice} ريال
            </span>
          )}
        </div>

        {/* Vendor */}
        <div className="text-sm text-gray-500">
          بواسطة <span className="text-primary hover:underline cursor-pointer">{product.vendor.storeName}</span>
        </div>

        {/* Stock Status */}
        <div className="mt-2">
          {product.inStock ? (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              متوفر
            </span>
          ) : (
            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
              غير متوفر
            </span>
          )}
        </div>
      </div>
    </div>
  )
}