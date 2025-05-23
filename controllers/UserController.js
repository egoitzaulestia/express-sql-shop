const db = require("../config/database");

const UserController = {
  getAll(req, res) {
    const sql = `SELECT * FROM user;`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  },
};

module.exports = UserController;
