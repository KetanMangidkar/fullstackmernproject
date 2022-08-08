const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();

//Create Product-- Admin access
router.post("/new", async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).send({ products: product });
  } catch (error) {
    res.status(500).send({ message: "error" });
  }
});

//Get All Products
router.get("/", async (req, res) => {
  try {
    const product = await Product.find().lean().exec();
    res.status(200).send({ products: product });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//Get Products Details by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean().exec();
    return res.status(200).send({ products: product });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//Update Product-- Admin access
router.put("/:id", async (req, res, next) => {
  try {
    let product = await Product.findById({ _id: req.params.id });
    if (!product) {
      res.status(500).send({ error: error.message });
    }
    product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    )
      .lean()
      .exec();
    return res.status(200).send({ products: product });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    return res.status(200).send("Delete sucessfully");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
