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

// GET USER BY ID
router.get("/id/:id", (req, res) => {
  const userId = req.params.id;
  const sql = `SELECT * FROM user WHERE id = ?`;

  db.query(sql, [userId], (err, result) => {
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

// DELETE USER BY ID
router.delete("/:id", (req, res) => {
  const userId = req.params.id;

  const sqlDeleteOrders = `DELETE FROM orders WHERE user_id = ?;`;
  const sqlDeleteUser = `DELETE FROM user WHERE id = ?;`;

  // We delete any order (due to RESTRICT in table creation)
  db.query(sqlDeleteOrders, [userId], (err1, result1) => {
    if (err1) throw err1;
    console.log(result1);

    // We delete the user
    db.query(sqlDeleteUser, [userId], (err2, result2) => {
      if (err2) throw err2;
      console.log(result2);
      res.send({
        message: `User ${userId} and their orders have been deleted.`,
        ordersDeleted: result1.affectedRows,
        userDeleted: result2.affectedRows,
      });
    });
  });
});

module.exports = router;
