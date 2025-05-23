const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const PORT = 3000;
app.use(express.json());

app.use("/create", require("./routes/create"));
app.use("/categories", require("./routes/categories"));
app.use("/products", require("./routes/products"));
app.use("/users", require("./routes/users"));
app.use("/orders", require("./routes/orders"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
