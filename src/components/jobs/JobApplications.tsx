'use client';

import { Eye, Download, Clock, CheckCircle, XCircle } from 'lucide-react';

interface JobApplication {
  id: number;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  location: string;
  salary: string;
}

const applications: JobApplication[] = [
  {
    id: 1,
    jobTitle: 'مطور واجهات أمامية',
    company: 'شركة التقنية المتقدمة',
    appliedDate: '2024-01-16',
    status: 'shortlisted',
    location: 'الرياض',
    salary: '8000 - 12000 ريال'
  },
  {
    id: 2,
    jobTitle: 'مختص تسويق رقمي',
    company: 'وكالة الإبداع التسويقي',
    appliedDate: '2024-01-15',
    status: 'reviewed',
    location: 'جدة',
    salary: '6000 - 9000 ريال'
  },
  {
    id: 3,
    jobTitle: 'مهندس برمجيات',
    company: 'تك سوليوشنز',
    appliedDate: '2024-01-14',
    status: 'pending',
    location: 'الدمام',
    salary: '10000 - 15000 ريال'
  },
  {
    id: 4,
    jobTitle: 'محلل بيانات',
    company: 'شركة البيانات الذكية',
    appliedDate: '2024-01-10',
    status: 'rejected',
    location: 'الرياض',
    salary: '7000 - 10000 ريال'
  },
];

const statusConfig = {
  pending: { 
    label: 'قيد المراجعة', 
    color: 'bg-yellow-100 text-yellow-800',
    icon: Clock
  },
  reviewed: { 
    label: 'تمت المراجعة', 
    color: 'bg-blue-100 text-blue-800',
    icon: Eye
  },
  shortlisted: { 
    label: 'مرشح للمقابلة', 
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle
  },
  rejected: { 
    label: 'مرفوض', 
    color: 'bg-red-100 text-red-800',
    icon: XCircle
  },
  hired: { 
    label: 'تم القبول', 
    color: 'bg-emerald-100 text-emerald-800',
    icon: CheckCircle
  },
};

export default function JobApplications() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">طلبات التوظيف</h3>
            <p className="text-sm text-gray-500 mt-1">{applications.length} طلب توظيف</p>
          </div>
          
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">جميع الحالات</option>
              <option value="pending">قيد المراجعة</option>
              <option value="reviewed">تمت المراجعة</option>
              <option value="shortlisted">مرشح</option>
              <option value="rejected">مرفوض</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {applications.map((application) => {
          const StatusIcon = statusConfig[application.status].icon;
          
          return (
            <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900 mb-1">
                        {application.jobTitle}
                      </h4>
                      <p className="text-gray-600 mb-2">{application.company}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>📍 {application.location}</span>
                        <span>💰 {application.salary}</span>
                        <span>📅 تقدمت في {new Date(application.appliedDate).toLocaleDateString('ar-SA')}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <StatusIcon size={16} className={statusConfig[application.status].color.includes('yellow') ? 'text-yellow-600' : 
                          statusConfig[application.status].color.includes('blue') ? 'text-blue-600' :
                          statusConfig[application.status].color.includes('green') ? 'text-green-600' :
                          statusConfig[application.status].color.includes('red') ? 'text-red-600' : 'text-emerald-600'} />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[application.status].color}`}>
                          {statusConfig[application.status].label}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <button className="inline-flex items-center gap-2 px-3 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors text-sm">
                        <Eye size={16} />
                        عرض التفاصيل
                      </button>
                      
                      {application.status === 'shortlisted' && (
                        <button className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
                          <Download size={16} />
                          تحميل الدعوة
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {application.status === 'shortlisted' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800">
                    🎉 تهانينا! تم ترشيحك للمقابلة الشخصية. ستتلقى تفاصيل الموعد قريباً.
                  </p>
                </div>
              )}
              
              {application.status === 'rejected' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-800">
                    نشكرك على اهتمامك. لم يتم اختيارك لهذه الوظيفة، لكن نشجعك على التقديم للوظائف الأخرى.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {applications.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-500 mb-2">لا توجد طلبات توظيف</h3>
          <p className="text-gray-400 mb-4">لم تتقدم لأي وظيفة بعد</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            تصفح الوظائف المتاحة
          </button>
        </div>
      )}
    </div>
  );
}