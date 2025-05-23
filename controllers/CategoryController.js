const db = require("../config/database");

const CategoryController = {
  create(req, res) {
    const newCategory = req.body.name;
    const sql = `INSERT INTO category (name) 
    VALUES ('${newCategory}')`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send({ message: "New category added successfully.", result });
    });
  },
};

module.exports = CategoryController;
