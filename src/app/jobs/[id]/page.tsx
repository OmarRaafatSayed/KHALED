'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

interface JobDetail {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary: string;
  postedDate: string;
  description: string;
  requirements: string[];
  benefits: string[];
  category: string;
  applicationUrl: string;
  companyDescription: string;
  companyWebsite: string;
}

const mockJob: JobDetail = {
  id: 1,
  title: 'مطور تطبيقات موبايل',
  company: 'شركة التقنية المتقدمة',
  companyLogo: '/api/placeholder/120/120',
  location: 'الرياض',
  type: 'full-time',
  salary: '8000 - 12000 ريال',
  postedDate: '2024-01-20',
  description: 'نبحث عن مطور تطبيقات موبايل خبير في React Native و Flutter للانضمام إلى فريقنا المتميز. ستكون مسؤولاً عن تطوير تطبيقات موبايل عالية الجودة وتحسين الأداء وتجربة المستخدم.',
  requirements: [
    'خبرة لا تقل عن 3 سنوات في تطوير تطبيقات الموبايل',
    'إتقان React Native و Flutter',
    'معرفة قوية بـ JavaScript و TypeScript',
    'خبرة في التعامل مع APIs و REST Services',
    'معرفة بأنظمة إدارة الإصدارات (Git)',
    'القدرة على العمل ضمن فريق',
    'إجادة اللغة الإنجليزية'
  ],
  benefits: [
    'راتب تنافسي من 8000 إلى 12000 ريال',
    'تأمين طبي شامل',
    'إجازة سنوية مدفوعة الأجر',
    'بيئة عمل مرنة',
    'فرص التطوير المهني والتدريب',
    'مكافآت الأداء',
    'وجبات مجانية'
  ],
  category: 'تقنية المعلومات',
  applicationUrl: 'https://company.com/apply/mobile-developer',
  companyDescription: 'شركة التقنية المتقدمة هي شركة رائدة في مجال تطوير الحلول التقنية المبتكرة. نعمل مع أكبر الشركات في المنطقة لتقديم حلول تقنية متطورة تساعد في تحسين الأعمال وزيادة الكفاءة.',
  companyWebsite: 'https://advanced-tech.com'
};

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id;

  const getJobTypeBadge = (type: string) => {
    const styles = {
      'full-time': 'bg-green-100 text-green-800',
      'part-time': 'bg-blue-100 text-blue-800',
      'contract': 'bg-orange-100 text-orange-800',
      'remote': 'bg-purple-100 text-purple-800'
    };
    const labels = {
      'full-time': 'دوام كامل',
      'part-time': 'دوام جزئي',
      'contract': 'عقد مؤقت',
      'remote': 'عن بُعد'
    };
    return (
      <span className={`px-3 py-1 text-sm font-medium rounded-full ${styles[type as keyof typeof styles]}`}>
        {labels[type as keyof typeof labels]}
      </span>
    );
  };

  const handleApply = () => {
    window.open(mockJob.applicationUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6">
            <Link href="/jobs" className="text-blue-600 hover:text-blue-800 flex items-center">
              ← العودة للوظائف
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-start space-x-6 mb-6 md:mb-0">
              <img 
                src={mockJob.companyLogo} 
                alt={mockJob.company}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockJob.title}</h1>
                <p className="text-xl text-gray-600 mb-3">{mockJob.company}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    📍 {mockJob.location}
                  </span>
                  <span className="flex items-center">
                    💰 {mockJob.salary}
                  </span>
                  <span className="flex items-center">
                    📅 {mockJob.postedDate}
                  </span>
                </div>
                <div className="mt-3">
                  {getJobTypeBadge(mockJob.type)}
                </div>
              </div>
            </div>
            
            <button
              onClick={handleApply}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              التقديم للوظيفة
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">وصف الوظيفة</h2>
              <p className="text-gray-700 leading-relaxed">{mockJob.description}</p>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">المتطلبات</h2>
              <ul className="space-y-3">
                {mockJob.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 ml-3 mt-1">•</span>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">المزايا</h2>
              <ul className="space-y-3">
                {mockJob.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 ml-3 mt-1">✓</span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Apply Section */}
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">مهتم بهذه الوظيفة؟</h3>
              <p className="text-gray-600 mb-4">انقر على الزر أدناه للتقديم مباشرة عبر موقع الشركة</p>
              <button
                onClick={handleApply}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
              >
                التقديم الآن
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ملخص الوظيفة</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">المسمى الوظيفي:</span>
                  <span className="font-medium">{mockJob.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الشركة:</span>
                  <span className="font-medium">{mockJob.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الموقع:</span>
                  <span className="font-medium">{mockJob.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">نوع الوظيفة:</span>
                  <span className="font-medium">
                    {mockJob.type === 'full-time' ? 'دوام كامل' :
                     mockJob.type === 'part-time' ? 'دوام جزئي' :
                     mockJob.type === 'contract' ? 'عقد مؤقت' : 'عن بُعد'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الراتب:</span>
                  <span className="font-medium">{mockJob.salary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المجال:</span>
                  <span className="font-medium">{mockJob.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">تاريخ النشر:</span>
                  <span className="font-medium">{mockJob.postedDate}</span>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">حول الشركة</h3>
              <div className="text-center mb-4">
                <img 
                  src={mockJob.companyLogo} 
                  alt={mockJob.company}
                  className="w-16 h-16 rounded-lg object-cover mx-auto mb-3"
                />
                <h4 className="font-medium text-gray-900">{mockJob.company}</h4>
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                {mockJob.companyDescription}
              </p>
              <a 
                href={mockJob.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
              >
                🌐 زيارة موقع الشركة
              </a>
            </div>

            {/* Share */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">مشاركة الوظيفة</h3>
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700">
                  فيسبوك
                </button>
                <button className="flex-1 bg-blue-400 text-white py-2 px-3 rounded text-sm hover:bg-blue-500">
                  تويتر
                </button>
                <button className="flex-1 bg-blue-700 text-white py-2 px-3 rounded text-sm hover:bg-blue-800">
                  لينكد إن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}