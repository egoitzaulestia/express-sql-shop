const express = require("express");
const router = express.Router();
const db = require("../config/database");

// CREATE DATABASE endpoint to create the database
router.get("/create-database", (req, res) => {
  const dbName = "expressSqlShopDB";
  const sql = `CREATE DATABASE ${dbName}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Database ${dbName} created successfully...`);
  });
});

module.exports = router;
