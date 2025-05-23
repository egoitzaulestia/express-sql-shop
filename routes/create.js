const express = require("express");
const router = express.Router();
const db = require("../config/database");
const CreateController = require("../controllers/CreateController");

//////////////////////////////////////
// CREATE DATABASE and DROP DATABASE

// CREATE DATABASE route to create the database
router.get("/database", CreateController.createDatabase);

// DROP DATABASE route to drop the database
router.get("/drop-database", CreateController.dropDatabase);

/////////////////////////////////
// CREATE TABLES and DROP TABLE

// CREATE TABLE 'category'
router.get("/table-category", CreateController.createTableCategory);

// CREATE TABLE 'product'
router.get("/table-product", (req, res) => {
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
    res.send(`Table product has been created.`);
  });
});

// CREATE TABLE 'user'
router.get("/table-user", (req, res) => {
  const sql = `
  CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(80),
    email VARCHAR(120)
  ) ENGINE=InnoDB`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Table user has been created.`);
  });
});

// CREATE TABLE 'orders'
router.get("/table-orders", (req, res) => {
  const sql = `
  CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,

    CONSTRAINT fk_order_user
      FOREIGN KEY (user_id)
      REFERENCES user(id)
      ON UPDATE CASCADE
      ON DELETE RESTRICT
  ) ENGINE=InnoDB`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Table orders has been created.`);
  });
});

// // CREATE TABLE 'order_productt' => (orderS + product)
router.get("/table-order-product", (req, res) => {
  const sql = `
    CREATE TABLE order_product (
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      price_each DECIMAL(10,2) NOT NULL,

      PRIMARY KEY (order_id, product_id),

      CONSTRAINT fk_op_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

      CONSTRAINT fk_op_product
        FOREIGN KEY (product_id)
        REFERENCES product(id)
        ON DELETE RESTRICT
    ) ENGINE=InnoDB;
  `;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Table order_product has been created.");
  });
});

// DROP TABLE
router.get("/dropTable/:table", (req, res) => {
  const tableName = req.params.table;
  const sql = `DROP TABLE ${tableName}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Table ${tableName} has been deleted.`);
  });
});

module.exports = router;
