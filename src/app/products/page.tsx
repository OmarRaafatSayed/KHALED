'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import FilterSidebar from '@/components/products/FilterSidebar'
import ProductToolbar from '@/components/products/ProductToolbar'
import ProductGrid from '@/components/products/ProductGrid'
import Pagination from '@/components/products/Pagination'
import { Product } from '@/types/marketplace'

// Mock data - في التطبيق الحقيقي سيتم جلبها من API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    description: 'أحدث هاتف من آبل بتقنيات متطورة',
    price: 4999,
    originalPrice: 5999,
    images: ['/api/placeholder/300/300'],
    category: { id: '1', name: 'إلكترونيات', slug: 'electronics' },
    vendor: {
      id: '1',
      name: 'Tech Store',
      email: 'tech@store.com',
      storeName: 'متجر التقنية',
      rating: 4.8,
      reviewCount: 150,
      verified: true,
      createdAt: '2024-01-01'
    },
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    tags: ['جديد', 'مميز'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    description: 'هاتف سامسونج الجديد بكاميرا احترافية',
    price: 3499,
    originalPrice: 4299,
    images: ['/api/placeholder/300/300'],
    category: { id: '1', name: 'إلكترونيات', slug: 'electronics' },
    vendor: {
      id: '2',
      name: 'Mobile World',
      email: 'mobile@world.com',
      storeName: 'عالم الموبايل',
      rating: 4.6,
      reviewCount: 200,
      verified: true,
      createdAt: '2024-01-01'
    },
    rating: 4.3,
    reviewCount: 156,
    inStock: true,
    tags: ['عرض خاص'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'MacBook Pro M3',
    description: 'أحدث لابتوب من آبل للمحترفين',
    price: 8999,
    originalPrice: 9999,
    images: ['/api/placeholder/300/300'],
    category: { id: '1', name: 'إلكترونيات', slug: 'electronics' },
    vendor: {
      id: '3',
      name: 'Apple Store',
      email: 'apple@store.com',
      storeName: 'متجر آبل الرسمي',
      rating: 4.9,
      reviewCount: 500,
      verified: true,
      createdAt: '2024-01-01'
    },
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    tags: ['جديد', 'حصري'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '4',
    name: 'فستان صيفي أنيق',
    description: 'فستان صيفي بتصميم عصري ومريح',
    price: 299,
    originalPrice: 399,
    images: ['/api/placeholder/300/300'],
    category: { id: '2', name: 'أزياء', slug: 'fashion' },
    vendor: {
      id: '4',
      name: 'Fashion Hub',
      email: 'fashion@hub.com',
      storeName: 'مركز الأزياء',
      rating: 4.5,
      reviewCount: 120,
      verified: true,
      createdAt: '2024-01-01'
    },
    rating: 4.2,
    reviewCount: 67,
    inStock: true,
    tags: ['جديد', 'صيفي'],
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14'
  }
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: [0, 10000],
    rating: null
  })

  const productsPerPage = 12
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = [...products]

    // فلتر الفئات
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category.id)
      )
    }

    // فلتر البراندات
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        filters.brands.some(brand => 
          product.vendor.storeName.toLowerCase().includes(brand.toLowerCase())
        )
      )
    }

    // فلتر السعر
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    )

    // فلتر التقييم
    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= filters.rating)
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [filters, products])

  // معالجة البحث من URL
  useEffect(() => {
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    
    if (category) {
      setFilters(prev => ({
        ...prev,
        categories: [category]
      }))
    }
    
    if (search) {
      const searchResults = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredProducts(searchResults)
    }
  }, [searchParams, products])

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  const handleSortChange = (sortBy: string) => {
    let sorted = [...filteredProducts]
    
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        break
    }
    
    setFilteredProducts(sorted)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <FilterSidebar
            onFiltersChange={handleFiltersChange}
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <ProductToolbar
              totalResults={filteredProducts.length}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onSortChange={handleSortChange}
              onFiltersToggle={() => setFiltersOpen(true)}
            />

            {/* Products Grid */}
            <div className="p-6">
              <ProductGrid
                products={currentProducts}
                viewMode={viewMode}
                loading={loading}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}