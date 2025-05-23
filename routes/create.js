const express = require("express");
const router = express.Router();
const CreateController = require("../controllers/CreateController");

//////////////////////////////////////
// CREATE DATABASE and DROP DATABASE

// CREATE DATABASE route to create the database
router.get("/database", CreateController.createDatabase);

// DROP DATABASE route to drop the database
router.get("/drop-database", CreateController.dropDatabase);

/////////////////////////////////
// CREATE TABLES and DROP TABLE

// CREATE TABLE 'category'
router.get("/table-category", CreateController.createTableCategory);

// CREATE TABLE 'product'
router.get("/table-product", CreateController.createTableProduct);

// CREATE TABLE 'user'
router.get("/table-user", CreateController.createTableUser);

// CREATE TABLE 'orders'
router.get("/table-orders", CreateController.createTableOrders);

// // CREATE TABLE 'order_productt' => (orderS + product)
router.get("/table-order-product", CreateController.createTableOrderProduct);

// DROP TABLE
router.get("/dropTable/:table", CreateController.dropTable);

module.exports = router;
