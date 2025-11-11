const { promisePool } = require("../config/database");

const Pelanggan = {
  // Ambil semua pelanggan
  async getAll() {
    const [rows] = await promisePool.query(
      "SELECT * FROM pelanggan ORDER BY id DESC"
    );
    return rows;
  },

  // Ambil pelanggan berdasarkan ID
  async getById(id) {
    const [rows] = await promisePool.query(
      "SELECT * FROM pelanggan WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  // Ambil pelanggan berdasarkan nomor telepon
  async getByNoTelp(no_telp) {
    const [rows] = await promisePool.query(
      "SELECT * FROM pelanggan WHERE no_telp = ?",
      [no_telp]
    );
    return rows[0];
  },

  // Tambah pelanggan baru
  async create({ nama, no_telp }) {
    const [result] = await promisePool.query(
      "INSERT INTO pelanggan (nama, no_telp) VALUES (?, ?)",
      [nama, no_telp]
    );
    return result.insertId;
  },

  // Update data pelanggan
  async update(id, { nama, no_telp }) {
    const [result] = await promisePool.query(
      "UPDATE pelanggan SET nama = ?, no_telp = ? WHERE id = ?",
      [nama, no_telp, id]
    );
    return result.affectedRows;
  },

  // Hapus pelanggan
  async delete(id) {
    const [result] = await promisePool.query(
      "DELETE FROM pelanggan WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  },
};

module.exports = Pelanggan;
