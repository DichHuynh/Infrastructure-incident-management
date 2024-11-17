// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   role: String,
//   address: String,
//   avatar: String,
//   status: String
// });

// const User = mongoose.model('User', userSchema,"user");
// module.exports = User;

const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(
  "infrastructure_management",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const Account = require("./accounts.model.js");

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Account, // Liên kết với bảng Accounts
      key: 'account_id',
    },
    onDelete: 'CASCADE', // Xóa thông tin user nếu account bị xóa
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  registration_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'UserDetails',
  timestamps: false,
});

// Thiết lập quan hệ với bảng Account
User.belongsTo(Account, { foreignKey: 'account_id' });
Account.hasOne(User, { foreignKey: 'account_id' });

module.exports = User;
