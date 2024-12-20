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
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  report_description: {
    type: DataTypes.TEXT, // Đã thay đổi kiểu dữ liệu thành TEXT
    allowNull: true, // Tùy chọn: có thể để null
  },
  resolved_at: {
    type: DataTypes.DATE, // Đã thay đổi thành DATETIME
    allowNull: true, // Tùy chọn: có thể để null
  },
  resolved_image: {
    type: DataTypes.STRING(100), // Đã thay đổi cực đại thành 100 ký tự
    allowNull: true, // Tùy chọn: có thể để null
  },
  response_date: {
    type: DataTypes.DATE, // Đã thêm trường này với kiểu DATETIME
    defaultValue: DataTypes.NOW, // Mặc định là thời điểm hiện tại
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