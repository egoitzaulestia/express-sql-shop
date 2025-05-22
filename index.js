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

//////////////////////////////////////
// CREATE DATABASE and DROP DATABASE

// CREATE DATABASE endpoint to create the database
app.get("/create-database", (req, res) => {
  const dbName = "expressSqlShopDB";
  const sql = `CREATE DATABASE ${dbName}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Database ${dbName} created successfully...`);
  });
});

// DROP DATABASE endpoint to erase the database
app.get("/drop-database", (req, res) => {
  const dbName = "expressSqlShopDB";
  const sql = `DROP DATABASE ${dbName}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`The ${dbName} database has been erased...`);
  });
});

/////////////////////////////////
// CREATE TABLES and DROP TABLE

// CREATE TABLE 'category'
app.get("/create-category-table", (req, res) => {
  const sql = `
  CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
  ) ENGINE=InnoDB`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Table category has been created.`);
  });
});

// CREATE TABLE 'product'
app.get("/create-product-table", (req, res) => {
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
app.get("/create-user-table", (req, res) => {
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
app.get("/create-orders-table", (req, res) => {
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
app.get("/create-order-product-table", (req, res) => {
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
app.get("/dropTable/:table", (req, res) => {
  const tableName = req.params.table;
  const sql = `DROP TABLE ${tableName}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Table ${tableName} has been deleted.`);
  });
});

//////////////
// ADD STUFF

// ADD CATEGORY (by POST method)
app.post("/categories", (req, res) => {
  const newCategory = req.body.name;
  const sql = `INSERT INTO category (name) 
    VALUES ('${newCategory}')`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ message: "New category added successfully.", result });
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

// ADD USER (by POST method)
app.post("/users", (req, res) => {
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

// ADD ORDER (by POST method)
app.post("/orders", (req, res) => {
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

/////////////////
// UPDATE STUFF

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
    res.send({ message: `Category ${productId} has been updated.`, result });
  });
});

// UPDATE USER (by PUT method)
app.put("/users/id/:id", (req, res) => {
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

////////////
// GET ALL

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

// GET ALL USERS
app.get("/users", (req, res) => {
  const sql = `SELECT * FROM user;`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// GET ALL ORDERS
app.get("/orders", (req, res) => {
  const sql = `SELECT * FROM orders;`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

////////////////////////////
// GET ALL with INNER JOIN

// GET ALL PRODUCTS with CATEGORIES
app.get("/products-with-categories", (req, res) => {
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

// GET ALL USERS with ORDERS
app.get("/users-with-orders", (req, res) => {
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

//////////////
// GET BY ID

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

// GET ALL P (product) DESC
app.get("/products/order/by-price-desc", (req, res) => {
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
app.get("/products/name/:name", (req, res) => {
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

/////////////////
// DLEETE BY ID

// DELETE product
app.delete("/products/:id", (req, res) => {
  const productId = +req.params.id;
  const sql = `DELETE FROM product 
    WHERE id = ${productId}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ message: `Product ${productId} has been deleted.` });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
