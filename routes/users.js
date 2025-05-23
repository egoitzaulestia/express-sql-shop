const express = require("express");
const router = express.Router();
const db = require("../config/database");

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

module.exports = router;
