'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Trash2 } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  dateApplied: string;
  status: 'pending' | 'interview' | 'rejected' | 'accepted';
}

const jobs: Job[] = [
  { id: '1', title: 'مطور ويب', company: 'شركة التقنية', dateApplied: '2024-01-15', status: 'interview' },
  { id: '2', title: 'مصمم UI/UX', company: 'شركة الإبداع', dateApplied: '2024-01-10', status: 'pending' },
  { id: '3', title: 'محلل بيانات', company: 'شركة البيانات', dateApplied: '2024-01-05', status: 'rejected' },
];

const statusConfig = {
  pending: { label: 'قيد المراجعة', color: 'bg-yellow-100 text-yellow-800' },
  interview: { label: 'مقابلة', color: 'bg-blue-100 text-blue-800' },
  rejected: { label: 'مرفوض', color: 'bg-red-100 text-red-800' },
  accepted: { label: 'مقبول', color: 'bg-green-100 text-green-800' },
};

export default function JobsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">مركز الوظائف</h1>
        <p className="text-gray-600">إدارة طلبات التوظيف والسيرة الذاتية</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">طلبات التوظيف</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الوظيفة</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الشركة</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ التقديم</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {job.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.dateApplied}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[job.status].color}`}>
                          {statusConfig[job.status].label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">إدارة السيرة الذاتية</h2>
          </div>
          <div className="p-6">
            {selectedFile ? (
              <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="text-green-600" size={24} />
                  <div>
                    <p className="font-medium text-green-800">{selectedFile.name}</p>
                    <p className="text-sm text-green-600">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                    <Download size={16} />
                    تحميل
                  </button>
                  <button 
                    onClick={() => setSelectedFile(null)}
                    className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                  >
                    <Trash2 size={16} />
                    حذف
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-600 mb-2">رفع السيرة الذاتية</h3>
                <p className="text-gray-500 text-sm mb-4">اختر ملف PDF أو Word</p>
                <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                  اختيار ملف
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}