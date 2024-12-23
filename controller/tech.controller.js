const Account = require("../model/accounts.model.js");
const Tech = require("../model/tech.model.js");
const Issue = require("../model/issue.model.js");

const { Op } = require('sequelize');

module.exports.index = async (req, res)=>{
  const accountId = req.params.id;
  res.render("tech/pages/index.pug",{
    title: "Home Tech",
    userId: accountId
  })
};

module.exports.setAccount = async (req, res) => {
  const accountId = req.params.id;
  const tech = await Tech.findOne({
    where: { account_id: accountId },
    include: {
      model: Account,
      required: true
    }
  });
  res.render("tech/pages/setAccount.pug",{
    title: "Set Account",
    tech: tech,
    userId: accountId
  })
};

module.exports.setAccountPut = async (req, res) => {
  const accountId = req.params.id;
  console.log(req.body);
  const { name, email, new_password, avatar, status, numberphone } = req.body;
  const updateData = { email, status, name };
  if (avatar) {
    updateData.avatar = avatar;
  }
  if (new_password){
    updateData.password = new_password;
  }
  const [updatedRows] = await Account.update(updateData, {
    where: { account_id: accountId },
  });
  const [updatedUser] = await Tech.update({ name, numberphone }, {
    where: { account_id: accountId },
  });
  res.redirect(`back`);
}

module.exports.assignedTask = async (req, res) => {
  const accountId = req.params.id;
      // Tìm technician dựa trên account_id
      const technician = await Tech.findOne({
          where: { account_id: accountId }
      });
      if (!technician) {
          return res.render('error', { message: "Technician không tồn tại!" });
      }
      // Lấy danh sách nhiệm vụ được giao cho kỹ thuật viên
      const assignedTasks = await Issue.findAll({
          where: { technician_id: technician.technician_id, status: { [Op.ne]: 'Resolved' } },
          attributes: ['issue_id', 'description', 'location', 'status', 'report_date'] // Lấy các trường cần thiết
      });
      // Render trang với danh sách nhiệm vụ
      res.render('tech/pages/assignedTask.pug', {
          tasks: assignedTasks,
          technicianName: technician.name,
          userId: accountId
      });
};

module.exports.updateTask = async (req, res) => {
  const { issue_id } = req.params;
  const { status } = req.body;

    const task = await Issue.findOne({ where: { issue_id } });
    
    task.status = status;
    await task.save();
    res.json({ success: true });
};

module.exports.reportTask = async (req, res) => {
  const { issue_id } = req.params;
  const { report_description, resolved_image, resolved_at } = req.body;
  const response_date = new Date();
    // Cập nhật bản ghi
    const [updatedRows] = await Issue.update(
      { report_description, resolved_image, resolved_at, status: 'Resolved', response_date },
      { where: { issue_id } }
    );
    res.redirect('back');
};

module.exports.history = async (req, res) => {
  const accountId = req.params.id;
  try {
    // Lấy danh sách công việc đã hoàn thành
    const technician = await Tech.findOne({
      where: { account_id: accountId }
    });
    const completedTasks = await Issue.findAll({
      where: {
        technician_id: technician.technician_id,
        status: 'Resolved' // Chỉ lấy công việc đã hoàn thành
      },
      attributes: ['issue_id', 'description', 'location', 
        'resolved_at', 'response_date', 'report_description', 'admin_comment',
        'resolved_image', 'time_evaluation', 'quality_evaluation',]
    });
    console.log(completedTasks);
    res.render('tech/pages/history.pug', {
      tasks: completedTasks,
      technicianName: technician.name, 
      userId: accountId
    });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Lỗi khi tải lịch sử công việc!' });
  }
};


module.exports.schedule = async (req, res) => {
  const accountId = req.params.id;
  res.render("tech/pages/schedule.pug",{
    title: "Schedule",
    userId: accountId
  })
}
module.exports.leaveRequest = async (req, res) => {
  const accountId = req.params.id;
  res.render("tech/pages/leaveRequest.pug",{
    title: "leave request",
    userId: accountId
  })
}