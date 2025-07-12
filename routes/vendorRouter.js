const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const authMiddleware = require("../auth");
const vendor = require("../models/vendor");
const user = require("../models/user");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const vendors = await vendor.findAll({
      attributes: [
        "id",
        "nama",
        "alamat",
        [
          sequelize.fn(
            "DATE_FORMAT",
            sequelize.col("tb_vendor.created_at"),
            "%Y-%m-%d, %H:%i:%s"
          ),
          "createdAt",
        ],
      ],
      include: [
        {
          model: user,
          as: "user",
          attributes: ["id", "nama"],
        },
      ],
      order: [["id", "DESC"]],
    });
    res.json({ success: true, data: vendors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const vendorData = await vendor.findByPk(req.params.id, {
        attributes: [
            "id",
            "nama",
            "alamat",
            [
            sequelize.fn(
                "DATE_FORMAT",
                sequelize.col("tb_vendor.created_at"),
                "%Y-%m-%d, %H:%i:%s"
            ),
            "createdAt",
            ],
        ],
      include: [
        {
          model: user,
          as: "user",
          attributes: ["id", "nama"],
        },
      ],
    });
    if (!vendorData) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.json({ success: true, data: vendorData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { id_user, nama, alamat } = req.body;
    const newVendor = await vendor.create({
      id_user,
      nama,
      alamat,
    });
    res.json({
      success: true,
      message: "Vendor created successfully",
      id: newVendor.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { id_user, nama, alamat } = req.body;
    await vendor.update({ id_user, nama, alamat }, { where: { id } });
    res.json({ success: true, message: "Vendor updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await vendor.destroy({ where: { id } });
    if (deletedRows === 0) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.json({ success: true, message: "Vendor deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
