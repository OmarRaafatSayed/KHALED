import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types/marketplace'

interface CartStore {
  items: CartItem[]
  itemCount: number
  total: number
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getItemById: (id: string) => CartItem | undefined
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      total: 0,

      addItem: (newItem) => {
        const items = get().items
        const existingItem = items.find(item => item.product.id === newItem.product.id)
        
        if (existingItem) {
          // إذا كان المنتج موجود، زيادة الكمية
          set(state => ({
            items: state.items.map(item =>
              item.product.id === newItem.product.id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            )
          }))
        } else {
          // إضافة منتج جديد
          const cartItem: CartItem = {
            id: `${newItem.product.id}-${Date.now()}`,
            ...newItem
          }
          set(state => ({
            items: [...state.items, cartItem]
          }))
        }
        
        // تحديث العدد والمجموع
        const updatedItems = get().items
        set({
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          total: updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
        })
      },

      removeItem: (id) => {
        set(state => {
          const newItems = state.items.filter(item => item.id !== id)
          return {
            items: newItems,
            itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
            total: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
          }
        })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set(state => {
          const newItems = state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
          return {
            items: newItems,
            itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
            total: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
          }
        })
      },

      clearCart: () => {
        set({
          items: [],
          itemCount: 0,
          total: 0
        })
      },

      getItemById: (id) => {
        return get().items.find(item => item.id === id)
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ 
        items: state.items,
        itemCount: state.itemCount,
        total: state.total
      })
    }
  )
)