const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await user.findOne({ where: { username } });

    if (!existingUser) {
      return res.status(401).json({ error: "Username tidak ditemukan" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Password salah" });
    }

    // Masukkan data user ke token
    const tokenPayload = {
      id: existingUser.id,
      username: existingUser.username,
      nama: existingUser.nama,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      success: true,
      message: "Login berhasil",
      token: token,
      user: tokenPayload,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
