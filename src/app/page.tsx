import CategorySidebar from '@/components/home/CategorySidebar'
import MobileCategoryMenu from '@/components/home/MobileCategoryMenu'
import HeroSlider from '@/components/home/HeroSlider'
import FlashDeals from '@/components/home/FlashDeals'
import FeaturedCategories from '@/components/home/FeaturedCategories'
import FeaturedBrands from '@/components/home/FeaturedBrands'
import NewArrivals from '@/components/home/NewArrivals'
import ServiceFeatures from '@/components/home/ServiceFeatures'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-6">
        {/* Mobile Category Menu */}
        <div className="lg:hidden mb-4">
          <MobileCategoryMenu />
        </div>

        {/* Hero Section with Sidebar */}
        <div className="flex gap-6 mb-8">
          {/* Category Sidebar - Desktop Only */}
          <div className="hidden lg:block">
            <CategorySidebar />
          </div>
          
          {/* Hero Slider */}
          <div className="flex-1">
            <HeroSlider />
          </div>
        </div>

        {/* Service Features */}
        <ServiceFeatures />

        {/* Flash Deals */}
        <FlashDeals />

        {/* Featured Categories */}
        <FeaturedCategories />

        {/* New Arrivals */}
        <NewArrivals />

        {/* Featured Brands */}
        <FeaturedBrands />
      </div>
    </div>
  )
}