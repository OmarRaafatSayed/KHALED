# TailAdmin Marketplace API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication
The API uses Laravel Sanctum for authentication. Include the token in the Authorization header:
```
Authorization: Bearer {token}
```

## Response Format
All API responses follow this format:
```json
{
    "success": true|false,
    "message": "Response message",
    "data": {...},
    "errors": {...} // Only on error responses
}
```

## Paginated Responses
```json
{
    "success": true,
    "message": "Success message",
    "data": [...],
    "pagination": {
        "current_page": 1,
        "last_page": 5,
        "per_page": 20,
        "total": 100,
        "from": 1,
        "to": 20
    }
}
```

---

## Authentication Endpoints

### Register
```http
POST /register
```
**Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "role": "customer|vendor"
}
```

### Login
```http
POST /login
```
**Body:**
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

### Logout
```http
POST /logout
```
**Headers:** `Authorization: Bearer {token}`

### Get Current User
```http
GET /me
```
**Headers:** `Authorization: Bearer {token}`

---

## Products Endpoints

### Get Products (Public)
```http
GET /v1/products
```
**Query Parameters:**
- `category_id` - Filter by category
- `vendor_id` - Filter by vendor
- `search` - Search in name/description
- `min_price` - Minimum price filter
- `max_price` - Maximum price filter
- `sort_by` - Sort field (price, created_at, name)
- `sort_order` - Sort direction (asc, desc)
- `per_page` - Items per page (default: 20)

### Get Single Product (Public)
```http
GET /v1/products/{id}
```

### Get Featured Products (Public)
```http
GET /v1/products/featured
```

### Search Products (Public)
```http
GET /v1/products/search?q={query}
```

### Get Categories (Public)
```http
GET /v1/categories
```

---

## Orders Endpoints (Protected)

### Get User Orders
```http
GET /v1/orders
```
**Headers:** `Authorization: Bearer {token}`

### Get Single Order
```http
GET /v1/orders/{id}
```
**Headers:** `Authorization: Bearer {token}`

### Create Order
```http
POST /v1/orders
```
**Headers:** `Authorization: Bearer {token}`
**Body:**
```json
{
    "items": [
        {
            "product_id": 1,
            "quantity": 2,
            "variant_id": null
        }
    ],
    "shipping_address": {
        "name": "John Doe",
        "phone": "+1234567890",
        "address": "123 Main St",
        "city": "New York",
        "country": "USA"
    },
    "payment_method": "credit_card"
}
```

### Cancel Order
```http
PATCH /v1/orders/{id}/cancel
```
**Headers:** `Authorization: Bearer {token}`

---

## Reviews Endpoints

### Get Product Reviews (Public)
```http
GET /v1/products/{productId}/reviews
```

### Create Review (Protected)
```http
POST /v1/reviews
```
**Headers:** `Authorization: Bearer {token}`
**Body:**
```json
{
    "product_id": 1,
    "rating": 5,
    "title": "Great product!",
    "comment": "I love this product...",
    "images": ["file1", "file2"]
}
```

### Update Review (Protected)
```http
PATCH /v1/reviews/{id}
```
**Headers:** `Authorization: Bearer {token}`

### Delete Review (Protected)
```http
DELETE /v1/reviews/{id}
```
**Headers:** `Authorization: Bearer {token}`

### Get My Reviews (Protected)
```http
GET /v1/my-reviews
```
**Headers:** `Authorization: Bearer {token}`

---

## Vendor Endpoints (Protected - Vendor Role)

### Get Vendor Dashboard
```http
GET /v1/vendor/dashboard
```
**Headers:** `Authorization: Bearer {token}`

### Get Vendor Profile
```http
GET /v1/vendor/profile
```
**Headers:** `Authorization: Bearer {token}`

### Update Vendor Profile
```http
PATCH /v1/vendor/profile
```
**Headers:** `Authorization: Bearer {token}`
**Body:**
```json
{
    "store_name": "My Store",
    "store_description": "Best store ever",
    "phone": "+1234567890",
    "address": "123 Store St",
    "city": "New York",
    "country": "USA"
}
```

### Get Vendor Products
```http
GET /v1/vendor/products
```
**Headers:** `Authorization: Bearer {token}`
**Query Parameters:**
- `status` - Filter by status (active, draft, pending)

### Create Product
```http
POST /v1/vendor/products
```
**Headers:** `Authorization: Bearer {token}`
**Body:** (multipart/form-data)
```json
{
    "name": "Product Name",
    "category_id": 1,
    "description": "Product description",
    "short_description": "Short description",
    "price": 99.99,
    "compare_price": 129.99,
    "quantity": 100,
    "images": ["file1", "file2"]
}
```

### Update Product
```http
PATCH /v1/vendor/products/{id}
```
**Headers:** `Authorization: Bearer {token}`

### Get Vendor Orders
```http
GET /v1/vendor/orders
```
**Headers:** `Authorization: Bearer {token}`
**Query Parameters:**
- `status` - Filter by status

### Update Order Status
```http
PATCH /v1/vendor/orders/{id}/status
```
**Headers:** `Authorization: Bearer {token}`
**Body:**
```json
{
    "status": "confirmed|processing|shipped|delivered"
}
```

---

## Error Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Example Error Response
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "email": ["The email field is required."],
        "password": ["The password field is required."]
    }
}
```