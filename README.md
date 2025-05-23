# 🧩 Express.js & MySQL API Project

This is a backend project developed using **Node.js**, **Express.js**, and **MySQL**. It demonstrates how to build a RESTful API following the **MVC architecture**. The project includes endpoints for managing products, categories, users, and orders, and it interacts with a MySQL database.

> 🚧 README still in progress...

---

## 🚀 Tech Stack

- **Node.js** ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
- **Express.js** ![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
- **MySQL** ![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
- **Postman** ![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)
- **DBeaver** ![DBeaver](https://img.shields.io/badge/DBeaver-372923?logo=dbeaver&logoColor=white)
- **JavaScript** ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## 📌 Key Features

- RESTful API built with Express.js and Node.js
- Full CRUD operations for:
  - Products
  - Categories
  - Users
  - Orders
- Many-to-many relationship support (e.g., orders and products)
- MVC pattern applied
- Database interaction using MySQL
- Tested via Postman
- Modular structure with separated routes and controllers
- Secure DB config with `.env` and example files

---

## 🧱 Project Structure

📦 project-root
├── 📁 config

│ ├── database.js # DB connection (with envirinment variables credentials)

│ └── database.example.js # Template without credentials

├── 📁 controllers

│ ├── ProductController.js

│ ├── CategoryController.js

│ ├── UserController.js

│ └── OrderController.js

├── 📁 routes

│ ├── products.js

│ ├── categories.js

│ ├── users.js

│ └── orders.js

├── 📄 .env.example # Template without envirinment variables credentials

├── 📁 node_modules

├── 📄 app.js # Main server entrypoint

├── 📄 package.json # Dependencies & scripts

└── 📄 README.md # Project overview
