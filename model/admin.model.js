const {Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  'infrastructure_management',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
  }
);
const Account = require("./accounts.model.js");

const Admin = sequelize.define('adminDetails',{
  id: {
    type: DataTypes.INTEGER,
    AutoIncrement: true,
    primaryKey: true,
  },
  admin_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  account_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Account,
      key: 'account_id',
    },
    onDelete: 'CASCADE',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberphone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('Supervisor', 'Manager'),
    allowNull: false,
  },
},{
  tableName: 'AdminDetails',
  timestamps: false,
});

Admin.belongsTo(Account, { foreignKey: 'account_id'});
Account.hasOne(Admin, { foreignKey: 'account_id'});

module.exports = Admin;