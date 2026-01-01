import FeaturedPostsSlider from '@/components/blog/FeaturedPostsSlider';
import ArticlesGrid from '@/components/blog/ArticlesGrid';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">المدونة</h1>
          <p className="text-gray-600">اكتشف أحدث المقالات والنصائح في عالم التسوق والتكنولوجيا</p>
        </div>
        
        <FeaturedPostsSlider />
        <ArticlesGrid />
      </div>
    </div>
  );
}