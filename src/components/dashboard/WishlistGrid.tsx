'use client';

import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  inStock: boolean;
}

const wishlistItems: WishlistItem[] = [
  {
    id: 1,
    name: 'هاتف ذكي سامسونج جالاكسي',
    price: 899,
    originalPrice: 999,
    image: '/api/placeholder/300/300',
    rating: 4.5,
    inStock: true,
  },
  {
    id: 2,
    name: 'سماعات لاسلكية',
    price: 199,
    image: '/api/placeholder/300/300',
    rating: 4.2,
    inStock: true,
  },
  {
    id: 3,
    name: 'ساعة ذكية',
    price: 299,
    originalPrice: 349,
    image: '/api/placeholder/300/300',
    rating: 4.7,
    inStock: false,
  },
];

export default function WishlistGrid() {
  const handleAddToCart = (item: WishlistItem) => {
    console.log('Add to cart:', item);
  };

  const handleRemoveFromWishlist = (itemId: number) => {
    console.log('Remove from wishlist:', itemId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlistItems.map((item) => (
        <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          <div className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <button
              onClick={() => handleRemoveFromWishlist(item.id)}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </button>
            {!item.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  غير متوفر
                </span>
              </div>
            )}
          </div>
          
          <div className="p-4">
            <h4 className="font-medium text-gray-800 mb-2 line-clamp-2">{item.name}</h4>
            
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="text-sm text-gray-500 mr-1">({item.rating})</span>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-gray-900">${item.price}</span>
              {item.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
              )}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => handleAddToCart(item)}
                disabled={!item.inStock}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  item.inStock
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={16} />
                أضف للسلة
              </button>
              <button
                onClick={() => handleRemoveFromWishlist(item.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {wishlistItems.length === 0 && (
        <div className="col-span-full text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">لا توجد عناصر في المفضلة</h3>
          <p className="text-gray-400">ابدأ بإضافة المنتجات التي تعجبك</p>
        </div>
      )}
    </div>
  );
}