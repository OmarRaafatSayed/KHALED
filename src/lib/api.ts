const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  review_count: number;
  in_stock: boolean;
  stock_count: number;
  vendor: string;
}

export interface CartItem {
  id: string;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  vendor: string;
}

export interface Order {
  id?: number;
  user_id: number;
  items: CartItem[];
  shipping_address: any;
  payment_method: string;
  total: number;
  status: string;
}

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Products
  async getProducts(filters?: any): Promise<Product[]> {
    const params = new URLSearchParams(filters);
    return this.request(`/products?${params}`);
  }

  async getProduct(id: number): Promise<Product> {
    return this.request(`/products/${id}`);
  }

  // Cart
  async addToCart(item: CartItem): Promise<any> {
    return this.request('/cart', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  async getCart(): Promise<CartItem[]> {
    return this.request('/cart');
  }

  async updateCartItem(id: string, quantity: number): Promise<any> {
    return this.request(`/cart/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(id: string): Promise<any> {
    return this.request(`/cart/${id}`, {
      method: 'DELETE',
    });
  }

  // Orders
  async createOrder(order: Order): Promise<any> {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async getOrders(): Promise<Order[]> {
    return this.request('/orders');
  }

  async getOrder(id: number): Promise<Order> {
    return this.request(`/orders/${id}`);
  }
}

export const apiService = new ApiService();