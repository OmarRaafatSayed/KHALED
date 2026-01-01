import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// إنشاء axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// إضافة token للطلبات تلقائياً
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// معالجة الأخطاء
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // إزالة token منتهي الصلاحية
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post('/auth/login', credentials)
    return response.data
  },

  register: async (userData: { name: string; email: string; password: string; phone?: string }) => {
    const response = await apiClient.post('/auth/register', userData)
    return response.data
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout')
    return response.data
  },

  me: async () => {
    const response = await apiClient.get('/auth/me')
    return response.data
  },

  forgotPassword: async (email: string) => {
    const response = await apiClient.post('/auth/forgot-password', { email })
    return response.data
  },

  resetPassword: async (data: { token: string; password: string; password_confirmation: string }) => {
    const response = await apiClient.post('/auth/reset-password', data)
    return response.data
  }
}

// Products API
export const productsAPI = {
  getAll: async (params?: any) => {
    const response = await apiClient.get('/products', { params })
    return response.data
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/products/${id}`)
    return response.data
  },

  search: async (query: string, filters?: any) => {
    const response = await apiClient.get('/products/search', { 
      params: { q: query, ...filters } 
    })
    return response.data
  },

  getByCategory: async (categoryId: string, params?: any) => {
    const response = await apiClient.get(`/categories/${categoryId}/products`, { params })
    return response.data
  }
}

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await apiClient.get('/categories')
    return response.data
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/categories/${id}`)
    return response.data
  }
}

// Cart API
export const cartAPI = {
  get: async () => {
    const response = await apiClient.get('/cart')
    return response.data
  },

  add: async (productId: string, quantity: number) => {
    const response = await apiClient.post('/cart/add', { product_id: productId, quantity })
    return response.data
  },

  update: async (itemId: string, quantity: number) => {
    const response = await apiClient.put(`/cart/items/${itemId}`, { quantity })
    return response.data
  },

  remove: async (itemId: string) => {
    const response = await apiClient.delete(`/cart/items/${itemId}`)
    return response.data
  },

  clear: async () => {
    const response = await apiClient.delete('/cart')
    return response.data
  }
}

// Orders API
export const ordersAPI = {
  create: async (orderData: any) => {
    const response = await apiClient.post('/orders', orderData)
    return response.data
  },

  getAll: async () => {
    const response = await apiClient.get('/orders')
    return response.data
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/orders/${id}`)
    return response.data
  },

  cancel: async (id: string) => {
    const response = await apiClient.post(`/orders/${id}/cancel`)
    return response.data
  }
}

// User API
export const userAPI = {
  getProfile: async () => {
    const response = await apiClient.get('/user/profile')
    return response.data
  },

  updateProfile: async (userData: any) => {
    const response = await apiClient.put('/user/profile', userData)
    return response.data
  },

  getAddresses: async () => {
    const response = await apiClient.get('/user/addresses')
    return response.data
  },

  addAddress: async (addressData: any) => {
    const response = await apiClient.post('/user/addresses', addressData)
    return response.data
  },

  updateAddress: async (id: string, addressData: any) => {
    const response = await apiClient.put(`/user/addresses/${id}`, addressData)
    return response.data
  },

  deleteAddress: async (id: string) => {
    const response = await apiClient.delete(`/user/addresses/${id}`)
    return response.data
  }
}

export default apiClient