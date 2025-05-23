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
};

module.exports = CreateController;
