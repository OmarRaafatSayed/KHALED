'use client'

import { useState } from 'react'
import { Plus, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/types/marketplace'

interface FrequentlyBoughtTogetherProps {
  mainProduct: Product
}

// Mock data للمنتجات المشتراة معاً
const mockBundleProducts = [
  {
    id: '20',
    name: 'حافظة آيفون شفافة',
    price: 89,
    originalPrice: 129,
    image: '/api/placeholder/150/150'
  },
  {
    id: '21',
    name: 'شاحن سريع 20W',
    price: 149,
    originalPrice: 199,
    image: '/api/placeholder/150/150'
  }
]

export default function FrequentlyBoughtTogether({ mainProduct }: FrequentlyBoughtTogetherProps) {
  const [selectedItems, setSelectedItems] = useState([mainProduct.id])

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const totalPrice = [
    { id: mainProduct.id, price: mainProduct.price },
    ...mockBundleProducts
  ]
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0)

  const totalOriginalPrice = [
    { id: mainProduct.id, price: mainProduct.originalPrice || mainProduct.price },
    ...mockBundleProducts.map(p => ({ id: p.id, price: p.originalPrice }))
  ]
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0)

  const savings = totalOriginalPrice - totalPrice

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">يشترى معاً بكثرة</h3>
      
      <div className="space-y-4">
        {/* Main Product */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <input
            type="checkbox"
            checked={selectedItems.includes(mainProduct.id)}
            onChange={() => toggleItem(mainProduct.id)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <img
            src={mainProduct.images[0] || '/api/placeholder/80/80'}
            alt={mainProduct.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h4 className="font-medium text-sm">{mainProduct.name}</h4>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="font-bold text-primary">{mainProduct.price} ريال</span>
              {mainProduct.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {mainProduct.originalPrice} ريال
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bundle Products */}
        {mockBundleProducts.map((product, index) => (
          <div key={product.id}>
            <div className="flex items-center justify-center py-2">
              <Plus className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <input
                type="checkbox"
                checked={selectedItems.includes(product.id)}
                onChange={() => toggleItem(product.id)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{product.name}</h4>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="font-bold text-primary">{product.price} ريال</span>
                  <span className="text-sm text-gray-500 line-through">
                    {product.originalPrice} ريال
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total & Add to Cart */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-gray-600">
              المجموع للعناصر المحددة ({selectedItems.length})
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-xl font-bold text-primary">{totalPrice} ريال</span>
              {savings > 0 && (
                <span className="text-sm text-green-600">
                  (توفير {savings} ريال)
                </span>
              )}
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full"
          disabled={selectedItems.length === 0}
        >
          <ShoppingCart className="h-4 w-4 ml-2" />
          إضافة العناصر المحددة للسلة
        </Button>
      </div>
    </div>
  )
}