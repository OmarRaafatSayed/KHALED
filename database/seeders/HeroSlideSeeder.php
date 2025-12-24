<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HeroSlide;

class HeroSlideSeeder extends Seeder
{
    public function run(): void
    {
        $slides = [
            [
                'title' => 'From Local Shop to Online Empire',
                'subtitle' => 'How Ahmed\'s Electronics grew 500% in 6 months',
                'description' => 'Ahmed started with a small electronics shop in Cairo. With our marketplace, he now serves customers across Egypt and exports internationally.',
                'image' => 'hero-slides/electronics-success.jpg',
                'business_name' => 'Ahmed Electronics',
                'business_logo' => 'hero-slides/logos/ahmed-electronics.jpg',
                'button_text' => 'Visit Store',
                'button_url' => '#',
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'title' => 'Handmade Dreams Come True',
                'subtitle' => 'Fatma\'s crafts reached 10,000+ customers',
                'description' => 'Traditional Egyptian handicrafts made by Fatma are now loved by customers worldwide through our platform.',
                'image' => 'hero-slides/handicrafts-success.jpg',
                'business_name' => 'Fatma Handicrafts',
                'business_logo' => 'hero-slides/logos/fatma-handicrafts.jpg',
                'button_text' => 'Shop Now',
                'button_url' => '#',
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'title' => 'Fashion Forward Success',
                'subtitle' => 'Modern designs, traditional quality',
                'description' => 'Sara\'s fashion boutique combines contemporary style with Egyptian craftsmanship, attracting fashion lovers globally.',
                'image' => 'hero-slides/fashion-success.jpg',
                'business_name' => 'Sara Fashion',
                'business_logo' => 'hero-slides/logos/sara-fashion.jpg',
                'button_text' => 'Explore Collection',
                'button_url' => '#',
                'is_active' => true,
                'sort_order' => 3
            ],
            [
                'title' => 'Organic Growth Story',
                'subtitle' => 'From farm to table, naturally',
                'description' => 'Mohamed\'s organic farm products now reach health-conscious families across the Middle East.',
                'image' => 'hero-slides/organic-success.jpg',
                'business_name' => 'Green Valley Organics',
                'business_logo' => 'hero-slides/logos/green-valley.jpg',
                'button_text' => 'Shop Organic',
                'button_url' => '#',
                'is_active' => true,
                'sort_order' => 4
            ],
            [
                'title' => 'Tech Innovation Hub',
                'subtitle' => 'Bringing cutting-edge tech to everyone',
                'description' => 'Omar\'s tech startup creates innovative solutions that are now used by thousands of businesses.',
                'image' => 'hero-slides/tech-success.jpg',
                'business_name' => 'TechFlow Solutions',
                'business_logo' => 'hero-slides/logos/techflow.jpg',
                'button_text' => 'Learn More',
                'button_url' => '#',
                'is_active' => true,
                'sort_order' => 5
            ]
        ];

        foreach ($slides as $slideData) {
            HeroSlide::firstOrCreate(['business_name' => $slideData['business_name']], $slideData);
        }
    }
}