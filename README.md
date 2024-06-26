# Product Management

## Description

This is a product management application that allows users to create product and orders and manage product inventory. It uses Node.js, Express, MongoDB, Mongoose, and TypeScript.

## Prerequisites

Make sure you have the following installed on your local machine:

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (either a local installation or a cloud instance)

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/mkmasudrana806/product-management-backend.git
    cd product-management-backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Configuration

1. Create a `.env` file in the root directory of your project.

2. Add the following environment variables to the `.env` file:

    ```env
    PORT=5000
    DATABASE_URL= your database url
    ```

    Replace the `MONGODB_URI` with your MongoDB connection string if you're using a cloud instance.

## Running the Application

1. Build the TypeScript files:

    ```bash
    npm run build
    ```

2. Start the application:

    ```bash
    tsc -w
    tsnd --respawn dist/server.js
    ```

    The server should now be running at `http://localhost:5000`.

## API Endpoints
- **Base Route**: `https://product-management-backend-three.vercel.app/`
### Create a New Product

- **Endpoint**: `/api/products`
- **Method**: `POST`
- **Sample Request Body**:

    ```json
    {
        "name": "iPhone 13",
        "description": "A sleek and powerful smartphone with cutting-edge features.",
        "price": 999,
        "category": "Electronics",
        "tags": ["smartphone", "Apple", "iOS"],
        "variants": [
            {
                "type": "Color",
                "value": "Midnight Blue"
            },
            {
                "type": "Storage Capacity",
                "value": "256GB"
            }
        ],
        "inventory": {
            "quantity": 50,
            "inStock": true
        }
    }
    ```

- **Sample Response**:

    ```json
    {
        "success": true,
        "message": "Product created successfully!",
        "data": {
            "name": "iPhone 13",
            "description": "A sleek and powerful smartphone with cutting-edge features.",
            "price": 999,
            "category": "Electronics",
            "tags": ["smartphone", "Apple", "iOS"],
            "variants": [
                {
                    "type": "Color",
                    "value": "Midnight Blue"
                },
                {
                    "type": "Storage Capacity",
                    "value": "256GB"
                }
            ],
            "inventory": {
                "quantity": 50,
                "inStock": true
            }
        }
    }
    ```

### Retrieve a List of All Products

- **Endpoint**: `/api/products`
- **Method**: `GET`
- **Sample Response**:

    ```json
    {
        "success": true,
        "message": "Products fetched successfully!",
        "data": [
            {
                "name": "iPhone 13",
                "description": "A sleek and powerful smartphone with cutting-edge features.",
                "price": 999,
                "category": "Electronics",
                "tags": ["smartphone", "Apple", "iOS"],
                "variants": [
                    {
                        "type": "Color",
                        "value": "Midnight Blue"
                    },
                    {
                        "type": "Storage Capacity",
                        "value": "256GB"
                    }
                ],
                "inventory": {
                    "quantity": 50,
                    "inStock": true
                }
            },
            {
                "name": "Samsung Galaxy S21",
                "description": "High-performance Android smartphone with advanced camera capabilities.",
                "price": 799,
                "category": "Electronics",
                "tags": ["smartphone", "Samsung", "Android"],
                "variants": [
                    {
                        "type": "Color",
                        "value": "Phantom Black"
                    },
                    {
                        "type": "Storage Capacity",
                        "value": "128GB"
                    }
                ],
                "inventory": {
                    "quantity": 30,
                    "inStock": true
                }
            }
            // Additional products can be added here...
        ]
    }
    ```

### Retrieve a Specific Product by ID

- **Endpoint**: `/api/products/:productId`
- **Method**: `GET`
- **Sample Response**:

    ```json
    {
        "success": true,
        "message": "Product fetched successfully!",
        "data": {
            "name": "iPhone 13",
            "description": "A sleek and powerful smartphone with cutting-edge features.",
            "price": 999,
            "category": "Electronics",
            "tags": ["smartphone", "Apple", "iOS"],
            "variants": [
                {
                    "type": "Color",
                    "value": "Midnight Blue"
                },
                {
                    "type": "Storage Capacity",
                    "value": "256GB"
                }
            ],
            "inventory": {
                "quantity": 50,
                "inStock": true
            }
        }
    }
    ```

### Update Product Information

- **Endpoint**: `/api/products/:productId`
- **Method**: `PUT`
- **Sample Request Body**:

    ```json
    {
        "name": "iPhone 13",
        "description": "A sleek and powerful smartphone with cutting-edge features.",
        "price": 999,
        "category": "Electronics",
        "tags": ["smartphone", "Apple", "iOS"],
        "variants": [
            {
                "type": "Color",
                "value": "Midnight Blue"
            },
            {
                "type": "Storage Capacity",
                "value": "256GB"
            }
        ],
        "inventory": {
            "quantity": 50,
            "inStock": true
        }
    }
    ```

- **Sample Response**:

    ```json
    {
        "success": true,
        "message": "Product updated successfully!",
        "data": {
            "name": "iPhone 13",
            "description": "A sleek and powerful smartphone with cutting-edge features.",
            "price": 999,
            "category": "Electronics",
            "tags": ["smartphone", "Apple", "iOS"],
            "variants": [
                {
                    "type": "Color",
                    "value": "Midnight Blue"
                },
                {
                    "type": "Storage Capacity",
                    "value": "256GB"
                }
            ],
            "inventory": {
                "quantity": 49,
                "inStock": true
            }
        }
    }
    ```

### Delete a Product

- **Endpoint**: `/api/products/:productId`
- **Method**: `DELETE`
- **Sample Response**:

    ```json
    {
        "success": true,
        "message": "Product deleted successfully!",
        "data": null
    }
    ```

### Search a Product

- **Endpoint**: `/api/products?searchTerm=iphone`
- **Method**: `GET`
- **Sample Response**:

    ```json
    {
        "success": true,
        "message": "Products matching search term 'iphone' fetched successfully!",
        "data": [
            {
                "name": "iPhone 13 Pro",
                "description": "The latest flagship iPhone model with advanced camera features.",
                "price": 999,
                "category": "Smartphones",
                "tags": ["iPhone", "Apple", "Mobile"],
                "variants": [
                    {
                        "type": "Color",
                        "value": "Graphite"
                    },
                    {
                        "type": "Storage",
                        "value": "256GB"
                    }
                ],
                "inventory": {
                    "quantity": 50,
                    "inStock": true
                }
            },
            {
                "name": "iPhone SE",
                "description": "Compact and affordable iPhone model with powerful performance.",
                "price": 399,
                "category": "Smartphones",
                "tags": ["iPhone", "Apple", "Mobile"],
                "variants": [
                    {
                        "type": "Color",
                        "value": "White"
                    },
                    {
                        "type": "Storage",
                        "value": "128GB"
                    }
                ],
                "inventory": {
                    "quantity": 20,
                    "inStock": true
                }
            }
        ]
    }
    ```

## Order Management

### Order Management API Endpoints

#### 1. Create a New Order
- **Endpoint**: `/api/orders`
- **Method**: `POST`
- **Request Body**:

    ```json
    {
        "email": "level2@programming-hero.com",
        "productId": "5fd67e890b60c903cd8544a3",
        "price": 999,
        "quantity": 1
    }
    ```

- **Response**:

    ```json
    {
        "success": true,
        "message": "Order created successfully!",
        "data": {
            "email": "level2@programming-hero.com",
            "productId": "5fd67e890b60c903cd8544a3",
            "price": 999,
            "quantity": 1
        }
    }
    ```

#### 2. Retrieve All Orders
- **Endpoint**: `/api/orders`
- **Method**: `GET`
- **Sample Response**:

    ```json
    {
        "success": true,
        "message": "Orders fetched successfully!",
        "data": [
            {
                "email": "level2@programming-hero.com",
                "productId": "5fd67e890b60c903cd8544a3",
                "price": 999,
                "quantity": 1
            }
            // more orders...
        ]
    }
    ```

#### 3. Retrieve Orders by User Email
- **Endpoint**: `/api/orders?email=level2@programming-hero.com`
- **Method**: `GET`
- **Sample Response**:

    ```json
    {
        "success": true,
        "message": "Orders fetched successfully for user email!",
        "data": [
            {
                "email": "level2@programming-hero.com",
                "productId": "5fd67e890b60c903cd8544a3",
                "price": 999,
                "quantity": 1
            }
            // more orders for the user...
        ]
    }
    ```


- **Description**: Creates a new order and reduces the product quantity in the inventory. If the ordered quantity exceeds the available quantity, it returns an error indicating insufficient stock.

## Development

### Folder Structure
- `dist/` - Contains output js files.
- `src/` - Contains all the source files.
  - `app/` - Contains the index.ts file for .evn configuration
  - `modules/` - Contains all the .ts files
      - `models/` - Contains the Mongoose schemas and models.
      - `routes/` - Contains the Express routes.
      - `controllers/` - Contains the controller logic for handling         requests.
      - `validation/` - Contains Zod validation schemas.
      - `index.ts` - The main entry point of the application.
  - `app.ts` - Contains application entry routes, middleware, parser, cors policy
  - `server.ts` - Contains server and database connection
 

## Deployment to Vercel

To deploy this application to Vercel, follow these steps:

1. **Ensure you have Vercel CLI installed**:
    ```sh
    npm install -g vercel
    ```

2. **Build your project**:
    ```sh
    npm run build
    ```

3. **Login to Vercel**:
    ```sh
    vercel login
    ```

4. **Deploy your project**:
    ```sh
    vercel --prod
    ```

    Follow the prompts provided by Vercel to complete the deployment.

5. **Re-Deployments**:
    - Delete .vercel folder from your project
    - then run fllowing
   ```sh
   vercel
   ```

### Vercel Configuration

Ensure you have a `vercel.json` file in the root of your project with the following content:

```json
{
    "version": 2,
    "builds": [
        {
            "src": "dist/server.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "dist/server.js"
        }
    ]
}
```

## Author

- Masud Rana
- [Email](masud.rana11311@gmail.com)
- [GitHub](https://github.com/mkmasudrana806)

