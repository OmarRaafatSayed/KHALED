'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/hooks/useCart';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  colors: string[];
  inStock: boolean;
  vendor: string;
  discount?: number;
}

interface Filters {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  colors: string[];
  inStock: boolean;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    description: 'أحدث هواتف Apple مع كاميرا احترافية وأداء فائق',
    price: 1299,
    originalPrice: 1399,
    image: '/api/placeholder/300/300',
    category: 'الإلكترونيات',
    brand: 'Apple',
    rating: 4.8,
    reviewCount: 234,
    colors: ['أسود', 'أبيض', 'ذهبي'],
    inStock: true,
    vendor: 'متجر التقنية',
    discount: 7
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    description: 'هاتف ذكي متطور مع شاشة AMOLED وكاميرا عالية الدقة',
    price: 999,
    image: '/api/placeholder/300/300',
    category: 'الإلكترونيات',
    brand: 'Samsung',
    rating: 4.6,
    reviewCount: 189,
    colors: ['أسود', 'أزرق', 'فضي'],
    inStock: true,
    vendor: 'متجر الجوالات'
  },
  {
    id: 3,
    name: 'Nike Air Max 270',
    description: 'حذاء رياضي مريح للجري والأنشطة اليومية',
    price: 450,
    originalPrice: 550,
    image: '/api/placeholder/300/300',
    category: 'الأزياء والملابس',
    brand: 'Nike',
    rating: 4.4,
    reviewCount: 156,
    colors: ['أسود', 'أبيض', 'أحمر'],
    inStock: true,
    vendor: 'متجر الرياضة',
    discount: 18
  },
  {
    id: 4,
    name: 'MacBook Pro 16"',
    description: 'لابتوب احترافي للمصممين والمطورين',
    price: 2499,
    image: '/api/placeholder/300/300',
    category: 'الإلكترونيات',
    brand: 'Apple',
    rating: 4.9,
    reviewCount: 89,
    colors: ['فضي', 'رمادي'],
    inStock: false,
    vendor: 'متجر التقنية'
  },
  {
    id: 5,
    name: 'Sony WH-1000XM5',
    description: 'سماعات لاسلكية مع إلغاء الضوضاء',
    price: 350,
    originalPrice: 400,
    image: '/api/placeholder/300/300',
    category: 'الإلكترونيات',
    brand: 'Sony',
    rating: 4.7,
    reviewCount: 267,
    colors: ['أسود', 'أبيض'],
    inStock: true,
    vendor: 'متجر الصوتيات',
    discount: 12
  },
  {
    id: 6,
    name: 'Adidas Ultraboost 22',
    description: 'حذاء جري متطور مع تقنية Boost',
    price: 380,
    image: '/api/placeholder/300/300',
    category: 'الأزياء والملابس',
    brand: 'Adidas',
    rating: 4.3,
    reviewCount: 134,
    colors: ['أسود', 'أبيض', 'أزرق'],
    inStock: true,
    vendor: 'متجر الرياضة'
  }
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    brands: [],
    priceRange: [0, 3000],
    rating: 0,
    colors: [],
    inStock: false
  });

  const categories = ['الإلكترونيات', 'الأزياء والملابس', 'المنزل والحديقة', 'الرياضة واللياقة'];
  const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG'];
  const colors = ['أسود', 'أبيض', 'أحمر', 'أزرق', 'ذهبي', 'فضي', 'رمادي'];

  useEffect(() => {
    let filtered = products.filter(product => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }
      
      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }
      
      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      
      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }
      
      // Color filter
      if (filters.colors.length > 0 && !filters.colors.some(color => product.colors.includes(color))) {
        return false;
      }
      
      // Stock filter
      if (filters.inStock && !product.inStock) {
        return false;
      }
      
      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    setFilteredProducts(filtered);
  }, [filters, sortBy, products]);

  const handleFilterChange = (filterType: keyof Filters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const toggleArrayFilter = (filterType: 'categories' | 'brands' | 'colors', value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 3000],
      rating: 0,
      colors: [],
      inStock: false
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const FilterSidebar = () => (
    <div className="bg-white rounded-lg shadow p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">الفلاتر</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          مسح الكل
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">الفئات</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => toggleArrayFilter('categories', category)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="mr-3 text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">نطاق السعر</h4>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="3000"
            step="50"
            value={filters.priceRange[1]}
            onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>0 ريال</span>
            <span>{filters.priceRange[1]} ريال</span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">البراندات</h4>
        <div className="space-y-2">
          {brands.map(brand => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleArrayFilter('brands', brand)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="mr-3 text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">التقييم</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <label key={rating} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => handleFilterChange('rating', rating)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <div className="mr-3 flex items-center">
                {renderStars(rating)}
                <span className="mr-2 text-sm text-gray-600">فأكثر</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">الألوان</h4>
        <div className="grid grid-cols-3 gap-2">
          {colors.map(color => (
            <label key={color} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.colors.includes(color)}
                onChange={() => toggleArrayFilter('colors', color)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="mr-2 text-xs text-gray-700">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => handleFilterChange('inStock', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="mr-3 text-sm text-gray-700">المتوفر فقط</span>
        </label>
      </div>
    </div>
  );

  const ProductCard = ({ product }: { product: Product }) => {
    const { addItem } = useCartStore();
    
    const handleBuyNow = () => {
      const cartItem = {
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        vendor: product.vendor
      };
      addItem(cartItem);
      window.location.href = '/checkout';
    };
    
    return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
            -{product.discount}%
          </div>
        )}
        <button className="absolute top-2 left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50">
          ♡
        </button>
      </div>
      
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 hover:text-blue-600 mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center mb-2">
          {renderStars(product.rating)}
          <span className="mr-2 text-sm text-gray-600">({product.reviewCount})</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-gray-900">{product.price} ريال</span>
            {product.originalPrice && (
              <span className="mr-2 text-sm text-gray-500 line-through">
                {product.originalPrice} ريال
              </span>
            )}
          </div>
          <span className={`px-2 py-1 text-xs rounded ${
            product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? 'متوفر' : 'غير متوفر'}
          </span>
        </div>
        
        <div className="text-sm text-gray-600 mb-3">
          بواسطة: {product.vendor}
        </div>
        
        <Link href={`/products/${product.id}`} className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-center block">
          تفاصيل المنتج
        </Link>
      </div>
    </div>
  );};

  const ProductListItem = ({ product }: { product: Product }) => {
    const { addItem } = useCartStore();
    
    const handleBuyNow = () => {
      const cartItem = {
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        vendor: product.vendor
      };
      addItem(cartItem);
      window.location.href = '/checkout';
    };
    
    return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-6">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 mb-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-3">{product.description}</p>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {renderStars(product.rating)}
            <span className="mr-2 text-sm text-gray-600">({product.reviewCount})</span>
          </div>
          
          <span className="text-sm text-gray-600">بواسطة: {product.vendor}</span>
          
          <span className={`px-2 py-1 text-xs rounded ${
            product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? 'متوفر' : 'غير متوفر'}
          </span>
        </div>
      </div>
      
      <div className="text-left">
        <div className="mb-3">
          <span className="text-xl font-bold text-gray-900">{product.price} ريال</span>
          {product.originalPrice && (
            <div className="text-sm text-gray-500 line-through">
              {product.originalPrice} ريال
            </div>
          )}
        </div>
        
        <Link href={`/products/${product.id}`} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
          تفاصيل المنتج
        </Link>
      </div>
    </div>
  );};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">المنتجات</h1>
          
          {/* Top Bar */}
          <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-gray-600">
                {filteredProducts.length} منتج
              </span>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">الأحدث</option>
                <option value="price-low">السعر: من الأقل للأعلى</option>
                <option value="price-high">السعر: من الأعلى للأقل</option>
                <option value="rating">الأعلى تقييماً</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="md:hidden bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                الفلاتر
              </button>
              
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded text-sm ${
                    viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-600'
                  }`}
                >
                  شبكة
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded text-sm ${
                    viewMode === 'list' ? 'bg-white shadow' : 'text-gray-600'
                  }`}
                >
                  قائمة
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Products */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">لا توجد منتجات</h3>
                <p className="text-gray-600">جرب تغيير الفلاتر للعثور على منتجات أخرى</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)}></div>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold">الفلاتر</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}