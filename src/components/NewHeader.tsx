'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/store/cart'
import { useAuth } from '@/hooks/useAuth'
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  Heart,
  Bell
} from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { itemCount } = useCartStore()
  const { isAuthenticated, user } = useAuth()

  const navigation = [
    { name: 'الرئيسية', href: '/' },
    { name: 'المنتجات', href: '/products' },
    { name: 'الفئات', href: '/categories' },
    { name: 'العروض', href: '/deals' },
    { name: 'اتصل بنا', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4 space-x-reverse">
              <span>📞 +966 50 123 4567</span>
              <span>✉️ info@tailadmin.com</span>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <span>شحن مجاني للطلبات أكثر من 200 ريال</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="bg-primary text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl">
              T
            </div>
            <span className="text-2xl font-bold text-gray-900">TailAdmin</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="ابحث عن المنتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-right"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 space-x-reverse">
                <Link href="/dashboard">
                  <Button variant="ghost" size="icon">
                    <User className="h-6 w-6" />
                  </Button>
                </Link>
                <span className="hidden md:block text-sm font-medium">
                  مرحباً، {user?.name}
                </span>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2 space-x-reverse">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">
                    إنشاء حساب
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center justify-center mt-4 space-x-8 space-x-reverse">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container py-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="ابحث عن المنتجات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 text-right"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth Buttons */}
            {!isAuthenticated && (
              <div className="mt-4 space-y-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full">
                    إنشاء حساب
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}