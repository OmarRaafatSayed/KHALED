import Link from 'next/link'

interface Brand {
  id: string
  name: string
  logo: string
  productCount: number
}

const featuredBrands: Brand[] = [
  {
    id: '1',
    name: 'Apple',
    logo: '/api/placeholder/120/60',
    productCount: 45
  },
  {
    id: '2',
    name: 'Samsung',
    logo: '/api/placeholder/120/60',
    productCount: 38
  },
  {
    id: '3',
    name: 'Nike',
    logo: '/api/placeholder/120/60',
    productCount: 67
  },
  {
    id: '4',
    name: 'Adidas',
    logo: '/api/placeholder/120/60',
    productCount: 52
  },
  {
    id: '5',
    name: 'Sony',
    logo: '/api/placeholder/120/60',
    productCount: 29
  },
  {
    id: '6',
    name: 'LG',
    logo: '/api/placeholder/120/60',
    productCount: 34
  }
]

export default function FeaturedBrands() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">البراندات المميزة</h2>
        <Link href="/brands" className="text-primary hover:text-primary-dark font-medium">
          عرض الكل ←
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {featuredBrands.map((brand) => (
          <Link
            key={brand.id}
            href={`/products?brand=${brand.id}`}
            className="group bg-white rounded-lg border hover:shadow-lg transition-all duration-300 p-6 text-center"
          >
            <div className="mb-4">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-12 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1">
              {brand.name}
            </h3>
            <p className="text-sm text-gray-500">
              {brand.productCount} منتج
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}