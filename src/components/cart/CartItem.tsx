'use client'

import { useState } from 'react'
import { Minus, Plus, Trash2, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CartItem } from '@/types/marketplace'

interface CartItemComponentProps {
  item: CartItem
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
  onMoveToWishlist: (id: string) => void
}

export default function CartItemComponent({ 
  item, 
  onUpdateQuantity, 
  onRemove, 
  onMoveToWishlist 
}: CartItemComponentProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 10) return
    
    setIsUpdating(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    onUpdateQuantity(item.id, newQuantity)
    setIsUpdating(false)
  }

  const totalPrice = item.product.price * item.quantity

  return (
    <div className="flex items-center space-x-4 space-x-reverse p-4 border-b border-gray-200 last:border-b-0">
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={item.product.images[0] || '/api/placeholder/100/100'}
          alt={item.product.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
          {item.product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          بواسطة {item.product.vendor.storeName}
        </p>
        
        {/* Variant Info */}
        {item.selectedVariant && (
          <p className="text-sm text-gray-500">
            {item.selectedVariant.name}: {item.selectedVariant.value}
          </p>
        )}

        {/* Stock Status */}
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className={`w-2 h-2 rounded-full ${item.product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className={`text-sm ${item.product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {item.product.inStock ? 'متوفر' : 'غير متوفر'}
          </span>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2 space-x-reverse">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1 || isUpdating}
          className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="h-4 w-4" />
        </button>
        
        <span className="w-8 text-center font-medium">
          {isUpdating ? '...' : item.quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={item.quantity >= 10 || isUpdating}
          className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Price */}
      <div className="text-right">
        <div className="font-bold text-primary">{totalPrice} ريال</div>
        {item.product.originalPrice && (
          <div className="text-sm text-gray-500 line-through">
            {item.product.originalPrice * item.quantity} ريال
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => onMoveToWishlist(item.id)}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="نقل للمفضلة"
        >
          <Heart className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => onRemove(item.id)}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="حذف"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}