import { useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface RegisterData {
  name: string
  email: string
  phone: string
  password: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    let role = 'customer'
    let name = 'مستخدم تجريبي'
    
    // تحديد نوع المستخدم حسب البريد
    if (email === 'admin@tailadmin.com') {
      role = 'admin'
      name = 'Admin User'
    } else if (email === 'vendor@tailadmin.com') {
      role = 'vendor'
      name = 'Vendor User'
    }
    
    const userData: User = {
      id: '1',
      name,
      email,
      role
    }
    
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const register = async (data: RegisterData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const userData: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      role: 'customer'
    }
    
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading
  }
}