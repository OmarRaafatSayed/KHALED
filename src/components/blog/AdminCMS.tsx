'use client';

import { useState } from 'react';
import { Save, Eye, Trash2, Edit, Plus, Search, Filter } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  category: string;
  author: string;
  status: 'published' | 'draft' | 'scheduled';
  publishDate: string;
  views: number;
}

const articles: Article[] = [
  { id: 1, title: 'دليل شامل لاختيار الهاتف الذكي', category: 'تقنية', author: 'أحمد محمد', status: 'published', publishDate: '2024-01-15', views: 1250 },
  { id: 2, title: 'نصائح للتسوق الآمن عبر الإنترنت', category: 'نصائح', author: 'فاطمة علي', status: 'published', publishDate: '2024-01-14', views: 980 },
  { id: 3, title: 'اتجاهات الموضة لموسم الربيع', category: 'موضة', author: 'سارة أحمد', status: 'draft', publishDate: '2024-01-20', views: 0 },
];

export default function AdminCMS() {
  const [activeTab, setActiveTab] = useState<'list' | 'editor'>('list');
  const [articleForm, setArticleForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    seoTitle: '',
    seoDescription: '',
    featuredImage: '',
    status: 'draft' as 'published' | 'draft' | 'scheduled',
    publishDate: '',
  });

  const statusConfig = {
    published: { label: 'منشور', color: 'bg-green-100 text-green-800' },
    draft: { label: 'مسودة', color: 'bg-gray-100 text-gray-800' },
    scheduled: { label: 'مجدول', color: 'bg-blue-100 text-blue-800' },
  };

  const handleSaveArticle = () => {
    console.log('Saving article:', articleForm);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">إدارة المحتوى</h1>
            <p className="text-gray-600">إنشاء وإدارة المقالات والمحتوى</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              قائمة المقالات
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'editor' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Plus size={16} className="inline mr-2" />
              مقال جديد
            </button>
          </div>
        </div>
      </div>

      {/* Articles List */}
      {activeTab === 'list' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="البحث في المقالات..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">جميع الفئات</option>
                <option value="tech">تقنية</option>
                <option value="tips">نصائح</option>
                <option value="fashion">موضة</option>
              </select>
              
              <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">جميع الحالات</option>
                <option value="published">منشور</option>
                <option value="draft">مسودة</option>
                <option value="scheduled">مجدول</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العنوان</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الفئة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الكاتب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المشاهدات</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ النشر</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 line-clamp-2">{article.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[article.status].color}`}>
                        {statusConfig[article.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {article.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(article.publishDate).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Eye size={16} />
                        </button>
                        <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Article Editor */}
      {activeTab === 'editor' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">محرر المقالات</h2>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">عنوان المقال</label>
                  <input
                    type="text"
                    value={articleForm.title}
                    onChange={(e) => setArticleForm({...articleForm, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                    placeholder="اكتب عنوان المقال هنا..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المحتوى</label>
                  <div className="border border-gray-300 rounded-md">
                    {/* Rich Text Editor Toolbar */}
                    <div className="border-b border-gray-200 p-3 flex flex-wrap gap-2">
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">B</button>
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 italic">I</button>
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 underline">U</button>
                      <div className="w-px bg-gray-300 mx-2"></div>
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">H1</button>
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">H2</button>
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">H3</button>
                      <div className="w-px bg-gray-300 mx-2"></div>
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">صورة</button>
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">رابط</button>
                    </div>
                    
                    <textarea
                      value={articleForm.content}
                      onChange={(e) => setArticleForm({...articleForm, content: e.target.value})}
                      rows={15}
                      className="w-full p-4 focus:outline-none resize-none"
                      placeholder="اكتب محتوى المقال هنا..."
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المقتطف</label>
                  <textarea
                    value={articleForm.excerpt}
                    onChange={(e) => setArticleForm({...articleForm, excerpt: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ملخص قصير للمقال..."
                  />
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-4">إعدادات النشر</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                      <select
                        value={articleForm.status}
                        onChange={(e) => setArticleForm({...articleForm, status: e.target.value as any})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="draft">مسودة</option>
                        <option value="published">منشور</option>
                        <option value="scheduled">مجدول</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
                      <select
                        value={articleForm.category}
                        onChange={(e) => setArticleForm({...articleForm, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">اختر الفئة</option>
                        <option value="tech">تقنية</option>
                        <option value="tips">نصائح</option>
                        <option value="fashion">موضة</option>
                        <option value="beauty">جمال</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">العلامات</label>
                      <input
                        type="text"
                        value={articleForm.tags}
                        onChange={(e) => setArticleForm({...articleForm, tags: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="علامة1، علامة2، علامة3"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-4">SEO</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">عنوان SEO</label>
                      <input
                        type="text"
                        value={articleForm.seoTitle}
                        onChange={(e) => setArticleForm({...articleForm, seoTitle: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">وصف SEO</label>
                      <textarea
                        value={articleForm.seoDescription}
                        onChange={(e) => setArticleForm({...articleForm, seoDescription: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                معاينة
              </button>
              
              <div className="flex gap-3">
                <button className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  حفظ كمسودة
                </button>
                <button
                  onClick={handleSaveArticle}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Save size={16} />
                  نشر المقال
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}