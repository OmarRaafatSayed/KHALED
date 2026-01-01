'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Star, Heart, Share2, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'
import { Product } from '@/types/marketplace'

interface ProductInfoProps {
  product: Product
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter()
  const { addItem } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    
    // إضافة المنتج للسلة
    addItem({
      product,
      quantity
    })
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsAddingToCart(false)
    
    // إظهار رسالة نجاح أو توجيه للسلة
    const goToCart = confirm('تم إضافة المنتج للسلة! هل تريد الذهاب للسلة؟')
    if (goToCart) {
      router.push('/cart')
    }
  }

  const handleBuyNow = async () => {
    // إضافة للسلة والذهاب مباشرة للدفع
    addItem({
      product,
      quantity
    })
    router.push('/checkout')
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          {product.name}
        </h1>
        <p className="text-gray-600">
          {product.description}
        </p>
      </div>

      {/* Rating & Reviews */}
      <div className="flex items-center space-x-4 space-x-reverse">
        <div className="flex items-center space-x-1 space-x-reverse">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium">{product.rating}</span>
        </div>
        <span className="text-sm text-gray-500">
          ({product.reviewCount} تقييم)
        </span>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3 space-x-reverse">
          <span className="text-3xl font-bold text-primary">
            {product.price} ريال
          </span>
          {product.originalPrice && (
            <>
              <span className="text-xl text-gray-500 line-through">
                {product.originalPrice} ريال
              </span>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
                خصم {discountPercentage}%
              </span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-600">
          شامل ضريبة القيمة المضافة
        </p>
      </div>

      {/* Stock Status */}
      <div className="flex items-center space-x-2 space-x-reverse">
        <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
          {product.inStock ? 'متوفر في المخزن' : 'غير متوفر'}
        </span>
      </div>

      {/* Vendor Info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">بواسطة</p>
            <p className="font-semibold text-primary hover:underline cursor-pointer">
              {product.vendor.storeName}
            </p>
            <div className="flex items-center space-x-1 space-x-reverse mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.vendor.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                ({product.vendor.reviewCount})
              </span>
            </div>
          </div>
          {product.vendor.verified && (
            <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
              ✓ موثق
            </div>
          )}
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="space-y-4">
        {/* Quantity Selector */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <span className="font-medium">الكمية:</span>
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
              className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Buy Now Button */}
          <Button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            className="w-full py-3 text-lg bg-orange-500 hover:bg-orange-600"
            size="lg"
          >
            اشتري الآن
          </Button>
          
          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAddingToCart}
            variant="outline"
            className="w-full py-3 text-lg"
            size="lg"
          >
            {isAddingToCart ? (
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span>جاري الإضافة...</span>
              </div>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5 ml-2" />
                إضافة إلى السلة
              </>
            )}
          </Button>

          <div className="flex space-x-2 space-x-reverse">
            <Button
              variant="outline"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="flex-1"
            >
              <Heart 
                className={`h-4 w-4 ml-2 ${isWishlisted ? 'fill-current text-red-500' : ''}`} 
              />
              {isWishlisted ? 'في المفضلة' : 'إضافة للمفضلة'}
            </Button>
            
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-3 pt-4 border-t">
        <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-600">
          <Truck className="h-4 w-4 text-primary" />
          <span>شحن مجاني للطلبات أكثر من 200 ريال</span>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-600">
          <Shield className="h-4 w-4 text-primary" />
          <span>ضمان الجودة والأصالة</span>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-600">
          <RotateCcw className="h-4 w-4 text-primary" />
          <span>إمكانية الإرجاع خلال 30 يوم</span>
        </div>
      </div>
    </div>
  )
}