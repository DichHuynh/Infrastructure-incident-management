const homeRoutes = require("./home.route.js");

module.exports = (app)=>{
  app.use("/", homeRoutes);
}