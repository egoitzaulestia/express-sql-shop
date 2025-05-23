const express = require("express");
const router = express.Router();
const db = require("../config/database");
const OrderController = require("../controllers/OrderControllers");

// GET ALL ORDERS
router.get("/", OrderController.getAll);

// ADD ORDER (by POST method)
router.post("/create", OrderController.create);

module.exports = router;
