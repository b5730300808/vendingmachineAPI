const express = require('express')
const bodyParser = require('body-parser')
const stock = require('./firebase/stock/router')
const money = require('./firebase/money/router')
const moneystock = require('./firebase/moneystock/router')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 9000
app.use(bodyParser.json({ limit: '50gb' }))
app.use(cors())
app.use(bodyParser.urlencoded({limit: '50gb',extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World 111')
})
app.use('/Money',money)
app.use('/MoneyStock',moneystock)
app.use('/Stock',stock)
app.listen(PORT, () => {
  console.log(`Start server at port ${PORT}.`)
})
