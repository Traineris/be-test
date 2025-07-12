const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const authMiddleware = require("../auth");
const vendor = require("../models/vendor");
const user = require("../models/user");
const produk = require("../models/produk");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const produkData = await produk.findAll({
      attributes: [
        "id",
        "kode",
        "nama",
        "harga",
        "satuan",
        [
          sequelize.fn(
            "DATE_FORMAT",
            sequelize.col("tb_produk.created_at"),
            "%Y-%m-%d, %H:%i:%s"
          ),
          "createdAt",
        ],
      ],
      include: [
        {
          model: vendor,
          as: "vendor",
          attributes: ["id", "nama"],
        },
      ],
      order: [["id", "DESC"]],
    });
    res.json({ success: true, data: produkData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const produkData = await produk.findByPk(req.params.id, {
      attributes: [
        "id",
        "kode",
        "nama",
        "harga",
        "satuan",
        [
          sequelize.fn(
            "DATE_FORMAT",
            sequelize.col("tb_produk.created_at"),
            "%Y-%m-%d, %H:%i:%s"
          ),
          "createdAt",
        ],
      ],
      include: [
        {
          model: vendor,
          as: "vendor",
          attributes: ["id", "nama"],
        },
      ],
    });
    if (!produkData) {
      return res.status(404).json({ error: "Produk not found" });
    }
    res.json({ success: true, data: produkData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { kode, nama, harga, id_vendor, satuan } = req.body;
    const newProduk = await produk.create({
      kode,
      nama,
      harga,
      id_vendor,
      satuan,
    });
    res.json({
      success: true,
      message: "Produk created successfully",
      id: newProduk.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { kode, nama, harga, id_vendor, satuan } = req.body;
    await produk.update({ kode, nama, harga, id_vendor, satuan }, { where: { id } });
    res.json({ success: true, message: "Produk updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await produk.destroy({ where: { id } });
    if (deletedRows === 0) {
      return res.status(404).json({ error: "Produk not found" });
    }
    res.json({ success: true, message: "Produk deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
