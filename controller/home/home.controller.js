const User = require("../../model/user.model");

module.exports.index = async (req, res)=>{
  const userId = req.params.id;
  console.log(userId);
  res.render("home/pages/index.pug",{
    title: "Home Page",
    userId: userId
  });
}

module.exports.issue = (req, res) =>{
  res.render("home/pages/issue.pug",{
    title: "Report Issue Page"
  });
};

module.exports.reportIssue = (req, res) =>{
  res.render("home/pages/reportIssue.pug",{
    title: "Báo cáo sự cố"
  });
};

module.exports.warehouse = (req, res)=>{
  res.render("home/pages/warehouse.pug")
}
module.exports.evaluate = (req, res) =>{
  res.render("home/pages/evaluate.pug")
};

// const user = {
//   name: "Huynh Dich",
//   email: "dichhuynh54@gmail.com",
//   password: "12344",
//   role: "tech_elec",
//   address: "Hanoi",
//   avatar: "avatar.png",
//   status: "active"
// }
module.exports.setAccount = async (req, res) =>{
  const userId = req.params.id;
  
  if (userId !== req.session.userId.toString()) {
    return res.status(403).send({ message: "Unauthorized access" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  res.render("home/pages/setAccount.pug",{
    title: "Trang thiết lập tài khoản",
    user: user
  });
};