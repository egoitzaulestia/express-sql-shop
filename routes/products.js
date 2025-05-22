const express = require("express");
const router = express.Router();
const db = require("../config/database");

// GET ALL P (product)
app.get("/products", (req, res) => {
  const sql = `SELECT * FROM product;`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// ADD PRODUCT (by POST method)
app.post("/products", (req, res) => {
  const newProduct = {
    category_id: req.body.category_id,
    name: req.body.name,
    price: req.body.price,
  };

  const { category_id, name, price } = req.body;

  const sql = `
    INSERT INTO product (
      category_id, 
      name, 
      price
    )
    VALUES (
      ${newProduct.category_id}, 
      '${newProduct.name}', 
      ${newProduct.price}
    );`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ message: "New product added successfully.", result });
  });
});

// UPDATE PRODUCT (by PUT method)
app.put("/products/id/:id", (req, res) => {
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
