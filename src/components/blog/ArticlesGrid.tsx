'use client';

import { Clock, User, Eye } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  readTime: string;
  category: string;
  publishDate: string;
  views: number;
  slug: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: 'كيفية اختيار اللابتوب المناسب للعمل من المنزل',
    excerpt: 'دليل شامل لاختيار جهاز الكمبيوتر المحمول الذي يناسب احتياجاتك المهنية',
    image: '/api/placeholder/400/250',
    author: 'محمد أحمد',
    readTime: '6 دقائق',
    category: 'تقنية',
    publishDate: '2024-01-15',
    views: 1250,
    slug: 'laptop-buying-guide-work-from-home'
  },
  {
    id: 2,
    title: 'أساسيات التصوير الفوتوغرافي للمبتدئين',
    excerpt: 'تعلم أساسيات التصوير وكيفية التقاط صور احترافية بكاميرتك',
    image: '/api/placeholder/400/250',
    author: 'سارة محمد',
    readTime: '8 دقائق',
    category: 'تصوير',
    publishDate: '2024-01-14',
    views: 980,
    slug: 'photography-basics-beginners'
  },
  {
    id: 3,
    title: 'نصائح للعناية بالبشرة في فصل الشتاء',
    excerpt: 'كيف تحافظ على نضارة بشرتك خلال الأجواء الباردة والجافة',
    image: '/api/placeholder/400/250',
    author: 'نور علي',
    readTime: '5 دقائق',
    category: 'جمال',
    publishDate: '2024-01-13',
    views: 1580,
    slug: 'winter-skincare-tips'
  },
  {
    id: 4,
    title: 'دليل شراء الأجهزة المنزلية الذكية',
    excerpt: 'كل ما تحتاج معرفته عن الأجهزة الذكية وكيفية اختيار الأنسب لمنزلك',
    image: '/api/placeholder/400/250',
    author: 'أحمد خالد',
    readTime: '7 دقائق',
    category: 'منزل',
    publishDate: '2024-01-12',
    views: 2100,
    slug: 'smart-home-devices-guide'
  },
  {
    id: 5,
    title: 'أفضل التطبيقات لإدارة الأموال الشخصية',
    excerpt: 'تطبيقات مفيدة لمساعدتك في تتبع مصروفاتك وإدارة ميزانيتك',
    image: '/api/placeholder/400/250',
    author: 'فاطمة أحمد',
    readTime: '4 دقائق',
    category: 'مالية',
    publishDate: '2024-01-11',
    views: 890,
    slug: 'personal-finance-apps'
  },
  {
    id: 6,
    title: 'اتجاهات الديكور المنزلي لعام 2024',
    excerpt: 'اكتشف أحدث صيحات الديكور والألوان الرائجة لهذا العام',
    image: '/api/placeholder/400/250',
    author: 'ليلى محمود',
    readTime: '6 دقائق',
    category: 'ديكور',
    publishDate: '2024-01-10',
    views: 1350,
    slug: 'home-decor-trends-2024'
  }
];

const categoryColors = {
  'تقنية': 'bg-blue-100 text-blue-800',
  'تصوير': 'bg-purple-100 text-purple-800',
  'جمال': 'bg-pink-100 text-pink-800',
  'منزل': 'bg-green-100 text-green-800',
  'مالية': 'bg-yellow-100 text-yellow-800',
  'ديكور': 'bg-indigo-100 text-indigo-800',
};

export default function ArticlesGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">أحدث المقالات</h2>
        
        <div className="flex gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">جميع الفئات</option>
            <option value="tech">تقنية</option>
            <option value="beauty">جمال</option>
            <option value="home">منزل</option>
            <option value="finance">مالية</option>
          </select>
          
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="latest">الأحدث</option>
            <option value="popular">الأكثر قراءة</option>
            <option value="oldest">الأقدم</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <span className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full ${
                categoryColors[article.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'
              }`}>
                {article.category}
              </span>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
                {article.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>{article.views.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {new Date(article.publishDate).toLocaleDateString('ar-SA')}
                </span>
                
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  اقرأ المزيد ←
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {/* Load More Button */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          تحميل المزيد من المقالات
        </button>
      </div>
    </div>
  );
}