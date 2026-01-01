'use client'

import { useState } from 'react'
import { Grid3X3, List, SlidersHorizontal, ChevronDown } from 'lucide-react'

interface ProductToolbarProps {
  totalResults: number
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  onSortChange: (sort: string) => void
  onFiltersToggle: () => void
}

const sortOptions = [
  { value: 'newest', label: 'الأحدث' },
  { value: 'price-low', label: 'السعر: من الأقل للأعلى' },
  { value: 'price-high', label: 'السعر: من الأعلى للأقل' },
  { value: 'rating', label: 'الأعلى تقييماً' },
  { value: 'popular', label: 'الأكثر شعبية' }
]

export default function ProductToolbar({ 
  totalResults, 
  viewMode, 
  onViewModeChange, 
  onSortChange,
  onFiltersToggle 
}: ProductToolbarProps) {
  const [selectedSort, setSelectedSort] = useState('newest')
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)

  const handleSortChange = (value: string) => {
    setSelectedSort(value)
    onSortChange(value)
    setSortDropdownOpen(false)
  }

  return (
    <div className="bg-white border-b p-4">
      <div className="flex items-center justify-between">
        {/* Results Count & Mobile Filter Button */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <button
            onClick={onFiltersToggle}
            className="lg:hidden flex items-center space-x-2 space-x-reverse px-3 py-2 border rounded-lg hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-sm">الفلاتر</span>
          </button>
          
          <div className="text-sm text-gray-600">
            <span className="font-medium">{totalResults}</span> منتج
          </div>
        </div>

        {/* Sort & View Controls */}
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="flex items-center space-x-2 space-x-reverse px-3 py-2 border rounded-lg hover:bg-gray-50"
            >
              <span className="text-sm">
                {sortOptions.find(opt => opt.value === selectedSort)?.label}
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {sortDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`w-full text-right px-4 py-2 text-sm hover:bg-gray-50 ${
                      selectedSort === option.value ? 'bg-primary-50 text-primary' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 ${
                viewMode === 'grid' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 ${
                viewMode === 'list' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}