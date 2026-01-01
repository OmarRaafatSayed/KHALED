import JobApplications from '@/components/jobs/JobApplications';

export default function DashboardJobsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">طلبات التوظيف</h1>
        <p className="text-gray-600">تتبع حالة طلبات التوظيف التي تقدمت لها</p>
      </div>
      
      <JobApplications />
    </div>
  );
}