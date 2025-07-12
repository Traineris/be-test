const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define(
  "tb_user",
  {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tb_user",
    timestamps: false,
  }
);

module.exports = User;
