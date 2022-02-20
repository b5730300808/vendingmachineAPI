const express = require('express')
const router = express.Router()
const MoneyStock = require('./moneystock')
const moneystock = new MoneyStock()
// define the home page route

router.get('/GetMoneyStock', async function(req, res, next) {
    try{
        const moneytotal = await moneystock.GetMoneyStock();
        res.status(200).json(moneytotal);  
    }
    catch(e){
        res.status(200).json(e);  
    }
});
router.post('/UpdateMoneyStock', async function(req, res, next) {
    try{
        const value = req.body;
        console.log('UpdateMoneyStock:',value)
        const moneytotal = await moneystock.UpdateMoneyStock(value);
        res.status(200).json(moneytotal);  
    }
    catch(e){
        res.status(200).json(e);  
    }
});
module.exports = router