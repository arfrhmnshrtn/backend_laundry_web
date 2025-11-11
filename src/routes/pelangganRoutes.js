const express = require("express");
const router = express.Router();
const pelangganController = require("../controllers/pelangganController");

// GET semua pelanggan
router.get("/", pelangganController.getAll);

// GET pelanggan berdasarkan ID
router.get("/:id", pelangganController.getById);

// POST tambah pelanggan
router.post("/", pelangganController.create);

// PUT update pelanggan
router.put("/:id", pelangganController.update);

// DELETE pelanggan
router.delete("/:id", pelangganController.delete);

module.exports = router;
