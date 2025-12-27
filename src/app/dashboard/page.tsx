'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'

export default function DashboardPage() {
  const { user, isAuthenticated, checkAuth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (user) {
      const userRole = user.roles[0]?.slug
      
      switch (userRole) {
        case 'super-admin':
          router.push('/admin/dashboard')
          break
        case 'admin':
          router.push('/admin/dashboard')
          break
        case 'vendor':
          router.push('/vendor/dashboard')
          break
        case 'customer':
          router.push('/customer/dashboard')
          break
        default:
          router.push('/customer/dashboard')
      }
    }
  }, [user, isAuthenticated, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}