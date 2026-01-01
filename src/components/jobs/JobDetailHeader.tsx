import { Job } from '@/types/marketplace'
import { MapPinIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

interface JobDetailHeaderProps {
  job: Job
  onApply: () => void
}

export default function JobDetailHeader({ job, onApply }: JobDetailHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            {job.companyLogo && (
              <img
                src={job.companyLogo}
                alt={job.company}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <p className="text-lg text-blue-600 font-semibold mb-4">
                {job.company}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  <span className="capitalize">{job.type.replace('-', ' ')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CurrencyDollarIcon className="w-4 h-4" />
                  <span>{job.salary}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <button
            onClick={onApply}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors hidden lg:block"
          >
            Apply Now
          </button>
          
          <div className="text-sm text-gray-500 text-right">
            <p>Posted: {formatDate(job.postedAt)}</p>
            <p>{job.applications} applications</p>
          </div>
        </div>
      </div>
    </div>
  )
}