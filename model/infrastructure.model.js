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

const Infrastructure = sequelize.define('Infrastructure',{
  infrastructure_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.ENUM('Operational', 'Maintenance', 'Faulty'),
    defaultValue: 'Operational',
  },
  installation_date: {
    type: DataTypes.DATE,
  },
  last_maintenance_date: {
    type: DataTypes.DATE,
  },
  last_inspection_date: {
    type: DataTypes.DATE,
  },
  specifications: {
    type: DataTypes.TEXT,
  },
  notes: {
    type: DataTypes.TEXT,
  },
}, {
  tableName:'Infrastructure',
  timestamps: false,
});

module.exports = Infrastructure;