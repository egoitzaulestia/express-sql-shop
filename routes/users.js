const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// GET ALL USERS
router.get("/", UserController.getAll);

// GET USER BY ID
router.get("/id/:id", UserController.getById);

// GET ALL USERS with ORDERS
router.get("/with-orders", UserController.getAllWithOrders);

// ADD USER (by POST method)
router.post("/create-user", UserController.create);

// UPDATE USER (by PUT method)
router.put("/id/:id", UserController.update);

// DELETE USER BY ID
router.delete("/:id", UserController.delete);

module.exports = router;
