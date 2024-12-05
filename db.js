require('dotenv').config();  
const mysql2 = require('mysql2');

const db = mysql2.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});


const connectDB = () => {
  db.connect((err) => {
    if (err) {
      console.error('mysql2 connection error:', err);
      process.exit(1); 
    }
    console.log('mysql2 connected');
  });
};
    

module.exports = { connectDB, db };

