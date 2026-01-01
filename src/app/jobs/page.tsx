import JobFilters from '@/components/jobs/JobFilters';
import JobGrid from '@/components/jobs/JobGrid';

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">الوظائف المتاحة</h1>
          <p className="text-gray-600">اكتشف فرص العمل المناسبة لك في أفضل الشركات</p>
        </div>
        
        <div className="flex gap-8">
          <JobFilters />
          <JobGrid />
        </div>
      </div>
    </div>
  );
}