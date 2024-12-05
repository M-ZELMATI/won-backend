const fs = require('fs');
const csv = require('csv-parser');
const { db } = require('./db');

function importCsvData() {
  const dataProducts = [];
  const dataSales = [];

  fs.createReadStream("./dataset/products.csv")
    .pipe(csv())
    .on('data', (row) => {
      const { ProductID,ProductName, Category,Price } = row;
      dataProducts.push({ ProductID, ProductName, Category, Price });
    })
    .on('end', () => {
      insertProductsData(dataProducts);
    });


  fs.createReadStream('./dataset/sales.csv')
    .pipe(csv())
    .on('data', (row) => {
      const {SaleID, ProductID,Quantity, Date, TotalAmount } = row;
      dataSales.push({ SaleID, ProductID,Quantity, Date,TotalAmount });
    })
    .on('end', () => {
      
      insertSalesData(dataSales);
    });
}


function insertProductsData(data) {
  const insertQuery = 'INSERT INTO products (ProductID, ProductName, Category, Price) VALUES (?, ?, ?, ?)';
  
  const productPromises = data.map((row) => {

    return new Promise((resolve, reject) => {
      
      const { ProductID, ProductName, Category, Price } = row;
      
      db.query(insertQuery, [ProductID, ProductName, Category, Price], (err, results) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        resolve(results);
      });
    });
    
  });

  Promise.all(productPromises)
    .then(() => {
    })
    .catch((err) => {
      console.error(err);
    });
}

function insertSalesData(data) {
  const insertQuery = 'INSERT INTO sales (SaleID, ProductID, Quantity, Date, TotalAmount) VALUES (?, ?, ?, ?, ?)';
  
  const salesPromises = data.map((row) => {
    return new Promise((resolve, reject) => {
      const { SaleID, ProductID, Quantity, Date, TotalAmount } = row;
      db.query(insertQuery, [SaleID, ProductID, Quantity, Date, TotalAmount], (err, results) => {
        if (err) {
          console.error('Error inserting sales:', err);
          return reject(err);
        }
        resolve(results);
      });
    });
  });

  Promise.all(salesPromises)
    .then(() => {
    })
    .catch((err) => {
      console.error( err);
    });
}


async function checkIfTableHasNotData(tableName) {
  const query = `SELECT COUNT(*) AS count FROM ${tableName}`;
  
  try {
    const [results] = await db.promise().query(query);

    if (results[0].count <= 0) {
      return true;
    } 
  } catch (err) {
    console.error(err);
    return false;
  }
}


async function CreateTables(){
  await db.promise().query(`CREATE TABLE IF NOT EXISTS products (
    ProductID INT(9) PRIMARY KEY NOT NULL,
    ProductName VARCHAR(19) DEFAULT NULL,  
    Category VARCHAR(17) DEFAULT NULL, 
    Price FLOAT DEFAULT NULL 
  );`);

  await db.promise().query(`CREATE TABLE IF NOT EXISTS sales (
     SaleID INT(6) PRIMARY KEY NOT NULL, 
     ProductID INT(9), 
     Quantity INT(8) DEFAULT NULL,  
     Date DATE DEFAULT NULL, 
     TotalAmount FLOAT DEFAULT NULL, 

     FOREIGN KEY (ProductID) REFERENCES products(ProductID)
  );`);
}

const initializeDatabase = async () => {
  try {
    await CreateTables();
    if(checkIfTableHasNotData("products") &&  checkIfTableHasNotData("sales")){
      await importCsvData();  
    }
  } catch (error) {
    console.error('Error during database setup:', error);
  } 
};

module.exports = { initializeDatabase };
