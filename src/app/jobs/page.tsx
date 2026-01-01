'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Job {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary: string;
  postedDate: string;
  description: string;
  category: string;
  applicationUrl: string;
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: 'مطور تطبيقات موبايل',
    company: 'شركة التقنية المتقدمة',
    companyLogo: '/api/placeholder/80/80',
    location: 'الرياض',
    type: 'full-time',
    salary: '8000 - 12000 ريال',
    postedDate: '2024-01-20',
    description: 'نبحث عن مطور تطبيقات موبايل خبير في React Native و Flutter',
    category: 'تقنية المعلومات',
    applicationUrl: 'https://company.com/apply/1'
  },
  {
    id: 2,
    title: 'مصمم UI/UX',
    company: 'استوديو الإبداع الرقمي',
    companyLogo: '/api/placeholder/80/80',
    location: 'جدة',
    type: 'part-time',
    salary: '5000 - 7000 ريال',
    postedDate: '2024-01-18',
    description: 'مطلوب مصمم واجهات مستخدم مبدع لتصميم تطبيقات التجارة الإلكترونية',
    category: 'التصميم',
    applicationUrl: 'https://studio.com/apply/2'
  },
  {
    id: 3,
    title: 'محاسب مالي',
    company: 'مجموعة الأعمال المتكاملة',
    companyLogo: '/api/placeholder/80/80',
    location: 'الدمام',
    type: 'full-time',
    salary: '6000 - 9000 ريال',
    postedDate: '2024-01-15',
    description: 'مطلوب محاسب مالي خبير في النظم المحاسبية والتقارير المالية',
    category: 'المحاسبة والمالية',
    applicationUrl: 'https://business.com/apply/3'
  },
  {
    id: 4,
    title: 'مطور ويب Full Stack',
    company: 'شركة الحلول الذكية',
    companyLogo: '/api/placeholder/80/80',
    location: 'عن بُعد',
    type: 'remote',
    salary: '10000 - 15000 ريال',
    postedDate: '2024-01-22',
    description: 'نبحث عن مطور ويب متكامل خبير في React و Node.js',
    category: 'تقنية المعلومات',
    applicationUrl: 'https://smartsolutions.com/apply/4'
  },
  {
    id: 5,
    title: 'مدير تسويق رقمي',
    company: 'وكالة التسويق الإبداعي',
    companyLogo: '/api/placeholder/80/80',
    location: 'الرياض',
    type: 'full-time',
    salary: '12000 - 18000 ريال',
    postedDate: '2024-01-19',
    description: 'مطلوب مدير تسويق رقمي خبير في إدارة الحملات الإعلانية',
    category: 'التسويق',
    applicationUrl: 'https://marketing.com/apply/5'
  },
  {
    id: 6,
    title: 'مهندس شبكات',
    company: 'شركة الاتصالات المتطورة',
    companyLogo: '/api/placeholder/80/80',
    location: 'جدة',
    type: 'contract',
    salary: '7000 - 10000 ريال',
    postedDate: '2024-01-17',
    description: 'مطلوب مهندس شبكات خبير في إدارة وصيانة الشبكات',
    category: 'الشبكات والاتصالات',
    applicationUrl: 'https://telecom.com/apply/6'
  }
];

export default function JobsPage() {
  const [jobs] = useState<Job[]>(mockJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const categories = ['all', 'تقنية المعلومات', 'التصميم', 'المحاسبة والمالية', 'التسويق', 'الشبكات والاتصالات'];
  const jobTypes = ['all', 'full-time', 'part-time', 'contract', 'remote'];
  const locations = ['all', 'الرياض', 'جدة', 'الدمام', 'عن بُعد'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesType && matchesLocation;
  });

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
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[type as keyof typeof styles]}`}>
        {labels[type as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">الوظائف المتاحة</h1>
            <p className="text-xl text-gray-600 mb-8">اكتشف فرص العمل المناسبة لك في أفضل الشركات</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="ابحث عن وظيفة أو شركة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'جميع المجالات' : category}
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {jobTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'جميع الأنواع' : 
                   type === 'full-time' ? 'دوام كامل' :
                   type === 'part-time' ? 'دوام جزئي' :
                   type === 'contract' ? 'عقد مؤقت' : 'عن بُعد'}
                </option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === 'all' ? 'جميع المواقع' : location}
                </option>
              ))}
            </select>

            <div className="text-sm text-gray-600 flex items-center">
              {filteredJobs.length} وظيفة متاحة
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Company Logo & Info */}
                <div className="flex items-start space-x-4 mb-4">
                  <img 
                    src={job.companyLogo} 
                    alt={job.company}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{job.company}</p>
                    <div className="flex items-center space-x-2">
                      {getJobTypeBadge(job.type)}
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="ml-2">📍</span>
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="ml-2">💰</span>
                    {job.salary}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="ml-2">📅</span>
                    {job.postedDate}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                  {job.description}
                </p>

                {/* Category */}
                <div className="mb-4">
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {job.category}
                  </span>
                </div>

                {/* Action Button */}
                <Link 
                  href={`/jobs/${job.id}`}
                  className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  تفاصيل الوظيفة
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">لا توجد وظائف متاحة</h3>
            <p className="text-gray-600">جرب تغيير معايير البحث للعثور على وظائف أخرى</p>
          </div>
        )}
      </div>
    </div>
  );
}