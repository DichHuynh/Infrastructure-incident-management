const Account = require("../model/accounts.model.js");
const Tech = require("../model/tech.model.js");

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

module.exports.work = async (req, res) => {
  const accountId = req.params.id;
  res.render("tech/pages/assignedTask.pug",{
    title: "Work",
    userId: accountId
  });
};

module.exports.assignedTask = async (req, res) => {
  const accountId = req.params.id;
  res.render("tech/pages/assignedTask.pug",{
    title: "Assigned Task",
    userId: accountId
  })
}

module.exports.history = async (req, res) => {
  const accountId = req.params.id;
  res.render("tech/pages/history.pug",{
    title: "Work history",
    userId: accountId
  })
}
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