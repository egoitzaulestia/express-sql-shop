const express = require("express");
const router = express.Router();
const db = require("../config/database");
const CategoryController = require("../controllers/CategoryController");

// GET ALL CATEGORIES
router.get("/", (req, res) => {
  const sql = `SELECT * FROM category;`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// GET CATEGORY BY ID
router.get("/id/:id", (req, res) => {
  const productId = req.params.id;
  const sql = `SELECT * 
    FROM category 
    WHERE id = ${productId}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// ADD CATEGORY (by POST method)
router.post("/create", CategoryController.create);

// UPDATE CATEGORY (by PUT method)
router.put("/id/:id", (req, res) => {
  const productId = req.params.id;
  const { name } = req.body;
  const sql = `UPDATE category SET
    name = '${name}'
    WHERE id = ${productId};`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ message: `Category ${productId} has been updated.`, result });
  });
});

module.exports = router;
