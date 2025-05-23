const db = require("../config/database");

const ProductController = {
  getAll(req, res) {
    const sql = `SELECT * FROM product;`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  },

  create(req, res) {
    const { category_id, name, price } = req.body;
    const sql = `
    INSERT INTO product (category_id, name, price)
    VALUES ( ?, ?, ? );`;

    db.query(sql, [category_id, name, price], (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send({ message: "New product added successfully.", result });
    });
  },

  updateProduct(req, res) {
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
  },

  getAllWithCategories(req, res) {
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
  },

  getById(req, res) {
    const productId = req.params.id;
    const sql = `SELECT * 
    FROM product 
    WHERE id = ${productId}`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  },

  orderByPriceDesc(req, res) {
    const sql = `SELECT * 
    FROM product
    ORDER BY price
    DESC;`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  },

  getByName(req, res) {
    const productName = req.params.name;
    const sql = `SELECT * 
    FROM product 
    WHERE name = '${productName}'`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  },

  deleteProduct(req, res) {
    const productId = +req.params.id;
    const sql = `DELETE FROM product 
    WHERE id = ${productId}`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send({ message: `Product ${productId} has been deleted.` });
    });
  },
};

module.exports = ProductController;
