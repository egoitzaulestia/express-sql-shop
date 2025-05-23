const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

// GET ALL CATEGORIES
router.get("/", CategoryController.getAll);

// GET CATEGORY BY ID
router.get("/id/:id", CategoryController.getById);

// ADD CATEGORY (by POST method)
router.post("/create", CategoryController.create);

// UPDATE CATEGORY (by PUT method)
router.put("/id/:id", CategoryController.updateCategory);

module.exports = router;
