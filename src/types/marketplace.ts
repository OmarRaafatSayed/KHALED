// User Types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'customer' | 'vendor' | 'admin'
  createdAt: string
  updatedAt: string
}

// Product Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: Category
  vendor: Vendor
  rating: number
  reviewCount: number
  inStock: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  image?: string
  parentId?: string
}

export interface Vendor {
  id: string
  name: string
  email: string
  avatar?: string
  storeName: string
  description?: string
  rating: number
  reviewCount: number
  verified: boolean
  createdAt: string
}

// Cart Types
export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedVariant?: ProductVariant
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  price?: number
}

// Order Types
export interface Order {
  id: string
  user: User
  items: OrderItem[]
  total: number
  status: OrderStatus
  shippingAddress: Address
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  product: Product
  quantity: number
  price: number
  variant?: ProductVariant
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'

// Address Types
export interface Address {
  id: string
  name: string
  phone: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

// Review Types
export interface Review {
  id: string
  user: User
  product: Product
  rating: number
  comment: string
  createdAt: string
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

// Filter Types
export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  inStock?: boolean
  sortBy?: 'price' | 'rating' | 'newest' | 'popular'
  sortOrder?: 'asc' | 'desc'
}