const Layanan = require("../models/layananModel");

module.exports = {
  async getAll(req, res) {
    try {
      const data = await Layanan.getAll();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Gagal mengambil data layanan" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const layanan = await Layanan.getById(id);
      if (!layanan)
        return res.status(404).json({ message: "Layanan tidak ditemukan" });
      res.json(layanan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Gagal mengambil layanan" });
    }
  },

  async create(req, res) {
    try {
      const {
        nama_layanan,
        deskripsi,
        tipe_layanan,
        harga,
        satuan_harga,
        durasi,
      } = req.body;

      if (!nama_layanan || !tipe_layanan || !harga || !satuan_harga || !durasi)
        return res
          .status(400)
          .json({ message: "Field wajib tidak boleh kosong" });

      const id = await Layanan.create({
        nama_layanan,
        deskripsi,
        tipe_layanan,
        harga,
        satuan_harga,
        durasi,
      });

      res.status(201).json({ message: "Layanan berhasil ditambahkan", id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Gagal menambahkan layanan" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        nama_layanan,
        deskripsi,
        tipe_layanan,
        harga,
        satuan_harga,
        durasi,
      } = req.body;

      const affected = await Layanan.update(id, {
        nama_layanan,
        deskripsi,
        tipe_layanan,
        harga,
        satuan_harga,
        durasi,
      });

      if (!affected)
        return res.status(404).json({ message: "Layanan tidak ditemukan" });
      res.json({ message: "Layanan berhasil diperbarui" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Gagal memperbarui layanan" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const affected = await Layanan.delete(id);
      if (!affected)
        return res.status(404).json({ message: "Layanan tidak ditemukan" });
      res.json({ message: "Layanan berhasil dihapus" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Gagal menghapus layanan" });
    }
  },
};
