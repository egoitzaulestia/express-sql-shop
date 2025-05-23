const db = require("../config/database");

const OrderController = {
  create(req, res) {
    const { user_id, total } = req.body;
    const sql = `
    INSERT INTO orders (user_id, total)
    VALUES (?, ?)`;

    db.query(sql, [user_id, total], (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send({ message: "New order registered successfully", result });
    });
  },

  getAll(req, res) {
    const sql = `SELECT * FROM orders;`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  },
};

module.exports = OrderController;
