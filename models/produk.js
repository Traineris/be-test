const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const vendor = require("../models/vendor");

const Vendor = sequelize.define(
  "tb_produk",
  {
    kode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    harga: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    satuan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_vendor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "tb_produk",
    timestamps: false,
  }
);

Vendor.belongsTo(vendor, {
  foreignKey: "id_vendor",
  as: "vendor",
});

module.exports = Vendor;
