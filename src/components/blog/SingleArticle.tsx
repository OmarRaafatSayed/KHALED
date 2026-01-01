'use client';

import { useState } from 'react';
import { Clock, User, Eye, Share2, Heart, MessageCircle, ThumbsUp } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}

const comments: Comment[] = [
  {
    id: 1,
    author: 'أحمد محمد',
    avatar: '/api/placeholder/40/40',
    content: 'مقال رائع ومفيد جداً! استفدت كثيراً من النصائح المذكورة.',
    date: '2024-01-16',
    likes: 5
  },
  {
    id: 2,
    author: 'فاطمة علي',
    avatar: '/api/placeholder/40/40',
    content: 'شكراً لك على هذه المعلومات القيمة. هل يمكنك كتابة مقال عن موضوع مشابه؟',
    date: '2024-01-15',
    likes: 3
  }
];

export default function SingleArticle() {
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New comment:', newComment);
    setNewComment('');
  };

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Article Header */}
      <div className="p-8 border-b border-gray-200">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            تقنية
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
          دليل شامل لاختيار الهاتف الذكي المناسب في 2024
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <img src="/api/placeholder/32/32" alt="Author" className="w-8 h-8 rounded-full" />
            <span>أحمد محمد</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>5 دقائق قراءة</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>1,250 مشاهدة</span>
          </div>
          <span>15 يناير 2024</span>
        </div>
        
        {/* Social Actions */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              isLiked ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
            <span>أعجبني</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors">
            <Share2 size={16} />
            <span>مشاركة</span>
          </button>
        </div>
      </div>

      {/* Featured Image */}
      <div className="px-8 pt-8">
        <img
          src="/api/placeholder/800/400"
          alt="Article featured image"
          className="w-full h-64 md:h-96 object-cover rounded-lg"
        />
      </div>

      {/* Article Content */}
      <div className="p-8 prose prose-lg max-w-none">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          في عالم التكنولوجيا المتسارع، يصبح اختيار الهاتف الذكي المناسب مهمة معقدة بسبب كثرة الخيارات المتاحة. 
          هذا الدليل الشامل سيساعدك على اتخاذ القرار الصحيح بناءً على احتياجاتك وميزانيتك.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">المعايير الأساسية للاختيار</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          عند اختيار هاتف ذكي جديد، هناك عدة معايير مهمة يجب مراعاتها. أولاً، حدد الغرض الأساسي من استخدام الهاتف - 
          هل هو للعمل، الترفيه، التصوير، أم الاستخدام العام؟
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">1. الأداء والمعالج</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          المعالج هو قلب الهاتف الذكي. ابحث عن معالجات حديثة من شركات موثوقة مثل Snapdragon أو Apple A-series أو Exynos. 
          كلما كان المعالج أحدث، كان الأداء أفضل وأكثر كفاءة في استهلاك البطارية.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">2. الكاميرا وجودة التصوير</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          إذا كان التصوير مهماً بالنسبة لك، انتبه لمواصفات الكاميرا. لا تركز فقط على عدد الميجابكسل، بل اهتم بحجم المستشعر، 
          فتحة العدسة، وتقنيات التصوير المتقدمة مثل التثبيت البصري.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">3. البطارية وسرعة الشحن</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          سعة البطارية مهمة، لكن كفاءة النظام أهم. ابحث عن هواتف بسعة 4000 مللي أمبير على الأقل، 
          مع دعم الشحن السريع والشحن اللاسلكي إن أمكن.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
          <h4 className="font-semibold text-blue-800 mb-2">نصيحة مهمة</h4>
          <p className="text-blue-700">
            لا تنس التحقق من سياسة التحديثات للشركة المصنعة. الهواتف التي تحصل على تحديثات منتظمة تبقى آمنة وتعمل بكفاءة لفترة أطول.
          </p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="border-t border-gray-200 p-8">
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle size={20} className="text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-800">التعليقات ({comments.length})</h3>
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex gap-4">
            <img src="/api/placeholder/40/40" alt="Your avatar" className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="اكتب تعليقك هنا..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  نشر التعليق
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full" />
              
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-800">{comment.author}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.date).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
                
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <ThumbsUp size={14} />
                    <span>أعجبني ({comment.likes})</span>
                  </button>
                  <button className="hover:text-blue-600 transition-colors">رد</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}