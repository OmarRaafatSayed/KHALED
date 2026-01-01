'use client';

import { Bookmark, X } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  thumbnail: string;
  excerpt: string;
  dateBookmarked: string;
  category: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'أساسيات التجارة الإلكترونية للمبتدئين',
    thumbnail: '/api/placeholder/300/200',
    excerpt: 'دليل شامل لبدء رحلتك في التجارة الإلكترونية وبناء متجر ناجح',
    dateBookmarked: '2024-01-15',
    category: 'تجارة إلكترونية'
  },
  {
    id: '2',
    title: 'استراتيجيات التسويق الرقمي الحديثة',
    thumbnail: '/api/placeholder/300/200',
    excerpt: 'تعلم أحدث تقنيات التسويق الرقمي لزيادة مبيعاتك',
    dateBookmarked: '2024-01-12',
    category: 'تسويق'
  },
  {
    id: '3',
    title: 'إدارة المخزون بكفاءة',
    thumbnail: '/api/placeholder/300/200',
    excerpt: 'نصائح وأدوات لإدارة المخزون وتجنب النفاد أو التراكم',
    dateBookmarked: '2024-01-10',
    category: 'إدارة'
  },
  {
    id: '4',
    title: 'تحسين تجربة المستخدم في المتاجر الإلكترونية',
    thumbnail: '/api/placeholder/300/200',
    excerpt: 'كيفية تصميم متجر إلكتروني يوفر تجربة مستخدم ممتازة',
    dateBookmarked: '2024-01-08',
    category: 'تصميم'
  }
];

export default function KnowledgePage() {
  const handleRemoveArticle = (articleId: string) => {
    // Handle remove article logic
    console.log('Remove article:', articleId);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">مركز المعرفة</h1>
        <p className="text-gray-600">المقالات والموارد المحفوظة</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">المقالات المحفوظة</h2>
            <span className="text-sm text-gray-500">{articles.length} مقال</span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img 
                    src={article.thumbnail} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => handleRemoveArticle(article.id)}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    <X size={16} className="text-red-600" />
                  </button>
                  <div className="absolute bottom-2 left-2">
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Bookmark size={14} />
                      <span>محفوظ في {article.dateBookmarked}</span>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                      قراءة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {articles.length === 0 && (
            <div className="text-center py-12">
              <Bookmark className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-600 mb-2">لا توجد مقالات محفوظة</h3>
              <p className="text-gray-500">ابدأ بحفظ المقالات المفيدة من المدونة</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}