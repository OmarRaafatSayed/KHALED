import SingleArticle from '@/components/blog/SingleArticle';
import ArticleSidebar from '@/components/blog/ArticleSidebar';

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-1">
            <SingleArticle />
          </div>
          <ArticleSidebar />
        </div>
      </div>
    </div>
  );
}