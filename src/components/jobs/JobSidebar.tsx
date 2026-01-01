import { Job } from '@/types/marketplace'
import { BuildingOfficeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'

interface JobSidebarProps {
  job: Job
}

export default function JobSidebar({ job }: JobSidebarProps) {
  // Mock similar jobs data
  const similarJobs: Job[] = [
    {
      id: '2',
      title: 'React Developer',
      company: 'StartupXYZ',
      location: 'Alexandria, Egypt',
      type: 'full-time',
      salary: '12,000 - 18,000 EGP',
      description: '',
      requirements: [],
      postedAt: '2024-01-10',
      expiresAt: '2024-02-10',
      applications: 23
    },
    {
      id: '3',
      title: 'UI/UX Designer',
      company: 'DesignHub',
      location: 'Remote',
      type: 'contract',
      salary: '8,000 - 15,000 EGP',
      description: '',
      requirements: [],
      postedAt: '2024-01-12',
      expiresAt: '2024-02-12',
      applications: 31
    }
  ]

  return (
    <div className="space-y-6">
      {/* Company Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">About Company</h3>
        
        <div className="flex items-center gap-3 mb-4">
          {job.companyLogo && (
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
          <div>
            <h4 className="font-semibold text-gray-900">{job.company}</h4>
            <p className="text-sm text-gray-600">Technology Company</p>
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <BuildingOfficeIcon className="w-4 h-4" />
            <span>50-200 employees</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4" />
            <span>Cairo, Egypt</span>
          </div>
        </div>

        <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          View Company Profile
        </button>
      </div>

      {/* Similar Jobs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Similar Jobs</h3>
        
        <div className="space-y-4">
          {similarJobs.map((similarJob) => (
            <div key={similarJob.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer">
              <h4 className="font-semibold text-gray-900 mb-1">{similarJob.title}</h4>
              <p className="text-sm text-blue-600 mb-2">{similarJob.company}</p>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                <div className="flex items-center gap-1">
                  <MapPinIcon className="w-3 h-3" />
                  <span>{similarJob.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-3 h-3" />
                  <span className="capitalize">{similarJob.type.replace('-', ' ')}</span>
                </div>
              </div>
              
              <p className="text-sm font-medium text-gray-900">{similarJob.salary}</p>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 text-blue-600 font-medium hover:text-blue-700 transition-colors">
          View All Similar Jobs
        </button>
      </div>
    </div>
  )
}