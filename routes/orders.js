const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderControllers");

// GET ALL ORDERS
router.get("/", OrderController.getAll);

// ADD ORDER (by POST method)
router.post("/create", OrderController.create);

module.exports = router;
