const express = require("express");
// const mongoose = require("mongoose");
const session = require("express-session");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "infrastructure_management",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

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

route(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
