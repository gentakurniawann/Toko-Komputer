const express = require('express');
const cors  = require('cors');

const app = express();
app.use(cors());

//import endpoint diletakkan disini
const admin = require('./routes/admin')
app.use('/admin', admin)

//endpoint customer
const customer = require('./routes/customer');
app.use("/customer", customer)

//endpoint product
const product = require('./routes/product');
app.use("/product", product)

//endpoint transaksi
const transaksi = require('./routes/transaksi');
app.use("/transaksi", transaksi)

app.listen(8080, () => {
    console.log("server run on port 8080");
})

app.use(express.static(__dirname))