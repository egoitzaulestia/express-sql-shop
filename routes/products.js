const express = require("express");
const router = express.Router();
const db = require("../config/database");

// GET ALL PRODUCTS
router.get("/", (req, res) => {
  const sql = `SELECT * FROM product;`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// ADD PRODUCT (by POST method)
router.post("/create", (req, res) => {
  const { category_id, name, price } = req.body;
  const sql = `
    INSERT INTO product (category_id, name, price)
    VALUES ( ?, ?, ? );`;

  db.query(sql, [category_id, name, price], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ message: "New product added successfully.", result });
  });
});

// UPDATE PRODUCT (by PUT method)
router.put("/id/:id", (req, res) => {
  const productId = +req.params.id;
  const { category_id, name, price } = req.body;
  const sql = `UPDATE product SET 
    category_id = ${category_id}, 
    name = '${name}', 
    price = ${price}
    WHERE id = ${productId};`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ message: `Product ${productId} has been updated.`, result });
  });
});

// GET ALL PRODUCTS with CATEGORIES
router.get("/with-categories", (req, res) => {
  const sql = `
    SELECT 
      p.name AS product_name,
      c.name AS category_name,
      p.price
    FROM product AS p
    INNER JOIN category AS c
    ON c.id = p.category_id
    `;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// GET PRODUCT BY ID
router.get("/:id", (req, res) => {
  const productId = req.params.id;
  const sql = `SELECT * 
    FROM product 
    WHERE id = ${productId}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// GET ALL PRODUCTS DESC
router.get("/order/by-price-desc", (req, res) => {
  const sql = `SELECT * 
    FROM product
    ORDER BY price
    DESC;`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// GET product by name
router.get("/name/:name", (req, res) => {
  const productName = req.params.name;
  const sql = `SELECT * 
    FROM product 
    WHERE name = '${productName}'`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// DELETE PRODUCT BY ID
router.delete("/:id", (req, res) => {
  const productId = +req.params.id;
  const sql = `DELETE FROM product 
    WHERE id = ${productId}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ message: `Product ${productId} has been deleted.` });
  });
});

module.exports = router;
