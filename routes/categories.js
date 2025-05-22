const express = require("express");
const router = express.Router();
const db = require("../config/database");

// GET CATEGORY BY ID
router.get("/:id", (req, res) => {
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

module.exports = router;
