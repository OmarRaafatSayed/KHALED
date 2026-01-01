import { FAQCategory } from '@/types/marketplace'

interface FAQCategoriesProps {
  categories: FAQCategory[]
  selectedCategory: string | null
  onCategorySelect: (categoryId: string | null) => void
}

export default function FAQCategories({ categories, selectedCategory, onCategorySelect }: FAQCategoriesProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse by Category</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(selectedCategory === category.id ? null : category.id)}
            className={`p-6 rounded-xl border-2 transition-all hover:shadow-md ${
              selectedCategory === category.id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="text-3xl mb-2">{category.icon}</div>
            <h3 className="font-semibold text-sm">{category.name}</h3>
            <p className="text-xs text-gray-500 mt-1">
              {category.faqs.length} articles
            </p>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="text-center">
          <button
            onClick={() => onCategorySelect(null)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Show All Categories
          </button>
        </div>
      )}
    </div>
  )
}