# Inventory and Sales Management API
---

**Programming Language and Framework:** Node.js with Express,js

**Type of API Implemented:** RESTful

**Database used:** MongoDB

## 📋 Prerequisites

* **Node.js 14+** installed and on your `PATH`  
* **npm** (comes with Node.js)  
* **MongoDB Atlas** cluster with connection URI  
* **Git** (for cloning the repo)

---

## 🔧 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Amna9191/BackendTask-RestfulAPI.git
   cd admin-api
   
2. **Install the Dependencies**
   ```bash
   npm install
   
3. **Run the API server**
   ```bash
   npm start

The API server will be running at http://localhost:5000


## 🧩 Dependencies
Key dependencies managed in package.json include:

Express.js – web framework

Mongoose – MongoDB ODM

dotenv – environment variables loader

nodemon (dev dependency) – for development auto-reload

**The database has already been populated with demo data (used demoData.js which is provided in the folder)**

## 🚀 API Endpoints

All endpoints return JSON responses and are prefixed with `/api`.

### 📦 Inventory API

#### Inventory Management
- **Get inventory logs**
  - `GET /inventory/logs`
  - http://localhost:5000/api/inventory/logs
  - Retrieves all stock change records (newest first)
  - **Response Example:**
    ```json
    [
      {
        "productID": "TECH001",
        "previousStock": 20,
        "newStock": 15,
        "change": -5,
        "reason": "Restocked damaged goods",
        "timestamp": "2025-05-26T10:00:00Z"
      }
    ]
    ```

- **Get current inventory**  
  - `GET /inventory/status`
  - http://localhost:5000/api/inventory/status
  - Returns current stock levels for all products
  - **Response Example:**
    ```json
    [
      {
        "productID": "TECH001",
        "name": "Wireless Headphones",
        "category": "Electronics",
        "currentStock": 15
      }
    ]
    ```

- **Get low stock alerts**
  - `GET /inventory/lowStock?threshold=<number>`
  - http://localhost:5000/api/inventory/lowStock or http://localhost:5000/api/inventory/lowStock?threshold=
  - Returns products with stock below threshold (default: 10)
  - **Example:**
    ```
    /inventory/lowStock?threshold=5
    ```

- **Update inventory**  
  - `POST /inventory/update`
  - http://localhost:5000/api/inventory/updateInventory
  - Adjusts product stock levels
  - **Request Body:**
    ```json
    {
      "productID": "TECH001",
      "change": -5,
      "reason": "Restocked damaged goods"
    }
    ```

### 🛒 Sales API

#### Sales Operations
- **Get all sales**
  - `GET /sales/getSales`
  - http://localhost:5000/api/sales/getSales
  - Retrieves complete sales history (newest first)
  - **Response Example:**
    ```json
    [
      {
        "saleID": "SALE001",
        "productID": "TECH001",
        "quantity": 2,
        "totalPrice": 399.98,
        "saleDate": "2025-05-26T10:00:00Z"
      }
    ]
    ```

- **Create new sale**
  - `POST /sales/createSale`
  - http://localhost:5000/api/sales/createSale
  - Records a new transaction
  - **Request Body:**
    ```json
    {
      "productID": "TECH001",
      "quantity": 2,
      "totalPrice": 399.98
    }
    ```

#### Sales Analytics
- **Filter sales**
  - `POST /sales/filterSales`
  - http://localhost:5000/api/sales/filterSales
  - Queries sales by product/category/date range
  - **Request Body:**
    ```json
    {
      "productID": "TECH001",
      "startDate": "2025-01-01",
      "endDate": "2025-04-01"
    }
    ```

- **Revenue reports**
  - `GET /sales/dailyRevenue` - Daily sales (http://localhost:5000/api/sales/dailyRevenue)
  - `GET /sales/weeklyRevenuey` - Weekly sales (http://localhost:5000/api/sales/weeklyRevenue)  
  - `GET /sales/monthlyRevenue` - Monthly sales (http://localhost:5000/api/sales/monthlyRevenue)
  - `GET /sales/annualRevenue` - Annual sales (http://localhost:5000/api/sales/annualRevenue)
  - `GET /sales/categoryRevenue` - By category (http://localhost:5000/api/sales/categoryRevenue)

### 🛍 Products API

#### Product Operations
- **Get all products**
  - `GET /products/getProducts`
  - http://localhost:5000/api/products/getProducts
  - Lists all available products
  - **Response Example:**
    ```json
    [
      {
        "productID": "TECH001",
        "name": "Wireless Headphones",
        "price": 199.99,
        "stock": 50
      }
    ]
    ```
- **Get products by category**
  - `GET /products/getProductsBycategory/:categorys`
  - http://localhost:5000/api/products/getProductsBycategory/:category
  - Lists all available products for the category
  - **Example:**
    ```
    GET /product/getProductsBycategory/Tech
    ```
    Returns all products in Tech category
    

- **Get product details**
  - `GET /products/getProduct/:productID`
  - http://localhost:5000/api/products/getProduct/:productID
  - Returns full product information
  - **Example:**
    ```
    GET /products/getProduct/TECH001
    ```

- **Create product**
  - `POST /products/addProduct`
  - http://localhost:5000/api/products/addProduct
  - Adds new product to catalog
  - **Request Body:**
    ```json
    {
      "productID": "TECH007",
      "name": "Wireless Headphones",
      "price": 199.99,
      "stock": 50
    }
    ```

- **Update product**
  - `PUT /products/updateProduct/:productID`
  - http://localhost:5000/api/products/updateProduct/:productID
  - Modifies product details
  - **Request Body:**
    ```json
    {
      "price": 249.99,
      "stock": 45
    }
    ```

- **Delete product**
  - `DELETE /products/deleteProduct/:productID`
  - http://localhost:5000/api/products/deleteProduct/:productID
  - Removes product from system
  - **Response:**
    ```json
    {
      "status": "success",
      "message": "Product TECH001 deleted"
    }
    ```
