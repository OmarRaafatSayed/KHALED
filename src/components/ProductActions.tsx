'use client';

import { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/hooks/useCart';
import { CartItem } from '@/types/cart';

interface ProductActionsProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    vendor: string;
  };
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCartStore();
  const router = useRouter();

  const handleBuyNow = () => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1
    };
    addItem(cartItem);
    router.push('/checkout');
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleBuyNow}
        className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
      >
        <ShoppingBag size={20} />
        اشتري الآن
      </button>
      
      <button
        onClick={toggleWishlist}
        className={`px-4 py-3 rounded-lg border-2 transition-colors ${
          isWishlisted 
            ? 'border-red-500 bg-red-50 text-red-600' 
            : 'border-gray-300 hover:border-red-300 text-gray-600'
        }`}
      >
        <Heart 
          size={20} 
          fill={isWishlisted ? 'currentColor' : 'none'}
        />
      </button>
    </div>
  );
}