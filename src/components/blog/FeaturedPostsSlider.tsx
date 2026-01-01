'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';

interface FeaturedPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  readTime: string;
  category: string;
  slug: string;
}

const featuredPosts: FeaturedPost[] = [
  {
    id: 1,
    title: 'دليل شامل لاختيار الهاتف الذكي المناسب في 2024',
    excerpt: 'تعرف على أهم المعايير والمواصفات التي يجب مراعاتها عند شراء هاتف ذكي جديد',
    image: '/api/placeholder/800/400',
    author: 'أحمد محمد',
    readTime: '5 دقائق',
    category: 'تقنية',
    slug: 'smartphone-buying-guide-2024'
  },
  {
    id: 2,
    title: 'أفضل النصائح للتسوق الآمن عبر الإنترنت',
    excerpt: 'كيف تحمي نفسك من عمليات الاحتيال وتضمن تجربة تسوق آمنة ومريحة',
    image: '/api/placeholder/800/400',
    author: 'فاطمة علي',
    readTime: '7 دقائق',
    category: 'نصائح',
    slug: 'safe-online-shopping-tips'
  },
  {
    id: 3,
    title: 'اتجاهات الموضة لموسم الربيع 2024',
    excerpt: 'اكتشف أحدث صيحات الموضة والألوان الرائجة لهذا الموسم',
    image: '/api/placeholder/800/400',
    author: 'سارة أحمد',
    readTime: '4 دقائق',
    category: 'موضة',
    slug: 'spring-fashion-trends-2024'
  }
];

export default function FeaturedPostsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  };

  const currentPost = featuredPosts[currentSlide];

  return (
    <div className="relative bg-white rounded-lg shadow-sm overflow-hidden mb-8">
      <div className="relative h-96 md:h-[500px]">
        <img
          src={currentPost.image}
          alt={currentPost.title}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-4">
              {currentPost.category}
            </span>
            
            <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
              {currentPost.title}
            </h2>
            
            <p className="text-lg text-gray-200 mb-6 line-clamp-2">
              {currentPost.excerpt}
            </p>
            
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{currentPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{currentPost.readTime}</span>
              </div>
            </div>
            
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              اقرأ المقال
            </button>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        
        {/* Dots Indicator */}
        <div className="absolute bottom-4 right-8 flex gap-2">
          {featuredPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}