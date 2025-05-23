const db = require("../config/database");

const UserController = {
  create(req, res) {
    const { username, email } = req.body;
    const sql = `
    INSERT INTO user (username, email)
    VALUES (?, ?);`;

    db.query(sql, [username, email], (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send({ message: "New user registered successfully", result });
    });
  },

  update(req, res) {
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
  },

  getAll(req, res) {
    const sql = `SELECT * FROM user;`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  },

  getById(req, res) {
    const userId = req.params.id;
    const sql = `SELECT * FROM user WHERE id = ?`;

    db.query(sql, [userId], (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  },

  getAllWithOrders(req, res) {
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
  },

  // For this controller method we use 2 query:
  // First query: deletes any order of the user, if not the user cannot be deleted doe to the MySQL restriction we did when we created the 'orders' table
  // Second query: deletes the user eventually
  delete(req, res) {
    const userId = req.params.id;

    const sqlDeleteOrders = `DELETE FROM orders WHERE user_id = ?;`;
    const sqlDeleteUser = `DELETE FROM user WHERE id = ?;`;

    // We delete any order (due to RESTRICT in table creation)
    db.query(sqlDeleteOrders, [userId], (err1, result1) => {
      if (err1) throw err1;
      console.log(result1);

      // We delete the user
      db.query(sqlDeleteUser, [userId], (err2, result2) => {
        if (err2) throw err2;
        console.log(result2);
        res.send({
          message: `User ${userId} and their orders have been deleted.`,
          ordersDeleted: result1.affectedRows,
          userDeleted: result2.affectedRows,
        });
      });
    });
  },
};

module.exports = UserController;
