# Inventory Management API Documentation

This document provides details on the REST API endpoints for the Inventory Management Tool.

**Base URL**: `/api`

---

## Authentication

Most endpoints are protected and require a Bearer Token in the `Authorization` header.

1.  Register a user using the `POST /api/register` endpoint.
2.  Log in using the `POST /api/login` endpoint to receive an `access_token`.
3.  For all protected routes, include the following header:
    `Authorization: Bearer <your_access_token>`

---

## User Endpoints

### 1. Register User

Creates a new user account.

* **Method**: `POST`
* **URL**: `/api/register`
* **Authentication**: Not Required.

**Request Body (JSON):**
```json
{
    "username": "testuser",
    "password": "testpassword"
}
```

**Success Response (201 Created):**
```json
{
    "message": "User registered successfully"
}
```

**Error Response (409 Conflict):**
```json
{
    "error": "Username already exists"
}
```

### 2. Login User

Authenticates a user and returns a JWT access token.

* **Method**: `POST`
* **URL**: `/api/login`
* **Authentication**: Not Required.

**Request Body (JSON):**
```json
{
    "username": "testuser",
    "password": "testpassword"
}
```

**Success Response (200 OK):**
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401 Unauthorized):**
```json
{
    "error": "Invalid credentials"
}
```

---

---

## Product Endpoints

### 1. Add a New Product

Adds a new product to the inventory.

* **Method**: `POST`
* **URL**: `/api/products`
* **Authentication**: Required.

**Headers:**
```json
{
    "Authorization": "Bearer <your_access_token>"
}
```

**Request Body (JSON):**
```json
{
    "name": "Laptop",
    "type": "Electronics",
    "sku": "LPTP-001",
    "image_url": "[https://example.com/laptop.jpg](https://example.com/laptop.jpg)",
    "description": "A powerful new laptop",
    "quantity": 10,
    "price": 1200.50
}
```

**Success Response (201 Created):**
```json
{
    "message": "Product added successfully",
    "product_id": "60d5ec49e7a2a14e2c8a5e3a"
}
```

### 2. Get All Products

Retrieves a paginated list of all products.

* **Method**: `GET`
* **URL**: `/api/products`
* **Authentication**: Required.

**Headers:**
```json
{
    "Authorization": "Bearer <your_access_token>"
}
```

**Query Parameters**:
* `page` (optional, default: 1): The page number to retrieve.
* `limit` (optional, default: 10): The number of products per page.
* Example: `/api/products?page=2&limit=5`

**Success Response (200 OK):**
```json
[
    {
        "_id": "60d5ec49e7a2a14e2c8a5e3a",
        "name": "Laptop",
        "type": "Electronics",
        "quantity": 10,
        "price": 1200.50,
        ...
    }
]
```

### 3. Update Product Quantity

Updates the quantity of a specific product using its ID.

* **Method**: `PUT`
* **URL**: `/api/products/:id/quantity`
* **Authentication**: Required.

**Headers:**
```json
{
    "Authorization": "Bearer <your_access_token>"
}
```

**URL Parameter not params**:
* `:id` (required): The ID of the product to update.

**Request Body (JSON):**
```json
{
    "quantity": 25
}
```

**Success Response (200 OK):**
```json
{
    "_id": "60d5ec49e7a2a14e2c8a5e3a",
    "name": "Laptop",
    "type": "Electronics",
    "quantity": 25,
    "price": 1200.50,
    ...
}
```