const { promisePool } = require("../config/database");

const TransaksiDetail = {
  // Ambil semua detail berdasarkan transaksi_id
  async getByTransaksiId(transaksi_id) {
    const [rows] = await promisePool.query(
      `
      SELECT td.*, l.nama_layanan, l.harga, l.satuan_harga
      FROM transaksi_detail td
      JOIN layanan l ON td.layanan_id = l.id
      WHERE td.transaksi_id = ?
    `,
      [transaksi_id]
    );
    return rows;
  },

  // Tambah detail transaksi
  async create(data) {
    const { transaksi_id, layanan_id, berat, subtotal } = data;
    const [result] = await promisePool.query(
      `
      INSERT INTO transaksi_detail (transaksi_id, layanan_id, berat, subtotal)
      VALUES (?, ?, ?, ?)
    `,
      [transaksi_id, layanan_id, berat, subtotal]
    );
    return result.insertId;
  },

  // Hapus semua detail berdasarkan transaksi_id
  async deleteByTransaksiId(transaksi_id) {
    const [result] = await promisePool.query(
      `
      DELETE FROM transaksi_detail WHERE transaksi_id = ?
    `,
      [transaksi_id]
    );
    return result.affectedRows > 0;
  },
};

module.exports = TransaksiDetail;
