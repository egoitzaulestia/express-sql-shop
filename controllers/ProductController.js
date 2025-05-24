const db = require("../config/database");

const ProductController = {
  getAll(req, res) {
    const sql = `SELECT * FROM product;`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.status(200).send(result);
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
      res
        .status(201)
        .send({ message: "New product added successfully.", result });
    });
  },

  update(req, res) {
    const productId = +req.params.id;
    const { category_id, name, price } = req.body;

    // First, we check if the product exists
    const checkSql = `SELECT * FROM product WHERE id = ?`;

    db.query(checkSql, [productId], (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        // Product does not exist
        return res
          .status(404)
          .send({ message: `Product ${productId} does not exist.` });
      }

      // Product exists, proceed to update
      const updateSql = `
      UPDATE product SET
        category_id = ?,
        name = ?,
        price = ?
      WHERE id = ?;
    `;
      db.query(
        updateSql,
        [category_id, name, price, productId],
        (err, updateResult) => {
          if (err) throw err;
          res.status(200).send({
            message: `Product ${productId} has been updated.`,
            result: updateResult,
          });
        }
      );
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
      res.status(200).send(result);
    });
  },

  getById(req, res) {
    const productId = +req.params.id;
    const sql = `SELECT * 
    FROM product 
    WHERE id = ${productId}`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.status(200).send(result);
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
      res.status(200).send(result);
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
      res.status(200).send(result);
    });
  },

  delete(req, res) {
    const productId = +req.params.id;
    const sql = `DELETE FROM product 
    WHERE id = ${productId}`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res
        .status(200)
        .send({ message: `Product ${productId} has been deleted.` });
    });
  },
};

module.exports = ProductController;
