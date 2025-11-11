const express = require("express");
const router = express.Router();
const transaksiController = require("../controllers/transaksiController");

// 📦 Ambil semua transaksi
router.get("/", transaksiController.getAll);

// 🔍 Ambil transaksi berdasarkan ID (termasuk detail)
router.get("/:id", transaksiController.getById);

// ➕ Tambah transaksi baru beserta detail
router.post("/", transaksiController.create);

// ✏️ Update transaksi (misal ubah status atau pembayaran)
router.put("/:id", transaksiController.update);

// ❌ Hapus transaksi beserta detailnya
router.delete("/:id", transaksiController.delete);

module.exports = router;
