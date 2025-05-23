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

db.connect((err) => {
  if (err) {
    console.log("Error connecting to MYSQL:", err.message);
    // process.exit(1)
  } else {
    console.log("Connected to MySQL database.");
  }
});

app.use("/create", require("./routes/create"));
app.use("/categories", require("./routes/categories"));
app.use("/products", require("./routes/products"));
app.use("/users", require("./routes/users"));
app.use("/orders", require("./routes/orders"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
