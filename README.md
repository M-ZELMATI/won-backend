# won-backend

![Database Schema](https://github.com/M-ZELMATI/won-backend/blob/main/Capture%20d'%C3%A9cran%202024-12-04%20215014.png)
![Application Structure](https://github.com/M-ZELMATI/won-backend/blob/main/Capture%20d'%C3%A9cran%202024-12-04%20215029.png)

## Overview

**won-backend** is an analytics API server built with Node.js and Express. It provides endpoints for analyzing sales data, fetching trending products, and visualizing sales by categories. The database is initialized and populated using a CSV file.

---

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/M-ZELMATI/won-backend.git


### Configure Your `.env` File

Update a `.env` file in the root directory and configure it with your SQL database information:

DB_HOST=localhost DB_PORT=3306 DB_USER=root DB_PASSWORD=tftftf DB_NAME=won


## Project Setup

### Install Dependencies

npm install


### Run the Server

Compile and start the server with:

node .\server.js


## Database Initialization

### Populate Your Dataset

To create the database tables (`products` and `sales`) and populate them with data from a CSV file, execute the following endpoint:

GET: http://localhost:8080/initialisation



Verify that the database and tables have been successfully created by checking your SQL database.

---

## API Documentation

### Base URL

http://localhost:8080

sql
Copier le code

### Endpoints

1. **GET /analytics/total_sales**  
   Returns the total sales amount for a selected period.  

   - **Query Parameters:**  
     - `start`  : Start date (YYYY-MM-DD).  
     - `end`  : End date (YYYY-MM-DD).  

   - **Response Example:**  
     ```
     { "totalSales": 12345.67 }
     ```

2. **GET /analytics/trending_products**  
   Returns the top 3 best-selling products.  

   - **Query Parameters:**  
     - `start`  : Start date (YYYY-MM-DD).  
     - `end`  : End date (YYYY-MM-DD).  

   - **Response Example:**  
     ```
     [
       { "productName": "Product A", "quantitySold": 100, "totalSales": 5000.00 },
       { "productName": "Product B", "quantitySold": 80, "totalSales": 4000.00 },
       { "productName": "Product C", "quantitySold": 50, "totalSales": 2500.00 }
     ]
     ```

3. **GET /analytics/category_sales**  
   Returns sales distribution by category.  

   - **Query Parameters:**  
     - `start`  : Start date (YYYY-MM-DD).  
     - `end`  : End date (YYYY-MM-DD).  

   - **Response Example:**  
     ```
     [
       { "category": "Electronics", "salesCount": 200, "percentage": 40 },
       { "category": "Clothing", "salesCount": 150, "percentage": 30 }
     ]
     ```

4. **GET /products**  
   Returns all products with their sales quantities.  

   - **Query Parameters:**  
     - `start`  : Start date (YYYY-MM-DD).  
     - `end`  : End date (YYYY-MM-DD).  

   - **Response Example:**  
     ```
     [
       { "productName": "Product A", "salesQuantity": 100 },
       { "productName": "Product B", "salesQuantity": 80 }
     ]
     ```

5. **GET /initialisation**  
   Initializes the database by creating tables and populating them with data from the CSV file.  

   - **Response Example:**  
     ```
     { "message": "Database initialized successfully" }
     ```

---

## Features

- **Analytics:**  
  Gain insights into sales trends and product performance.

- **Database Initialization:**  
  Simplified process to set up and populate the database using a CSV file.

- **CORS Support:**  
  Configured to allow requests from `http://localhost:5173`.

---

## Development

Feel free to customize and enhance the project. Contributions are welcome!

Run the server with live reload  
npm install nodemon -g nodemon .\server.js
