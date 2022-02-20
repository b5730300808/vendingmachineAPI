const express = require('express')
const router = express.Router()
const Stock = require('./stock')
const stock = new Stock()
// define the home page route
router.get('/Getstock', async function(req, res, next) {
    try{
        const allstock = await stock.GetStock();
        res.status(200).json(allstock);  
    }
    catch(e){
        res.status(200).json(e);  
    }
});
router.post('/AddStock', async function(req, res, next) {
    try{
        const value = req.body;
        const img = await stock.AddStock(value);
        res.status(200).json(img);  
    }
    catch(e){
        res.status(200).json(e);  
    }
});
router.post('/DeleteStock', async function(req, res, next) {
    try{
        const value = req.body;
        const img = await stock.DeleteStock(value);
        res.status(200).json(img);  
    }
    catch(e){
        res.status(200).json(e);  
    }
});
router.post('/EditStock', async function(req, res, next) {
    try{
        const value = req.body;
        const img = await stock.EditStock(value);
        res.status(200).json(img);  
    }
    catch(e){
        res.status(200).json(e);  
    }
});
// define the about route

module.exports = router