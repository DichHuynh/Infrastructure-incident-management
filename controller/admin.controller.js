const Account = require("../model/accounts.model.js");
const Admin = require("../model/admin.model.js");

module.exports.index = async (req, res)=>{
  const userId = req.params.id;
  res.render("admin/AdminHome.pug",{
    title: "Admin Home",
    userId: userId
  });
  };

module.exports.setAccount = async (req, res) => {
  const userId = req.params.id;
  const admin = await Admin.findOne({
    where: { account_id: userId },
    include: {
      model: Account,
      required: true
    }
  });
  console.log(admin);
} 
