import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'
import { authApi } from '@/lib/api'

interface User {
  id: number
  name: string
  email: string
  roles: Array<{ slug: string; name: string }>
  vendor?: any
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: {
    name: string
    email: string
    password: string
    password_confirmation: string
    role: 'customer' | 'vendor'
  }) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          const response = await authApi.login({ email, password })
          const { user, token } = response.data.data
          
          Cookies.set('auth_token', token, { expires: 7 })
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      register: async (data) => {
        set({ isLoading: true })
        try {
          const response = await authApi.register(data)
          const { user, token } = response.data.data
          
          Cookies.set('auth_token', token, { expires: 7 })
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: () => {
        Cookies.remove('auth_token')
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
        authApi.logout().catch(() => {})
      },

      checkAuth: async () => {
        const token = Cookies.get('auth_token')
        if (!token) {
          set({ isAuthenticated: false, user: null, token: null })
          return
        }

        try {
          const response = await authApi.me()
          set({
            user: response.data.data,
            token,
            isAuthenticated: true,
          })
        } catch (error) {
          Cookies.remove('auth_token')
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)