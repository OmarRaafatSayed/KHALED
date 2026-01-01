'use client';

import { MapPin, Clock, DollarSign, Building, Users, Calendar } from 'lucide-react';

interface JobHeaderProps {
  job: {
    title: string;
    company: string;
    logo: string;
    location: string;
    type: string;
    salary: string;
    postedDate: string;
    applicants: number;
    deadline: string;
  };
}

export default function JobHeader({ job }: JobHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div className="flex items-start gap-6">
        <img
          src={job.logo}
          alt={job.company}
          className="w-20 h-20 rounded-lg object-cover border border-gray-200"
        />
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <Building className="text-gray-500" size={18} />
            <span className="text-lg text-gray-700 font-medium">{job.company}</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-500" />
              <span>{job.location}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-green-500" />
              <span>{job.type}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-yellow-500" />
              <span>{job.salary}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users size={16} className="text-purple-500" />
              <span>{job.applicants} متقدم</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>نُشر في {new Date(job.postedDate).toLocaleDateString('ar-SA')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>آخر موعد: {new Date(job.deadline).toLocaleDateString('ar-SA')}</span>
            </div>
          </div>
        </div>
        
        <div className="text-left">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
            تقدم الآن
          </button>
          <p className="text-xs text-gray-500 mt-2">تقديم سريع وآمن</p>
        </div>
      </div>
    </div>
  );
}