import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product, ProductVariant } from '@/types/marketplace'
import toast from 'react-hot-toast'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  total: number
  itemCount: number
}

interface CartActions {
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  calculateTotal: () => void
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      total: 0,
      itemCount: 0,

      addItem: (product, quantity = 1, variant) => {
        const { items } = get()
        const existingItem = items.find(
          (item) => item.product.id === product.id && 
          item.selectedVariant?.id === variant?.id
        )

        if (existingItem) {
          get().updateQuantity(product.id, existingItem.quantity + quantity)
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${variant?.id || 'default'}`,
            product,
            quantity,
            selectedVariant: variant,
          }
          set((state) => ({
            items: [...state.items, newItem],
          }))
          get().calculateTotal()
          toast.success('تم إضافة المنتج للسلة')
        }
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
        get().calculateTotal()
        toast.success('تم حذف المنتج من السلة')
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }))
        get().calculateTotal()
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          itemCount: 0,
        })
        toast.success('تم تفريغ السلة')
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },

      calculateTotal: () => {
        const { items } = get()
        const total = items.reduce((sum, item) => {
          const price = item.selectedVariant?.price || item.product.price
          return sum + (price * item.quantity)
        }, 0)
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
        
        set({ total, itemCount })
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
)