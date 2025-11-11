const { promisePool } = require("../config/database");

const Layanan = {
  // Ambil semua layanan
  async getAll() {
    const [rows] = await promisePool.query(
      "SELECT * FROM layanan ORDER BY id DESC"
    );
    return rows;
  },

  // Ambil layanan berdasarkan ID
  async getById(id) {
    const [rows] = await promisePool.query(
      "SELECT * FROM layanan WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  // Tambah layanan baru
  async create({
    nama_layanan,
    deskripsi,
    tipe_layanan,
    harga,
    satuan_harga,
    durasi,
  }) {
    const [result] = await promisePool.query(
      `INSERT INTO layanan (nama_layanan, deskripsi, tipe_layanan, harga, satuan_harga, durasi)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nama_layanan, deskripsi, tipe_layanan, harga, satuan_harga, durasi]
    );
    return result.insertId;
  },

  // Update layanan
  async update(
    id,
    { nama_layanan, deskripsi, tipe_layanan, harga, satuan_harga, durasi }
  ) {
    const [result] = await promisePool.query(
      `UPDATE layanan 
       SET nama_layanan = ?, deskripsi = ?, tipe_layanan = ?, harga = ?, satuan_harga = ?, durasi = ?
       WHERE id = ?`,
      [nama_layanan, deskripsi, tipe_layanan, harga, satuan_harga, durasi, id]
    );
    return result.affectedRows;
  },

  // Hapus layanan
  async delete(id) {
    const [result] = await promisePool.query(
      "DELETE FROM layanan WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  },
};

module.exports = Layanan;
