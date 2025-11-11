const Pelanggan = require("../models/pelangganModel");

module.exports = {
  async getAll(req, res) {
    try {
      const data = await Pelanggan.getAll();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Gagal mengambil data pelanggan" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const pelanggan = await Pelanggan.getById(id);
      if (!pelanggan)
        return res.status(404).json({ message: "Pelanggan tidak ditemukan" });
      res.json(pelanggan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Gagal mengambil data pelanggan" });
    }
  },

  async create(req, res) {
    try {
      const { nama, no_telp } = req.body;

      if (!nama || !no_telp)
        return res
          .status(400)
          .json({ message: "Nama dan No. Telp wajib diisi" });

      const id = await Pelanggan.create({ nama, no_telp });
      res.status(201).json({ message: "Pelanggan berhasil ditambahkan", id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Gagal menambahkan pelanggan" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nama, no_telp } = req.body;

      const affected = await Pelanggan.update(id, { nama, no_telp });
      if (!affected)
        return res.status(404).json({ message: "Pelanggan tidak ditemukan" });

      res.json({ message: "Pelanggan berhasil diperbarui" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Gagal memperbarui pelanggan" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const affected = await Pelanggan.delete(id);
      if (!affected)
        return res.status(404).json({ message: "Pelanggan tidak ditemukan" });

      res.json({ message: "Pelanggan berhasil dihapus" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Gagal menghapus pelanggan" });
    }
  },
};
