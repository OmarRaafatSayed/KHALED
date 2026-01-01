'use client';

import { MapPin, Clock, DollarSign, Building } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
  description: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: 'مطور واجهات أمامية',
    company: 'شركة التقنية المتقدمة',
    logo: '/api/placeholder/60/60',
    location: 'الرياض',
    type: 'دوام كامل',
    salary: '8000 - 12000 ريال',
    postedDate: '2024-01-15',
    description: 'نبحث عن مطور واجهات أمامية محترف للانضمام لفريقنا'
  },
  {
    id: 2,
    title: 'مختص تسويق رقمي',
    company: 'وكالة الإبداع التسويقي',
    logo: '/api/placeholder/60/60',
    location: 'جدة',
    type: 'عن بُعد',
    salary: '6000 - 9000 ريال',
    postedDate: '2024-01-14',
    description: 'فرصة رائعة للعمل في مجال التسويق الرقمي'
  },
  {
    id: 3,
    title: 'مهندس برمجيات',
    company: 'تك سوليوشنز',
    logo: '/api/placeholder/60/60',
    location: 'الدمام',
    type: 'دوام كامل',
    salary: '10000 - 15000 ريال',
    postedDate: '2024-01-13',
    description: 'مطلوب مهندس برمجيات بخبرة في تطوير التطبيقات'
  },
];

export default function JobGrid() {
  const handleQuickApply = (jobId: number) => {
    console.log('Quick apply for job:', jobId);
  };

  return (
    <div className="flex-1">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">الوظائف المتاحة</h2>
          <p className="text-gray-600">{jobs.length} وظيفة متاحة</p>
        </div>
        
        <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>الأحدث</option>
          <option>الأقدم</option>
          <option>الراتب الأعلى</option>
          <option>الراتب الأقل</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <img
                src={job.logo}
                alt={job.company}
                className="w-16 h-16 rounded-lg object-cover border border-gray-200"
              />
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{job.title}</h3>
                <div className="flex items-center gap-1 text-gray-600 mb-2">
                  <Building size={16} />
                  <span className="text-sm">{job.company}</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign size={14} />
                    <span>{job.salary}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    نُشر في {new Date(job.postedDate).toLocaleDateString('ar-SA')}
                  </span>
                  
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors text-sm">
                      عرض التفاصيل
                    </button>
                    <button
                      onClick={() => handleQuickApply(job.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      تقديم سريع
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            السابق
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-md">1</button>
          <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">2</button>
          <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">3</button>
          <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            التالي
          </button>
        </div>
      </div>
    </div>
  );
}