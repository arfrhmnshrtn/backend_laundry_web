const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const adminUserRoutes = require("./src/routes/adminUserRoutes");
const layananRoutes = require("./src/routes/layananRoutes");
const pelangganRoutes = require("./src/routes/pelangganRoutes");
const transaksiRoutes = require("./src/routes/transaksiRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Tambahkan prefix di sini:
app.use("/api/admin/auth", adminUserRoutes);

// layanan routes
app.use("/api/layanan", layananRoutes);
// pelanggan routes
app.use("/api/pelanggan", pelangganRoutes);
// transaksi routes
app.use("/api/transaksi", transaksiRoutes);

app.get("/", (req, res) => {
  res.send("Server berjalan...");
});

module.exports = app;
