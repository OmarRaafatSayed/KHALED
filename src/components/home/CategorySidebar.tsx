'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'

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
    icon: '🏠',
    subcategories: [
      { id: '3-1', name: 'أثاث', icon: '🪑' },
      { id: '3-2', name: 'ديكور', icon: '🖼️' },
      { id: '3-3', name: 'أدوات منزلية', icon: '🔧' }
    ]
  },
  {
    id: '4',
    name: 'رياضة وترفيه',
    icon: '⚽',
    subcategories: [
      { id: '4-1', name: 'معدات رياضية', icon: '🏋️' },
      { id: '4-2', name: 'ألعاب', icon: '🎮' }
    ]
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

export default function CategorySidebar() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border w-64 h-fit">
      <div className="bg-primary text-white p-4 rounded-t-lg">
        <h3 className="font-semibold text-lg">جميع الفئات</h3>
      </div>
      
      <div className="p-2">
        {categories.map((category) => (
          <div key={category.id} className="mb-1">
            <div
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              onClick={() => category.subcategories && toggleCategory(category.id)}
            >
              <Link
                href={`/products?category=${category.id}`}
                className="flex items-center space-x-3 space-x-reverse flex-1"
              >
                <span className="text-xl">{category.icon}</span>
                <span className="text-sm font-medium text-gray-700">{category.name}</span>
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
                    className="flex items-center space-x-2 space-x-reverse p-2 hover:bg-gray-50 rounded-lg transition-colors"
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
  )
}