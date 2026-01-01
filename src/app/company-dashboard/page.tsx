'use client';

import { useState } from 'react';
import Link from 'next/link';

interface JobPosting {
  id: number;
  title: string;
  department: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  location: string;
  salary: string;
  status: 'active' | 'paused' | 'closed';
  applicants: number;
  postedDate: string;
  expiryDate: string;
  applicationUrl: string;
}

const mockJobs: JobPosting[] = [
  {
    id: 1,
    title: 'مطور تطبيقات موبايل',
    department: 'تقنية المعلومات',
    type: 'full-time',
    location: 'الرياض',
    salary: '8000 - 12000 ريال',
    status: 'active',
    applicants: 23,
    postedDate: '2024-01-20',
    expiryDate: '2024-02-20',
    applicationUrl: 'https://company.com/apply/mobile-developer'
  },
  {
    id: 2,
    title: 'مصمم UI/UX',
    department: 'التصميم',
    type: 'part-time',
    location: 'عن بُعد',
    salary: '5000 - 7000 ريال',
    status: 'active',
    applicants: 15,
    postedDate: '2024-01-18',
    expiryDate: '2024-02-18',
    applicationUrl: 'https://company.com/apply/ui-designer'
  },
  {
    id: 3,
    title: 'مدير تسويق رقمي',
    department: 'التسويق',
    type: 'full-time',
    location: 'الرياض',
    salary: '10000 - 15000 ريال',
    status: 'paused',
    applicants: 8,
    postedDate: '2024-01-15',
    expiryDate: '2024-02-15',
    applicationUrl: 'https://company.com/apply/marketing-manager'
  }
];

export default function CompanyDashboard() {
  const [jobs, setJobs] = useState<JobPosting[]>(mockJobs);
  const [showAddJobModal, setShowAddJobModal] = useState(false);

  const handleStatusChange = (jobId: number, newStatus: 'active' | 'paused' | 'closed') => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    ));
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      paused: 'bg-yellow-100 text-yellow-800',
      closed: 'bg-red-100 text-red-800'
    };
    const labels = {
      active: 'نشط',
      paused: 'متوقف',
      closed: 'مغلق'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getJobTypeBadge = (type: string) => {
    const styles = {
      'full-time': 'bg-blue-100 text-blue-800',
      'part-time': 'bg-purple-100 text-purple-800',
      'contract': 'bg-orange-100 text-orange-800',
      'remote': 'bg-indigo-100 text-indigo-800'
    };
    const labels = {
      'full-time': 'دوام كامل',
      'part-time': 'دوام جزئي',
      'contract': 'عقد مؤقت',
      'remote': 'عن بُعد'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[type as keyof typeof styles]}`}>
        {labels[type as keyof typeof labels]}
      </span>
    );
  };

  const activeJobs = jobs.filter(job => job.status === 'active').length;
  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants, 0);
  const pausedJobs = jobs.filter(job => job.status === 'paused').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم الشركة</h1>
              <p className="text-gray-600 mt-1">إدارة الوظائف والمتقدمين</p>
            </div>
            <button
              onClick={() => setShowAddJobModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              إضافة وظيفة جديدة
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">الوظائف النشطة</h3>
            <p className="text-3xl font-bold text-green-600">{activeJobs}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">إجمالي المتقدمين</h3>
            <p className="text-3xl font-bold text-blue-600">{totalApplicants}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">الوظائف المتوقفة</h3>
            <p className="text-3xl font-bold text-yellow-600">{pausedJobs}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">إجمالي الوظائف</h3>
            <p className="text-3xl font-bold text-purple-600">{jobs.length}</p>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">الوظائف المنشورة</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الوظيفة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    القسم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    النوع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الموقع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المتقدمين
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ الانتهاء
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-500">{job.salary}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {job.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getJobTypeBadge(job.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {job.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{job.applicants}</div>
                      <div className="text-xs text-gray-500">متقدم</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(job.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.expiryDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link 
                          href={`/jobs/${job.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          عرض
                        </Link>
                        <button className="text-green-600 hover:text-green-900">
                          تعديل
                        </button>
                        {job.status === 'active' ? (
                          <button
                            onClick={() => handleStatusChange(job.id, 'paused')}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            إيقاف
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusChange(job.id, 'active')}
                            className="text-green-600 hover:text-green-900"
                          >
                            تفعيل
                          </button>
                        )}
                        <button
                          onClick={() => handleStatusChange(job.id, 'closed')}
                          className="text-red-600 hover:text-red-900"
                        >
                          إغلاق
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h3>
            <div className="space-y-3">
              <button
                onClick={() => setShowAddJobModal(true)}
                className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded transition-colors text-blue-700"
              >
                إضافة وظيفة جديدة
              </button>
              <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded transition-colors text-green-700">
                عرض جميع المتقدمين
              </button>
              <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded transition-colors text-purple-700">
                تقارير التوظيف
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">آخر المتقدمين</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="text-sm font-medium">أحمد محمد</div>
                  <div className="text-xs text-gray-500">مطور تطبيقات موبايل</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="text-sm font-medium">فاطمة علي</div>
                  <div className="text-xs text-gray-500">مصمم UI/UX</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="text-sm font-medium">محمد سالم</div>
                  <div className="text-xs text-gray-500">مدير تسويق رقمي</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">إحصائيات الشهر</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">وظائف جديدة</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">متقدمين جدد</span>
                <span className="font-medium">46</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">مقابلات مجدولة</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">تم التوظيف</span>
                <span className="font-medium">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Job Modal */}
      {showAddJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">إضافة وظيفة جديدة</h3>
            <p className="text-gray-600 mb-4">
              لإضافة وظيفة جديدة، يرجى التواصل مع فريق الدعم أو استخدام نظام إدارة الوظائف المتقدم.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddJobModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                إغلاق
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                التواصل مع الدعم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}