const express = require("express");
// const mongoose = require("mongoose");
const flash = require('express-flash');
const session = require("express-session");
const Sequelize = require("sequelize");
const methodOverride = require('method-override');
require('dotenv').config();

// const sequelize = new Sequelize(
//   "infrastructure_management",
//   "root",
//   "",
//   {
//     host: "localhost",
//     dialect: "mysql",
//   }
// );

// connect to MYSQL on clever cloud
const sequelize = new Sequelize(process.env.Connection_URL, {
  dialect: 'mysql',
  logging: console.log,
});

sequelize.authenticate().then(() => {
  console.log("Database connected");
  }).catch((err) => {
    console.log("Database connection failed", err);
});
// const database = async () => {
//   try {
//     await mongoose.connect("mongodb+srv://huynhdich54:huynhdich54@cluster0.y8sih.mongodb.net/infrastructure_management");
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.log("Error connecting to MongoDB", error);
//   }
// };

// Gọi hàm `database()` để thực hiện kết nối MongoDB
// database();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
//Sử dụng cho việc truy cập, gửi đi các API dạng json
app.use(express.json());

const route = require("./routes/home/index.route.js");

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(session({
  secret: "yourSecretKey",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set `true` if using HTTPS
}));
app.use(express.static(`${__dirname}/public`));
app.use(flash());

route(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
