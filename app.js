require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./db");

app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const loginRouter = require("./routes/loginRouter");
const userRouter = require("./routes/userRouter");
const vendorRouter = require("./routes/vendorRouter");
const produkRouter = require("./routes/produkRouter");

app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/vendor", vendorRouter);
app.use("/produk", produkRouter);

// Cek koneksi database & run server
db.authenticate()
  .then(() => {
    console.log("✅ Database connected");
    return db.sync(); // jangan pakai force:true di production!
  })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database error:", err);
  });

