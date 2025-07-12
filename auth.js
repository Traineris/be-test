// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader)
    return res.status(401).json({ error: "Tidak memiliki akses" });

  const token = tokenHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token tidak valid" });
  }
}

module.exports = authMiddleware;
