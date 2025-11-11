const express = require("express");
const router = express.Router();
const layananController = require("../controllers/layananController");

// ✅ Ambil semua layanan
router.get("/", layananController.getAll);

// ✅ Ambil layanan berdasarkan ID
router.get("/:id", layananController.getById);

// ✅ Tambah layanan baru
router.post("/", layananController.create);

// ✅ Update layanan berdasarkan ID
router.put("/:id", layananController.update);

// ✅ Hapus layanan
router.delete("/:id", layananController.delete);

module.exports = router;
