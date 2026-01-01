'use client';

import { useState } from 'react';
import { Plus, Eye, Download, Users, Briefcase } from 'lucide-react';

interface JobPosting {
  id: number;
  title: string;
  department: string;
  applicants: number;
  status: 'active' | 'closed' | 'draft';
  postedDate: string;
}

interface Applicant {
  id: number;
  name: string;
  email: string;
  phone: string;
  experience: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
}

const jobPostings: JobPosting[] = [
  { id: 1, title: 'مطور واجهات أمامية', department: 'التقنية', applicants: 15, status: 'active', postedDate: '2024-01-15' },
  { id: 2, title: 'مختص تسويق رقمي', department: 'التسويق', applicants: 8, status: 'active', postedDate: '2024-01-10' },
  { id: 3, title: 'محاسب', department: 'المالية', applicants: 12, status: 'closed', postedDate: '2024-01-05' },
];

const applicants: Applicant[] = [
  { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', phone: '+966501234567', experience: '3 سنوات', appliedDate: '2024-01-16', status: 'pending' },
  { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', phone: '+966507654321', experience: '5 سنوات', appliedDate: '2024-01-15', status: 'shortlisted' },
];

export default function EmployerJobManagement() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applicants' | 'add'>('jobs');
  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    requirements: '',
  });

  const statusConfig = {
    active: { label: 'نشط', color: 'bg-green-100 text-green-800' },
    closed: { label: 'مغلق', color: 'bg-red-100 text-red-800' },
    draft: { label: 'مسودة', color: 'bg-gray-100 text-gray-800' },
    pending: { label: 'قيد المراجعة', color: 'bg-yellow-100 text-yellow-800' },
    reviewed: { label: 'تمت المراجعة', color: 'bg-blue-100 text-blue-800' },
    shortlisted: { label: 'مرشح', color: 'bg-green-100 text-green-800' },
    rejected: { label: 'مرفوض', color: 'bg-red-100 text-red-800' },
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'jobs' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Briefcase className="inline w-4 h-4 mr-2" />
              الوظائف المنشورة
            </button>
            <button
              onClick={() => setActiveTab('applicants')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'applicants' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="inline w-4 h-4 mr-2" />
              المتقدمين
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'add' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Plus className="inline w-4 h-4 mr-2" />
              إضافة وظيفة
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Jobs List */}
          {activeTab === 'jobs' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الوظيفة</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">القسم</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المتقدمين</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ النشر</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jobPostings.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{job.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{job.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{job.applicants} متقدم</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[job.status].color}`}>
                          {statusConfig[job.status].label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{job.postedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Applicants List */}
          {activeTab === 'applicants' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المتقدم</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الخبرة</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ التقديم</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applicants.map((applicant) => (
                    <tr key={applicant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{applicant.name}</div>
                          <div className="text-sm text-gray-500">{applicant.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{applicant.experience}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{applicant.appliedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[applicant.status].color}`}>
                          {statusConfig[applicant.status].label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye size={16} />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <Download size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Add Job Form */}
          {activeTab === 'add' && (
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الوظيفة</label>
                  <input
                    type="text"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">القسم</label>
                  <select
                    value={jobForm.department}
                    onChange={(e) => setJobForm({...jobForm, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">اختر القسم</option>
                    <option value="tech">التقنية</option>
                    <option value="marketing">التسويق</option>
                    <option value="finance">المالية</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الموقع</label>
                  <input
                    type="text"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نطاق الراتب</label>
                  <input
                    type="text"
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                    placeholder="مثال: 8000 - 12000 ريال"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">وصف الوظيفة</label>
                <textarea
                  value={jobForm.description}
                  onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المتطلبات</label>
                <textarea
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  حفظ كمسودة
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  نشر الوظيفة
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}