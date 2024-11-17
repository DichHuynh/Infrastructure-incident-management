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

const User = require('./user.model.js'); // Assuming you have User model defined in another file
const Technician = require('./tech.model.js'); // Assuming Technician model exists
const Infrastructure = require('./infrastructure.model.js'); // Infrastructure model

const Issue = sequelize.define('Issue', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  issue_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  infrastructure_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Infrastructure,
      key: 'infrastructure_id',
    },
    onDelete: 'CASCADE',
  },
  user_id: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'user_id',
    },
    onDelete: 'SET NULL',
  },
  technician_id: {
    type: DataTypes.STRING,
    references: {
      model: Technician,
      key: 'technician_id',
    },
    onDelete: 'SET NULL',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  report_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'In Progress', 'Resolved'),
    defaultValue: 'Pending',
  },
  resolution_date: {
    type: DataTypes.DATE,
  },
  notes: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'Issue',
  timestamps: false,
});

// Thiết lập quan hệ với các bảng khác
Issue.belongsTo(Infrastructure, { foreignKey: 'infrastructure_id' });
Issue.belongsTo(User, { foreignKey: 'user_id' });
Issue.belongsTo(Technician, { foreignKey: 'technician_id' });

module.exports = Issue;