export interface User {
  id: number
  name: string
  email: string
  is_active: boolean
  created_at: string
  updated_at: string
  roles: Role[]
  vendor?: Vendor
}

export interface Role {
  id: number
  name: string
  slug: string
}

export interface Vendor {
  id: number
  user_id: number
  subscription_id: number
  store_name: string
  store_slug: string
  store_description?: string
  store_logo?: string
  store_banner?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  is_approved: boolean
  is_active: boolean
  subscription_expires_at: string
  subscription: Subscription
}

export interface Subscription {
  id: number
  name: string
  slug: string
  price: number
  duration_days: number
  product_limit: number
  features: string[]
  is_active: boolean
}

export interface Product {
  id: number
  vendor_id: number
  category_id: number
  template_id?: number
  name: string
  slug: string
  description: string
  short_description?: string
  sku: string
  price: number
  compare_price?: number
  quantity: number
  images: any[]
  attributes: any
  template_data: any
  status: 'draft' | 'pending' | 'active' | 'inactive'
  is_featured: boolean
  created_at: string
  updated_at: string
  category: Category
  vendor: Vendor
  variants?: ProductVariant[]
  reviews?: ProductReview[]
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  image?: string
  parent_id?: number
  sort_order: number
  is_active: boolean
  products_count?: number
}

export interface ProductVariant {
  id: number
  product_id: number
  name: string
  sku: string
  price: number
  quantity: number
  attributes: any
}

export interface Order {
  id: number
  user_id: number
  vendor_id: number
  order_number: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method: string
  subtotal: number
  tax_amount: number
  shipping_cost: number
  total_amount: number
  shipping_address: any
  billing_address: any
  notes?: string
  shipped_at?: string
  delivered_at?: string
  created_at: string
  updated_at: string
  user: User
  vendor: Vendor
  items: OrderItem[]
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  variant_id?: number
  quantity: number
  price: number
  product: Product
  variant?: ProductVariant
}

export interface ProductReview {
  id: number
  product_id: number
  user_id: number
  order_id?: number
  rating: number
  title?: string
  comment?: string
  images?: string[]
  is_approved: boolean
  is_verified_purchase: boolean
  created_at: string
  updated_at: string
  user: User
  product: Product
  replies?: ReviewReply[]
}

export interface ReviewReply {
  id: number
  review_id: number
  user_id: number
  reply: string
  created_at: string
  updated_at: string
  user: User
}

export interface CartItem {
  product: Product
  quantity: number
  variant?: ProductVariant
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}