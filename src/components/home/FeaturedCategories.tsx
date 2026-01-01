import Link from 'next/link'

interface FeaturedCategory {
  id: string
  name: string
  icon: string
  image: string
  productCount: number
}

const featuredCategories: FeaturedCategory[] = [
  {
    id: '1',
    name: 'إلكترونيات',
    icon: '📱',
    image: '/api/placeholder/200/200',
    productCount: 1250
  },
  {
    id: '2',
    name: 'أزياء',
    icon: '👕',
    image: '/api/placeholder/200/200',
    productCount: 890
  },
  {
    id: '3',
    name: 'منزل وحديقة',
    icon: '🏠',
    image: '/api/placeholder/200/200',
    productCount: 650
  },
  {
    id: '4',
    name: 'رياضة',
    icon: '⚽',
    image: '/api/placeholder/200/200',
    productCount: 420
  },
  {
    id: '5',
    name: 'جمال وعناية',
    icon: '💄',
    image: '/api/placeholder/200/200',
    productCount: 380
  },
  {
    id: '6',
    name: 'كتب',
    icon: '📚',
    image: '/api/placeholder/200/200',
    productCount: 290
  }
]

export default function FeaturedCategories() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">الفئات المميزة</h2>
        <Link href="/categories" className="text-primary hover:text-primary-dark font-medium">
          عرض الكل ←
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {featuredCategories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className="group bg-white rounded-lg border hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="relative">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute top-2 right-2 text-2xl bg-white rounded-full w-10 h-10 flex items-center justify-center">
                {category.icon}
              </div>
            </div>
            
            <div className="p-4 text-center">
              <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500">
                {category.productCount} منتج
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}