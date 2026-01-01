'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Star, X } from 'lucide-react'

interface FilterSidebarProps {
  onFiltersChange: (filters: any) => void
  isOpen: boolean
  onClose: () => void
}

const categories = [
  { id: '1', name: 'إلكترونيات', count: 245 },
  { id: '2', name: 'أزياء', count: 189 },
  { id: '3', name: 'منزل وحديقة', count: 156 },
  { id: '4', name: 'رياضة', count: 98 }
]

const brands = [
  { id: 'apple', name: 'Apple', count: 45 },
  { id: 'samsung', name: 'Samsung', count: 38 },
  { id: 'nike', name: 'Nike', count: 67 },
  { id: 'adidas', name: 'Adidas', count: 52 }
]

export default function FilterSidebar({ onFiltersChange, isOpen, onClose }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [expandedSections, setExpandedSections] = useState(['categories', 'price', 'brands', 'rating'])

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const handleCategoryChange = (categoryId: string) => {
    const updated = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId]
    setSelectedCategories(updated)
    onFiltersChange({ categories: updated, brands: selectedBrands, priceRange, rating: selectedRating })
  }

  const handleBrandChange = (brandId: string) => {
    const updated = selectedBrands.includes(brandId)
      ? selectedBrands.filter(id => id !== brandId)
      : [...selectedBrands, brandId]
    setSelectedBrands(updated)
    onFiltersChange({ categories: selectedCategories, brands: updated, priceRange, rating: selectedRating })
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
    onFiltersChange({ categories: selectedCategories, brands: selectedBrands, priceRange: value, rating: selectedRating })
  }

  const handleRatingChange = (rating: number) => {
    const newRating = selectedRating === rating ? null : rating
    setSelectedRating(newRating)
    onFiltersChange({ categories: selectedCategories, brands: selectedBrands, priceRange, rating: newRating })
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 10000])
    setSelectedRating(null)
    onFiltersChange({ categories: [], brands: [], priceRange: [0, 10000], rating: null })
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static top-0 right-0 h-full lg:h-auto w-80 lg:w-64 bg-white z-50 transform transition-transform duration-300 lg:transform-none ${
        isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      } border-l lg:border-l-0 lg:border-r`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <h3 className="text-lg font-semibold">الفلاتر</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-full lg:h-auto">
          {/* Clear Filters */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold hidden lg:block">الفلاتر</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:text-primary-dark"
            >
              مسح الكل
            </button>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg"
            >
              <span className="font-medium">الفئات</span>
              {expandedSections.includes('categories') ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            {expandedSections.includes('categories') && (
              <div className="mt-2 space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700">{category.name}</span>
                    <span className="text-xs text-gray-500">({category.count})</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg"
            >
              <span className="font-medium">نطاق السعر</span>
              {expandedSections.includes('price') ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            {expandedSections.includes('price') && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{priceRange[0]} ريال</span>
                  <span className="text-sm text-gray-600">{priceRange[1]} ريال</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Brands */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('brands')}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg"
            >
              <span className="font-medium">البراندات</span>
              {expandedSections.includes('brands') ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            {expandedSections.includes('brands') && (
              <div className="mt-2 space-y-2">
                {brands.map((brand) => (
                  <label key={brand.id} className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.id)}
                      onChange={() => handleBrandChange(brand.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700">{brand.name}</span>
                    <span className="text-xs text-gray-500">({brand.count})</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('rating')}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg"
            >
              <span className="font-medium">التقييم</span>
              {expandedSections.includes('rating') ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            {expandedSections.includes('rating') && (
              <div className="mt-2 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingChange(rating)}
                    className={`flex items-center space-x-2 space-x-reverse w-full p-2 rounded-lg transition-colors ${
                      selectedRating === rating ? 'bg-primary-50 text-primary' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm">فأكثر</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}