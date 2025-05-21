const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const PORT = 3000;
app.use(express.json());

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

// ADD CATEGORY (by POST method)
app.post("/categories", (req, res) => {
  const newCategory = req.body.name;
  const sql = `INSERT INTO category (name) 
    VALUES ('${newCategory}')`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ message: "New category added correctly", result });
  });
});

// ADD PRODUCT (by POST method)
app.post("/products", (req, res) => {
  const newProduct = {
    category_id: req.body.category_id,
    name: req.body.name,
    price: req.body.price,
  };

  const sql = `INSERT INTO product (category_id, name, price)
    VALUES (${newProduct.category_id}, '${newProduct.name}', ${newProduct.price});`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ message: "Product added correctly", result });
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
    res.send(`Product ${productId} has been updated...`);
  });
});

// UPDATE CATEGORY (by PUT method)
app.put("categories/id/:id", (req, res) => {
  const productId = req.params.id;
  const { name } = req.body;
  const sql = `UPDATE category SET
    name = '${name}'
    WHERE id = ${productId};`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Category ${productId} has been updated`);
  });
});

// GET ALL P (product)
app.get("/products", (req, res) => {
  const sql = `SELECT * FROM product;`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// GET ALL C (categories)
app.get("/categories", (req, res) => {
  const sql = `SELECT * FROM category;`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// GET ALL PC (products with their categoríes)
app.get("/productsWithCategories", (req, res) => {
  const sql = `SELECT 
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

// GET PRODUCT by ID
app.get("/products/:id", (req, res) => {
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

// GET CATEGORY by ID
app.get("/categories/:id", (req, res) => {
  const productId = req.params.id;
  const sql = `SELECT * 
    FROM category 
    WHERE id = ${productId}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
