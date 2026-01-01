'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import CartItem from '@/components/cart/CartItem'
import OrderSummary from '@/components/cart/OrderSummary'
import { CartItem as CartItemType } from '@/types/marketplace'

// Mock data للسلة
const mockCartItems: CartItemType[] = [
  {
    id: '1',
    product: {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB',
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
      tags: ['جديد'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    quantity: 1
  },
  {
    id: '2',
    product: {
      id: '2',
      name: 'AirPods Pro الجيل الثاني',
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
      tags: ['مميز'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    quantity: 2
  }
]

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItemType[]>(mockCartItems)
  const [discount, setDiscount] = useState(0)

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const shipping = subtotal >= 200 ? 0 : 25
  const tax = Math.round(subtotal * 0.15)
  const total = subtotal + shipping + tax - discount

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const handleMoveToWishlist = (id: string) => {
    // نقل للمفضلة وحذف من السلة
    handleRemoveItem(id)
  }

  const handleApplyCoupon = (code: string) => {
    // محاكاة تطبيق كود الخصم
    if (code.toLowerCase() === 'save10') {
      setDiscount(subtotal * 0.1)
    }
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  const handleProceedToCheckout = () => {
    router.push('/checkout')
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container py-12">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">سلة المشتريات فارغة</h2>
            <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات للسلة بعد</p>
            <Link href="/products">
              <Button size="lg">
                تصفح المنتجات
                <ArrowRight className="h-4 w-4 mr-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            سلة المشتريات ({cartItems.length} منتج)
          </h1>
          <Button
            variant="outline"
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-700"
          >
            إفراغ السلة
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border">
              <div className="p-4 border-b">
                <h3 className="font-semibold">المنتجات المختارة</h3>
              </div>
              
              <div className="divide-y">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                    onMoveToWishlist={handleMoveToWishlist}
                  />
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-4">
              <Link href="/products">
                <Button variant="outline">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  متابعة التسوق
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              discount={discount}
              total={total}
              onApplyCoupon={handleApplyCoupon}
              onProceedToCheckout={handleProceedToCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  )
}