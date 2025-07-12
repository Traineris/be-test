const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const user = require("../models/user");

const Vendor = sequelize.define(
  "tb_vendor",
  {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "tb_vendor",
    timestamps: false,
  }
);

Vendor.belongsTo(user, {
  foreignKey: "id_user",
  as: "user",
});

module.exports = Vendor;
