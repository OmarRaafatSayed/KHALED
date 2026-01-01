'use client';

import { useState } from 'react';
import { Search, MapPin, DollarSign, Briefcase } from 'lucide-react';

const jobCategories = [
  'تقنية المعلومات',
  'التسويق',
  'المبيعات',
  'الموارد البشرية',
  'المحاسبة',
  'الهندسة',
  'التصميم',
];

const locations = [
  'الرياض',
  'جدة',
  'الدمام',
  'مكة المكرمة',
  'المدينة المنورة',
  'عن بُعد',
];

const employmentTypes = [
  'دوام كامل',
  'دوام جزئي',
  'عن بُعد',
  'تدريب',
  'مؤقت',
];

export default function JobFilters() {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    employmentType: '',
    salaryMin: '',
    salaryMax: '',
  });

  return (
    <div className="w-80 bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">فلترة الوظائف</h3>
      
      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">البحث</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="ابحث عن وظيفة..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Briefcase className="inline w-4 h-4 mr-1" />
          التخصص
        </label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({...filters, category: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">جميع التخصصات</option>
          {jobCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MapPin className="inline w-4 h-4 mr-1" />
          الموقع
        </label>
        <select
          value={filters.location}
          onChange={(e) => setFilters({...filters, location: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">جميع المواقع</option>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Employment Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">نوع الوظيفة</label>
        <div className="space-y-2">
          {employmentTypes.map(type => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="mr-2 text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <DollarSign className="inline w-4 h-4 mr-1" />
          نطاق الراتب
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="من"
            value={filters.salaryMin}
            onChange={(e) => setFilters({...filters, salaryMin: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="إلى"
            value={filters.salaryMax}
            onChange={(e) => setFilters({...filters, salaryMax: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
        تطبيق الفلاتر
      </button>
    </div>
  );
}