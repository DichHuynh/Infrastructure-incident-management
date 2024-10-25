const express = require("express");

const app = express();

const port = 3000;

const route = require("./routes/home/index.route.js");

app.set("views",`${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

route(app);

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
});