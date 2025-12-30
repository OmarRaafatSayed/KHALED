import axios from 'axios'
import Cookies from 'js-cookie'
import { ApiResponse, PaginatedResponse } from '@/types/marketplace'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('auth-token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API methods
export const apiClient = {
  // Auth endpoints
  auth: {
    login: (credentials: { email: string; password: string }) =>
      api.post('/auth/login', credentials),
    register: (userData: { name: string; email: string; password: string }) =>
      api.post('/auth/register', userData),
    logout: () => api.post('/auth/logout'),
    me: () => api.get('/auth/me'),
  },

  // Products endpoints
  products: {
    getAll: (params?: any) => api.get('/products', { params }),
    getById: (id: string) => api.get(`/products/${id}`),
    create: (data: any) => api.post('/products', data),
    update: (id: string, data: any) => api.put(`/products/${id}`, data),
    delete: (id: string) => api.delete(`/products/${id}`),
  },

  // Categories endpoints
  categories: {
    getAll: () => api.get('/categories'),
    getById: (id: string) => api.get(`/categories/${id}`),
  },

  // Cart endpoints
  cart: {
    get: () => api.get('/cart'),
    add: (productId: string, quantity: number) =>
      api.post('/cart/add', { product_id: productId, quantity }),
    update: (itemId: string, quantity: number) =>
      api.put(`/cart/${itemId}`, { quantity }),
    remove: (itemId: string) => api.delete(`/cart/${itemId}`),
    clear: () => api.delete('/cart'),
  },

  // Orders endpoints
  orders: {
    getAll: () => api.get('/orders'),
    getById: (id: string) => api.get(`/orders/${id}`),
    create: (data: any) => api.post('/orders', data),
  },

  // Reviews endpoints
  reviews: {
    getByProduct: (productId: string) => api.get(`/products/${productId}/reviews`),
    create: (productId: string, data: any) =>
      api.post(`/products/${productId}/reviews`, data),
  },
}

export default api