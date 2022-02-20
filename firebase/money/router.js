const express = require('express')
const router = express.Router()
const Money = require('./money')
const money = new Money()
// define the home page route

router.get('/GetMoney', async function(req, res, next) {
    try{
        const moneytotal = await money.GetMoney();
        res.status(200).json(moneytotal);  
    }
    catch(e){
        res.status(200).json(e);  
    }
});
router.post('/AddMoney', async function(req, res, next) {
    try{
        const value = req.body;
        const allmoney = await money.AddMoney(value);
        res.status(200).json(allmoney);  
    }
    catch(e){
        res.status(200).json(e);  
    }
});
router.get('/ReturnCashBack', async function(req, res, next) {
    try{
        const allmoney = await money.ReCashBack();
        res.status(200).json(allmoney);  
    }
    catch(e){
        res.status(200).json(e);  
    }
});
router.post('/BuyMenu', async function(req, res, next) {
    try{
        const value = req.body;
        const respone = await money.BuyMenu(value);
        res.status(200).json(respone);  
    }
    catch(e){
        res.status(200).json(e);  
    }
});

module.exports = router