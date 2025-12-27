'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { productsApi } from '@/lib/api'
import { Product, Category } from '@/types'
import toast from 'react-hot-toast'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    category_id: '',
    min_price: '',
    max_price: '',
    sort_by: 'created_at',
    sort_order: 'desc' as 'asc' | 'desc'
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [filters])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productsApi.getProducts(filters)
      setProducts(response.data.data)
    } catch (error) {
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await productsApi.getCategories()
      setCategories(response.data.data)
    } catch (error) {
      console.error('Failed to fetch categories')
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              TailAdmin
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link href="/register" className="btn-primary">
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                className="input-field"
                value={filters.category_id}
                onChange={(e) => handleFilterChange('category_id', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price
              </label>
              <input
                type="number"
                className="input-field"
                placeholder="0"
                value={filters.min_price}
                onChange={(e) => handleFilterChange('min_price', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                className="input-field"
                value={`${filters.sort_by}-${filters.sort_order}`}
                onChange={(e) => {
                  const [sort_by, sort_order] = e.target.value.split('-')
                  setFilters(prev => ({ ...prev, sort_by, sort_order: sort_order as 'asc' | 'desc' }))
                }}
              >
                <option value="created_at-desc">Newest First</option>
                <option value="created_at-asc">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
                  {product.images?.[0] ? (
                    <img
                      src={`http://localhost:8000/storage/${product.images[0].paths?.medium || product.images[0].paths?.original}`}
                      alt={product.name}
                      className="h-48 w-full object-cover object-center"
                    />
                  ) : (
                    <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    <Link href={`/products/${product.id}`} className="hover:text-primary-600">
                      {product.name}
                    </Link>
                  </h3>
                  
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                    {product.short_description || product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.compare_price && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.compare_price}
                        </span>
                      )}
                    </div>
                    
                    <span className="text-xs text-gray-500">
                      {product.vendor.store_name}
                    </span>
                  </div>
                  
                  <button className="w-full mt-4 btn-primary">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  )
}