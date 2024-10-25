module.exports.index = (req, res)=>{
  res.render("home/pages/index.pug",{
    title: "Home Page"
  });
}
module.exports.signUp = (req, res) =>{
  res.render("home/pages/signUp.pug",{
    title: "Sign Up Page"
  });
};
module.exports.signIn = (req, res)=>{
  res.render("home/pages/signIn.pug",{
    title: "Sign Up Page"
  });
}
module.exports.reportIssue = (req, res) =>{
  res.render("home/pages/issue.pug",{
    title: "Report Issue Page"
  });
};
module.exports.search = (req, res)=>{
  res.send("trang tra cứu thông tin");
}
module.exports.evaluate = (req, res) =>{
  res.send("Trang đánh giá dịch vụ");
};
const technician = {
  name: "Nguyễn Văn A",
  email: "Acong",
  password: "12345",
  address: "Hà Nội",
  avatar: "avatar.png",
  status: 'active'
};
module.exports.setAccount = (req, res) =>{
  res.render("home/pages/setAccount.pug",{
    title: "Trang thiết lập tài khoản",
    technician: technician
  });
};