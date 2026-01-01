import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface HelpHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function HelpHeader({ searchQuery, onSearchChange }: HelpHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        How can we help you?
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Search our help center or browse categories below
      </p>
      
      <div className="max-w-2xl mx-auto relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for answers..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
      </div>
    </div>
  )
}