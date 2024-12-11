const User = require("../model/user.model.js");
const Infrastructure = require("../model/infrastructure.model.js");
const Account = require("../model/accounts.model.js");
const Issue = require("../model/issue.model.js");

module.exports.index = async (req, res) => {
  const accountId = req.params.id;
  res.render("home/pages/index.pug", {
    title: "Home Page",
    userId: accountId
  });
}

module.exports.issue = async (req, res) => {
  try {
    const accountId = req.params.id;

    // Chỉ lấy các cột cần thiết
    const issues = await Issue.findAll({
      attributes: ["issue_id", "description", "location", "latitude", "longitude", "status"],
    });

    res.render("home/pages/issue.pug", {
      title: "Report Issue Page",
      userId: accountId,
      issue: issues,
    });
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).send("Error fetching issues");
  }
};


module.exports.issueDetail = async (req, res) => {
  const { issueId } = req.params; // Lấy ID của sự cố từ params

  try {
    // Truy vấn cơ sở dữ liệu để lấy chi tiết sự cố
    const issue = await Issue.findOne({
      where: { issue_id: issueId },
    });
    console.log(issue);

    if (!issue) {
      return res.status(404).json({ error: "Sự cố không tồn tại!" });
    }

    // Trả về thông tin sự cố
    res.json(issue);
  } catch (error) {
    console.error("Error fetching issue detail:", error);
    res.status(500).json({ error: "Lỗi server, không thể lấy chi tiết sự cố." });
  }
};

module.exports.reportIssue = (req, res) => {
  const accountId = req.params.id;
  res.render("home/pages/reportIssue.pug", {
    title: "Báo cáo sự cố",
    userId: accountId
  });
};

module.exports.reportIssuePost = async (req, res) => {
  const accountId = req.params.id;
  let userId;
  // Get user_id
  try {
    // Tìm user bằng accountId
    const user = await User.findOne({
      where: { account_id: accountId }
    });

    userId = user.user_id; // Truy xuất user_id từ bảng Users


  } catch (error) {
    console.error("Error reporting issue:", error);
  }
  console.log("User ID:", userId);
  const { name, description, location, image } = req.body;

  // create new issue
  const newIssue = await Issue.create({
    description: description,
    location: location,
    image: image,
    user_id: userId,
  });
  return res.redirect(`/user/home/${accountId}/issue`);
}

module.exports.history = (req, res) => {
  const accountId = req.params.id;
  res.render("home/pages/warehouse.pug", {
    title: "Warehouse Page",
    userId: accountId
  });
}
module.exports.evaluate = async (req, res) => {
  const accountId = req.params.id;
  const infrastructure = await Infrastructure.findAll();
  res.render("home/pages/evaluate.pug", {
    title: "Đánh giá",
    userId: accountId,
    infrastructure: infrastructure
  })
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
module.exports.setAccount = async (req, res) => {
  const accountId = req.params.id;

  const user = await User.findOne({
    where: { account_id: accountId },
    include: {
      model: Account,
      required: true // Tạo điều kiện bắt buộc phải có bản ghi trong Account
    }
  });
  console.log(user);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  res.render("home/pages/setAccount.pug", {
    title: "Trang thiết lập tài khoản",
    user: user,
    userId: accountId
  });
};