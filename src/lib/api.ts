import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API Types
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T
  errors?: any
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
  }
}

// Auth API
export const authApi = {
  register: (data: {
    name: string
    email: string
    password: string
    password_confirmation: string
    role: 'customer' | 'vendor'
  }) => api.post<ApiResponse>('/register', data),

  login: (data: { email: string; password: string }) =>
    api.post<ApiResponse>('/login', data),

  logout: () => api.post<ApiResponse>('/logout'),

  me: () => api.get<ApiResponse>('/me'),
}

// Products API
export const productsApi = {
  getProducts: (params?: {
    category_id?: number
    vendor_id?: number
    search?: string
    min_price?: number
    max_price?: number
    sort_by?: string
    sort_order?: 'asc' | 'desc'
    per_page?: number
    page?: number
  }) => api.get<PaginatedResponse>('/v1/products', { params }),

  getProduct: (id: number) => api.get<ApiResponse>(`/v1/products/${id}`),

  getFeatured: () => api.get<ApiResponse>('/v1/products/featured'),

  search: (q: string) => api.get<PaginatedResponse>('/v1/products/search', { params: { q } }),

  getCategories: () => api.get<ApiResponse>('/v1/categories'),
}

// Orders API
export const ordersApi = {
  getOrders: () => api.get<PaginatedResponse>('/v1/orders'),

  getOrder: (id: number) => api.get<ApiResponse>(`/v1/orders/${id}`),

  createOrder: (data: {
    items: Array<{
      product_id: number
      quantity: number
      variant_id?: number
    }>
    shipping_address: any
    payment_method: string
  }) => api.post<ApiResponse>('/v1/orders', data),

  cancelOrder: (id: number) => api.patch<ApiResponse>(`/v1/orders/${id}/cancel`),
}

// Reviews API
export const reviewsApi = {
  getProductReviews: (productId: number) =>
    api.get<PaginatedResponse>(`/v1/products/${productId}/reviews`),

  createReview: (data: {
    product_id: number
    rating: number
    title?: string
    comment?: string
  }) => api.post<ApiResponse>('/v1/reviews', data),

  updateReview: (id: number, data: any) =>
    api.patch<ApiResponse>(`/v1/reviews/${id}`, data),

  deleteReview: (id: number) => api.delete<ApiResponse>(`/v1/reviews/${id}`),

  getMyReviews: () => api.get<PaginatedResponse>('/v1/my-reviews'),
}

// Vendor API
export const vendorApi = {
  getDashboard: () => api.get<ApiResponse>('/v1/vendor/dashboard'),

  getProfile: () => api.get<ApiResponse>('/v1/vendor/profile'),

  updateProfile: (data: any) => api.patch<ApiResponse>('/v1/vendor/profile', data),

  getProducts: (params?: { status?: string }) =>
    api.get<PaginatedResponse>('/v1/vendor/products', { params }),

  createProduct: (data: FormData) =>
    api.post<ApiResponse>('/v1/vendor/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  updateProduct: (id: number, data: any) =>
    api.patch<ApiResponse>(`/v1/vendor/products/${id}`, data),

  getOrders: (params?: { status?: string }) =>
    api.get<PaginatedResponse>('/v1/vendor/orders', { params }),

  updateOrderStatus: (id: number, status: string) =>
    api.patch<ApiResponse>(`/v1/vendor/orders/${id}/status`, { status }),
}