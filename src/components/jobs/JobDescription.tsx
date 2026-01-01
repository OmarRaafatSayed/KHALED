import { Job } from '@/types/marketplace'
import { CheckIcon } from '@heroicons/react/24/outline'

interface JobDescriptionProps {
  job: Job
}

export default function JobDescription({ job }: JobDescriptionProps) {
  return (
    <div className="space-y-6">
      {/* Job Description */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
        <ul className="space-y-3">
          {job.requirements.map((requirement, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{requirement}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Benefits */}
      {job.benefits && job.benefits.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits</h2>
          <ul className="space-y-3">
            {job.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}