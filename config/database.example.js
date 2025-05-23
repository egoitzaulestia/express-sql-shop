const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "your_host",
  user: "your_user",
  password: "your_password",
  database: "your_database",
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to MYSQL:", err.message);
  } else {
    console.log("Connected to MySQL database.");
  }
});

module.exports = db;
