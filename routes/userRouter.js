const express = require("express");
const router = express.Router();
const user = require("../models/user");
const sequelize = require("../db");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../auth");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: [
        "id",
        "nama",
        "username",
        [
          sequelize.fn(
            "DATE_FORMAT",
            sequelize.col("created_at"),
            "%Y-%m-%d, %H:%i:%s"
          ),
          "createdAt",
        ],
      ],
      order: [["id", "DESC"]],
    });
    res.json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const users = await user.findByPk(req.params.id);
    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register/", authMiddleware, async (req, res) => {
  try {
    const { nama, username, password } = req.body;
    const bcryptPassword = bcrypt.hashSync(password, 10);
    const newUser = await user.create({
      nama,
      username,
      password: bcryptPassword,
    });
    res.json({
      success: true,
      message: "User created successfully",
      id: newUser.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, username, password } = req.body;
    const bcryptPassword = password ? bcrypt.hashSync(password, 10) : undefined;
    await user.update(
      { nama, username, password: bcryptPassword },
      { where: { id } }
    );
    res.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await user.destroy({ where: { id } });
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
