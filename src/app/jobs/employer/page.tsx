import EmployerJobManagement from '@/components/jobs/EmployerJobManagement';

export default function EmployerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">لوحة تحكم الشركة</h1>
          <p className="text-gray-600">إدارة الوظائف والمتقدمين</p>
        </div>
        
        <EmployerJobManagement />
      </div>
    </div>
  );
}