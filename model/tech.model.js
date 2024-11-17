const { Sequelize, DataTypes } = require("sequelize");

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

const Tech = sequelize.define('TechnicianDetails', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  technician_id: {
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
    onDelete: 'CASCADE', // Xóa thông tin kỹ thuật viên nếu account bị xóa
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberphone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expertise: {
    type: DataTypes.STRING,
  },
  employment_date: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'TechnicianDetails',
  timestamps: false,
});

// Thiết lập quan hệ với bảng Account
Tech.belongsTo(Account, { foreignKey: 'account_id' });
Account.hasOne(Tech, { foreignKey: 'account_id' });

module.exports = Tech;