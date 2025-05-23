const express = require("express");
const router = express.Router();
const db = require("../config/database");

// GET ALL ORDERS
router.get("/", (req, res) => {
  const sql = `SELECT * FROM orders;`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// GET USER BY ID
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const sql = `SELECT * FROM user WHERE id = ?`;

  db.query(sql, [userId], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

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
