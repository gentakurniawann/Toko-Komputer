const express = require('express');
const cors  = require('cors');

const app = express();
app.use(cors());

//import endpoint diletakkan disini
const admin = require('./routes/admin')
app.use('/store/admin', admin)

app.listen(8080, () => {
    console.log("server run on port 8080");
})

//endpoint customer
const customer = require('./routes/customer');
app.use("/customer", customer)

//endpoint product
const product = require('./routes/product');
app.use("/product", product)