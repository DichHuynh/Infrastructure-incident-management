const userRoutes = require("./userHome.route.js");
const adminRoutes = require("./adminHome.route.js");
const techRoutes = require("./techHome.route.js");
const homeFirst = require("./homeFirst.route.js");
module.exports = (app)=>{
  app.use("/", homeFirst);
  app.use("/user/home", userRoutes);
  app.use("/admin/home", adminRoutes);
  app.use("/tech/home", techRoutes);
}