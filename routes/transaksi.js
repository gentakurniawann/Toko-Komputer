// import express
const express = require('express');
const app = express();
app.use(express.json());

// import model
const models = require('../models/index');
const transaksi = models.transaksi;
const detail_transaksi = models.detail_transaksi;

//import auth
const auth = require("../auth")
app.use(auth)

//Endpoint untuk menampilkan semua data transaksi
app.get("/", async (req, res) =>{
    let result = await transaksi.findAll({
        include: [
            "customer",
            {
                model: models.detail_transaksi,
                as : "detail_transaksi",
                include: ["product"]    
            }
        ]
    })
    res.json(result)
})
module.exports = app