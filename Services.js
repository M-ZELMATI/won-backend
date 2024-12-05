const { db } = require('./db');

async function getTotalSell(start,end) {
  try {
    

    const sql = `SELECT SUM(sales.Quantity * products.Price) AS TotalSales 
                 FROM sales
                 LEFT JOIN products ON products.ProductID = sales.ProductID
                 WHERE Date >= ? AND Date <= ?`;
                 
    const [results] = await db.promise().query(sql, [start, end]);
    return results[0];
    } catch (err) {
        throw new Error('Error fetching total sales: ' + err.message);
    }
  
}



async function getTrandingProduct(start,end) {
  try {
  const sql = `SELECT products.ProductName, products.ProductID, 
                      SUM(sales.Quantity * products.Price) AS Total, 
                      SUM(Quantity) AS TotalQuantity 
               FROM sales 
               LEFT JOIN products ON sales.ProductID = products.ProductID 

               WHERE Date >= ? AND Date <= ?
               GROUP BY ProductID, ProductName
               ORDER BY TotalQuantity DESC
               LIMIT 5`;

  
    const [results] = await db.promise().query(sql, [start, end]);
    return results;
  } catch (err) {
    throw new Error('Error in getTrandingProduct: ' + err);
  }
}


async function getTotalQuantity(start,end) {
  try{
  const sql = `SELECT SUM(Quantity) as TotalQuantity FROM sales
               LEFT JOIN products ON sales.ProductID = products.ProductID
               WHERE Date >= ? AND Date <= ?

               `;

  const [results] = await db.promise().query(sql,[start, end]);
  return results[0].TotalQuantity;
  } catch (err) {
    throw new Error('Error in getTotalQuantity: ' + err);
  }
}

async function getQuantityByCategorie(start, end) {
  try {
    const total = await getTotalQuantity(start, end); 
    const sql = `SELECT products.Category, SUM(Quantity) as TotalQuantity, 
                        (SUM(Quantity)/?) * 100 AS Percentage
                 FROM sales
                 LEFT JOIN products ON sales.ProductID = products.ProductID
                 WHERE Date >= ? AND Date <= ?

                 GROUP BY products.Category`;
    const [results] = await db.promise().query(sql,[total,start, end]);
    return results;
    } catch (err) {
      throw new Error('Error in getTotalQuantity: ' + err);
    }
    
}




async function getProductsBySallesQuantity(start, end) {
  try {
    const sql = `SELECT products.ProductName,products.Price,SUM(Quantity) as TotalQuantity FROM sales 
    LEFT JOIN products on sales.ProductID=products.ProductID
    WHERE Date >= ? AND Date <= ?
    GROUP By products.ProductName`;
    const [results] = await db.promise().query(sql,[start, end]);
    return results;
  } catch (err) {
    throw new Error('Error in getProductsBySallesQuantity: ' + err);
  }
   
  
}

module.exports = { getTotalSell,getTrandingProduct,getQuantityByCategorie,getProductsBySallesQuantity };