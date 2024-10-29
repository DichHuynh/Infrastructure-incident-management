const User = require("../../model/user.model.js");

module.exports.home = async (req, res) => {
  res.render("homeFirst/homeFirst.pug", {
    title: "Trang quản lý cơ sở hạ tầng"
  });
};

module.exports.signUp = (req, res) => {
  res.render("homeFirst/signUp.pug", {
    title: "Sign Up Page"
  });
};

module.exports.signIn = (req, res) => {
  res.render("homeFirst/signIn.pug", {
    title: "Sign In Page"
  });
};

module.exports.signInPost = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Email không tồn tại" });
    }

    if (password !== user.password){
      return res.status(400).send({ message: "Sai mật khẩu" });
    }

    // Chuyển hướng về trang chủ sau khi đăng nhập thành công
    req.session.userId = user._id; // Save user ID to the session
    res.redirect(`/home/${user._id}`);

  } catch (error) {
    return res.status(500).send({ message: "Lỗi server" });
  }
};