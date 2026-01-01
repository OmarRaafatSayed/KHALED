'use client';

import { TrendingUp, ShoppingCart, Eye } from 'lucide-react';

interface TrendingArticle {
  id: number;
  title: string;
  views: number;
  image: string;
}

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
}

const trendingArticles: TrendingArticle[] = [
  {
    id: 1,
    title: 'أفضل الهواتف الذكية لعام 2024',
    views: 5200,
    image: '/api/placeholder/80/60'
  },
  {
    id: 2,
    title: 'نصائح للتسوق الآمن عبر الإنترنت',
    views: 4800,
    image: '/api/placeholder/80/60'
  },
  {
    id: 3,
    title: 'دليل شراء اللابتوب المناسب',
    views: 4100,
    image: '/api/placeholder/80/60'
  },
  {
    id: 4,
    title: 'أساسيات التصوير الفوتوغرافي',
    views: 3900,
    image: '/api/placeholder/80/60'
  }
];

const relatedProducts: RelatedProduct[] = [
  {
    id: 1,
    name: 'هاتف سامسونج جالاكسي S24',
    price: 2999,
    image: '/api/placeholder/80/80',
    rating: 4.8
  },
  {
    id: 2,
    name: 'سماعات أبل AirPods Pro',
    price: 899,
    image: '/api/placeholder/80/80',
    rating: 4.7
  },
  {
    id: 3,
    name: 'ساعة أبل الذكية Series 9',
    price: 1599,
    image: '/api/placeholder/80/80',
    rating: 4.9
  }
];

export default function ArticleSidebar() {
  return (
    <div className="w-80 space-y-6">
      {/* Trending Articles */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-red-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">المقالات الرائجة</h3>
        </div>
        
        <div className="space-y-4">
          {trendingArticles.map((article, index) => (
            <div key={article.id} className="flex gap-3 group cursor-pointer">
              <div className="flex-shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-16 h-12 rounded-md object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 line-clamp-2 transition-colors">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                      <Eye size={12} />
                      <span>{article.views.toLocaleString()} مشاهدة</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
          عرض جميع المقالات الرائجة
        </button>
      </div>

      {/* Related Products */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="text-green-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">منتجات ذات صلة</h3>
        </div>
        
        <div className="space-y-4">
          {relatedProducts.map((product) => (
            <div key={product.id} className="flex gap-3 group cursor-pointer">
              <div className="flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-md object-cover border border-gray-200"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 line-clamp-2 transition-colors">
                  {product.name}
                </h4>
                
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xs ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-xs text-gray-500 mr-1">({product.rating})</span>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-gray-900">{product.price} ريال</span>
                  <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors">
                    أضف للسلة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 text-green-600 hover:text-green-800 text-sm font-medium">
          عرض المزيد من المنتجات
        </button>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">اشترك في النشرة الإخبارية</h3>
        <p className="text-blue-100 text-sm mb-4">
          احصل على أحدث المقالات والعروض مباشرة في بريدك الإلكتروني
        </p>
        
        <div className="space-y-3">
          <input
            type="email"
            placeholder="بريدك الإلكتروني"
            className="w-full px-3 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button className="w-full bg-white text-blue-600 py-2 rounded-md hover:bg-gray-100 transition-colors font-medium">
            اشترك الآن
          </button>
        </div>
      </div>
    </div>
  );
}