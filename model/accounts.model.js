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

const Account = sequelize.define('Account', {
  account_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  account_type: {
    type: DataTypes.ENUM('User', 'Technician', 'Admin'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active',
  },
}, {
  tableName: 'Accounts',
  timestamps: false,
});

module.exports = Account;