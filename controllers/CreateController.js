const db = require("../config/database");

const CreateController = {
  createDatabase(req, res) {
    const dbName = "expressSqlShopDB";
    const sql = `CREATE DATABASE ${dbName}`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(`Database ${dbName} created successfully...`);
    });
  },

  dropDatabase(req, res) {
    const dbName = "expressSqlShopDB";
    const sql = `DROP DATABASE ${dbName}`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(`The ${dbName} database has been erased...`);
    });
  },

  createTableCategory(req, res) {
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
  },

  createTableProduct(req, res) {
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
  },

  createTableUser(req, res) {
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
  },

  createTableOrders(req, res) {
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
  },

  createTableOrderProduct(req, res) {
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
  },

  dropTable(req, res) {
    const tableName = req.params.table;
    const sql = `DROP TABLE ${tableName}`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(`Table ${tableName} has been deleted.`);
    });
  },
};

module.exports = CreateController;
