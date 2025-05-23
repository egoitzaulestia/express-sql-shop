const express = require("express");
const router = express.Router();
const db = require("../config/database");

// GET ALL USERS
router.get("/", (req, res) => {
  const sql = `SELECT * FROM user;`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// GET ALL USERS with ORDERS
router.get("/with-orders", (req, res) => {
  const sql = `
    SELECT 
      u.username,
      o.created_at AS order_date,
      o.total AS total_price
    FROM user AS u
    INNER JOIN orders AS o
    ON u.id = o.user_id`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(err);
    res.send(result);
  });
});

// ADD USER (by POST method)
router.post("/create-user", (req, res) => {
  const { username, email } = req.body;
  const sql = `
    INSERT INTO user (username, email)
    VALUES (?, ?);`;

  db.query(sql, [username, email], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ message: "New user registered successfully", result });
  });
});

// UPDATE USER (by PUT method)
router.put("/id/:id", (req, res) => {
  const userId = req.params.id;
  const { username, email } = req.body;
  const sql = `
    UPDATE user 
    SET username = ?, email = ?
    WHERE id = ?;`;

  db.query(sql, [username, email, userId], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ message: `User ${userId} has been updated.`, result });
  });
});

module.exports = router;
