import { create } from 'zustand';
import { CartItem, ShippingAddress, PaymentMethod } from '@/types/cart';

interface CartStore {
  items: CartItem[];
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod | null;
  discountCode: string;
  discountAmount: number;
  
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setShippingAddress: (address: ShippingAddress) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  applyDiscount: (code: string) => void;
  getSubtotal: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  shippingAddress: null,
  paymentMethod: null,
  discountCode: '',
  discountAmount: 0,

  addItem: (item) => set((state) => {
    const existingItem = state.items.find(i => i.id === item.id);
    if (existingItem) {
      return {
        items: state.items.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      };
    }
    return { items: [...state.items, item] };
  }),

  updateQuantity: (id, quantity) => set((state) => ({
    items: quantity <= 0 
      ? state.items.filter(item => item.id !== id)
      : state.items.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
  })),

  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),

  clearCart: () => set({ items: [], discountCode: '', discountAmount: 0 }),

  setShippingAddress: (address) => set({ shippingAddress: address }),

  setPaymentMethod: (method) => set({ paymentMethod: method }),

  applyDiscount: (code) => set((state) => {
    const discountAmount = code === 'SAVE10' ? state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.1 : 0;
    return { discountCode: code, discountAmount };
  }),

  getSubtotal: () => {
    const state = get();
    return state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getTotal: () => {
    const state = get();
    const subtotal = state.getSubtotal();
    const shipping = 50;
    const tax = subtotal * 0.15;
    return subtotal + shipping + tax - state.discountAmount;
  }
}));