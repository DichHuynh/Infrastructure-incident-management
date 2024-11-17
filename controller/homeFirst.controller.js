const Accounts = require ("../model/accounts.model.js");
const User = require ("../model/user.model.js");


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

module.exports.signUpPost = async (req, res) => {
  try {
    const { name, email, password, address, avatar } = req.body;
    const account_type = "User"; 

    // Check if the email already exists
    const existingAccount = await Accounts.findOne({ where: { email } });
    if (existingAccount) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create the new account
    const account = await Accounts.create({
      email,
      password, 
      avatar,
      account_type,
      status: "Active", // Set the default status
    });
    
    // After creating account, create the new user
    const user = await User.create({
      name,
      account_id: account.account_id, 
      address,
      avatar,
      user_id: `user_${account.account_id}` 
    });

    // Return user home
    return res.redirect(`/user/home/${account.account_id}`);
  } catch (error) {
    console.error("Error creating account or user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
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
  const account = await Accounts.findOne({ where: { email } }); 

  if (!account) {
    return res.status(400).send({ message: "Email không tồn tại" });
  }

  if (password !== account.password) {
    return res.status(400).send({ message: "Sai mật khẩu" });
  }

  // Chuyển hướng về trang chủ sau khi đăng nhập thành công
  req.session.accountId = account.account_id; // Lưu ID người dùng vào session
  console.log(req.session.accountId);
  // res.redirect(`/home/${user.user_id}`);

  switch (account.account_type) {
    case 'Admin':
      return res.redirect(`/admin/home/${account.account_id}`);
    case 'User':
      return res.redirect(`/user/home/${account.account_id}`);
    case 'Technician':
      return res.redirect(`/tech/home/${account.account_id}`);
    default:
      return res.status(400).send({ message: "Loại tài khoản không hợp lệ" });
  }

} catch (error) {
  console.error(error);
  return res.status(500).send({ message: "Lỗi server" });
}
};