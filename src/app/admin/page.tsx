import AdminCMS from '@/components/blog/AdminCMS';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <AdminCMS />
      </div>
    </div>
  );
}