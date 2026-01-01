'use client'

import { useState } from 'react'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  icon: string
  subcategories?: Category[]
}

const categories: Category[] = [
  {
    id: '1',
    name: 'إلكترونيات',
    icon: '📱',
    subcategories: [
      { id: '1-1', name: 'هواتف ذكية', icon: '📱' },
      { id: '1-2', name: 'أجهزة كمبيوتر', icon: '💻' },
      { id: '1-3', name: 'سماعات', icon: '🎧' }
    ]
  },
  {
    id: '2',
    name: 'أزياء',
    icon: '👕',
    subcategories: [
      { id: '2-1', name: 'ملابس رجالية', icon: '👔' },
      { id: '2-2', name: 'ملابس نسائية', icon: '👗' },
      { id: '2-3', name: 'أحذية', icon: '👟' }
    ]
  },
  {
    id: '3',
    name: 'منزل وحديقة',
    icon: '🏠'
  },
  {
    id: '4',
    name: 'رياضة وترفيه',
    icon: '⚽'
  },
  {
    id: '5',
    name: 'جمال وعناية',
    icon: '💄'
  },
  {
    id: '6',
    name: 'كتب ومكتبة',
    icon: '📚'
  }
]

export default function MobileCategoryMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 space-x-reverse bg-primary text-white px-4 py-2 rounded-lg"
      >
        <Menu className="h-5 w-5" />
        <span>الفئات</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)} />
      )}

      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">جميع الفئات</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-full pb-20">
          {categories.map((category) => (
            <div key={category.id} className="mb-2">
              <div
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => category.subcategories && toggleCategory(category.id)}
              >
                <Link
                  href={`/products?category=${category.id}`}
                  className="flex items-center space-x-3 space-x-reverse flex-1"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-medium text-gray-700">{category.name}</span>
                </Link>
                
                {category.subcategories && (
                  <div className="p-1">
                    {expandedCategories.includes(category.id) ? (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                )}
              </div>
              
              {category.subcategories && expandedCategories.includes(category.id) && (
                <div className="mr-6 mb-2">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      href={`/products?category=${subcategory.id}`}
                      className="flex items-center space-x-2 space-x-reverse p-2 hover:bg-gray-50 rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-sm">{subcategory.icon}</span>
                      <span className="text-sm text-gray-600">{subcategory.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}