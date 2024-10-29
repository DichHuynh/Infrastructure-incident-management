const homeRoutes = require("./home.route.js");
const homeFirst = require("./homeFirst.route.js")
module.exports = (app)=>{
  app.use("/", homeFirst);
  app.use("/home", homeRoutes);
}