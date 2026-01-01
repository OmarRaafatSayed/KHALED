'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Slide {
  id: number
  title: string
  subtitle: string
  image: string
  buttonText: string
  buttonLink: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'عروض الجمعة البيضاء',
    subtitle: 'خصومات تصل إلى 70% على جميع المنتجات',
    image: '/api/placeholder/600/400',
    buttonText: 'تسوق الآن',
    buttonLink: '/deals'
  },
  {
    id: 2,
    title: 'أحدث الهواتف الذكية',
    subtitle: 'اكتشف أحدث التقنيات بأفضل الأسعار',
    image: '/api/placeholder/600/400',
    buttonText: 'اكتشف المزيد',
    buttonLink: '/products?category=electronics'
  },
  {
    id: 3,
    title: 'أزياء العصر',
    subtitle: 'مجموعة جديدة من الأزياء العصرية',
    image: '/api/placeholder/600/400',
    buttonText: 'تصفح الأزياء',
    buttonLink: '/products?category=fashion'
  }
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-96 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex h-full">
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-bold text-gray-900">{slide.title}</h2>
                <p className="text-xl text-gray-600 max-w-md">{slide.subtitle}</p>
                <Button size="lg" className="px-8 py-3">
                  {slide.buttonText}
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary-50/50"></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
      >
        <ChevronLeft className="h-6 w-6 text-gray-700" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
      >
        <ChevronRight className="h-6 w-6 text-gray-700" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-primary' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}