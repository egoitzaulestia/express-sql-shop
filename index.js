const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const PORT = 3000;
app.use(express());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// CREATE DATABASE endpoint to create the database
app.get("/createDatabase", (req, res) => {
  const dbName = "expressSqlShopDB";
  const sql = `CREATE DATABASE ${dbName}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Database ${dbName} created successfully...`);
  });
});

// DROP DATABASE endpoint to erase the database
app.get("/dropDB", (req, res) => {
  const dbName = "expressSqlShopDB";
  const sql = `DROP DATABASE ${dbName}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`The ${dbName} database has been erased...`);
  });
});

// CREATE TABLE 'category'
app.get("/createCategoryTable", (req, res) => {
  const sql = `
    CREATE TABLE category (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100)
        ) ENGINE=InnoDB`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Table category created...`);
  });
});

// CREATE TABLE 'product'
app.get("/createProductTable", (req, res) => {
  const sql = `
    CREATE TABLE product (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT,
        name VARCHAR(150), 
        price DECIMAL(10,2), 

        CONSTRAINT fk_productCategory
        FOREIGN KEY (category_id)
        REFERENCES category(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        ) ENGINE=InnoDB`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Table product created...`);
  });
});

// DROP TABLE
app.get("/dropTable/:table", (req, res) => {
  const tableName = req.params.table;
  const sql = `DROP TABLE ${tableName}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Table ${tableName} has been erased...`);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
