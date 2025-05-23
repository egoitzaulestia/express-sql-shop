const express = require("express");
const router = express.Router();
const db = require("../config/database");

// ADD ORDER (by POST method)
router.post("/create", (req, res) => {
  const { user_id, total } = req.body;
  const sql = `
    INSERT INTO orders (user_id, total)
    VALUES (?, ?)`;

  db.query(sql, [user_id, total], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ message: "New order registered successfully", result });
  });
});

module.exports = router;
