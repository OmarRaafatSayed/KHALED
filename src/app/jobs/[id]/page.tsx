'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Job } from '@/types/marketplace'
import JobDetailHeader from '@/components/jobs/JobDetailHeader'
import JobDescription from '@/components/jobs/JobDescription'
import JobSidebar from '@/components/jobs/JobSidebar'
import ApplicationModal from '@/components/jobs/ApplicationModal'

export default function JobDetailPage() {
  const { id } = useParams()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [showApplicationModal, setShowApplicationModal] = useState(false)

  useEffect(() => {
    // Mock job data - replace with API call
    const mockJob: Job = {
      id: id as string,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      companyLogo: '/company-logo.png',
      location: 'Cairo, Egypt',
      type: 'full-time',
      salary: '15,000 - 25,000 EGP',
      description: 'We are looking for a skilled Frontend Developer to join our dynamic team...',
      requirements: [
        '3+ years of React/Next.js experience',
        'Strong TypeScript skills',
        'Experience with Tailwind CSS',
        'Knowledge of state management (Redux/Zustand)'
      ],
      benefits: ['Health insurance', 'Flexible working hours', 'Remote work options'],
      postedAt: '2024-01-15',
      expiresAt: '2024-02-15',
      applications: 45
    }
    
    setTimeout(() => {
      setJob(mockJob)
      setLoading(false)
    }, 1000)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h1>
          <p className="text-gray-600">The job you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JobDetailHeader job={job} onApply={() => setShowApplicationModal(true)} />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <JobDescription job={job} />
          </div>
          
          <div className="lg:col-span-1">
            <JobSidebar job={job} />
          </div>
        </div>

        {/* Sticky Apply Button for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden">
          <button
            onClick={() => setShowApplicationModal(true)}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>

      {showApplicationModal && (
        <ApplicationModal
          job={job}
          onClose={() => setShowApplicationModal(false)}
        />
      )}
    </div>
  )
}