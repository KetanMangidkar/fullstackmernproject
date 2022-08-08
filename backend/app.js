const express = require("express");

const app = express();
app.use(express.json());

const productsController = require("./src/controllers/productController");

app.use("/products", productsController);

module.exports = app;
