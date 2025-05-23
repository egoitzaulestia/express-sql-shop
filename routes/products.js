const express = require("express");
const router = express.Router();
const db = require("../config/database");
const ProductController = require("../controllers/ProductController");

// GET ALL PRODUCTS
router.get("/", ProductController.getAll);

// ADD PRODUCT (by POST method)
router.post("/create", ProductController.create);

// UPDATE PRODUCT (by PUT method)
router.put("/id/:id", ProductController.updateProduct);

// GET ALL PRODUCTS with CATEGORIES
router.get("/with-categories", ProductController.getAllWithCategories);

// GET PRODUCT BY ID
router.get("/id/:id", ProductController.getById);

// GET ALL PRODUCTS DESC
router.get("/order/by-price-desc", ProductController.orderByPriceDesc);

// GET PRODUCT BY NAME
router.get("/name/:name", ProductController.getByName);

// DELETE PRODUCT BY ID
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
