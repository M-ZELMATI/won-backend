const express = require('express');
const { connectDB } = require('./db');
const { getTotalSell,getTrandingProduct,getQuantityByCategorie,getProductsBySallesQuantity } = require('./Services');
const { initializeDatabase } = require('./FillInDbByCsv');
const cors = require('cors');

const app = express();
const port = 8080;

connectDB();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));


app.get('/analytics/total_sales', async (req, res) => {
    try{
    res.json(await getTotalSell(req.query?.start,req.query?.end));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed database' });
    }
});


app.get('/analytics/trending_products', async (req, res) => {
    try{
        res.json(await getTrandingProduct(req.query?.start,req.query?.end));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed trending_products' });
    }
});


app.get('/analytics/category_sales', async (req, res) => {
    try{
        res.json(await getQuantityByCategorie(req.query?.start,req.query?.end));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed category_sales' });
    }
});



app.get('/products', async (req, res) => {
    try{
        res.json(await getProductsBySallesQuantity(req.query?.start,req.query?.end));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed products' });
    }
});

app.get('/initialisation', async (req, res) => {

    try{
        res.json(await initializeDatabase());
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed initialisation' });
    }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
