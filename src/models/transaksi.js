const { promisePool } = require("../config/database");

const Transaksi = {
  // Ambil semua transaksi (dengan join pelanggan)
  async getAll() {
    const [rows] = await promisePool.query(`
      SELECT 
  t.id AS transaksi_id,
  t.pelanggan_id,
  p.nama AS nama_pelanggan,
  p.no_telp AS no_telepon,
  t.total_harga,
  t.pembayaran_awal,
  t.pembayaran_status,
  t.tanggal_masuk,
  t.tanggal_selesai,
  t.status,
  td.id AS detail_id,
  l.nama_layanan,
  l.tipe_layanan,
  l.durasi,
  td.berat,
  td.subtotal
FROM transaksi t
JOIN pelanggan p ON t.pelanggan_id = p.id
JOIN transaksi_detail td ON td.transaksi_id = t.id
JOIN layanan l ON td.layanan_id = l.id
ORDER BY t.id DESC;

    `);
    return rows;
  },

  // Ambil satu transaksi berdasarkan ID
  async getById(id) {
    const [rows] = await promisePool.query(
      `
      SELECT t.*, p.nama AS nama_pelanggan 
      FROM transaksi t
      JOIN pelanggan p ON t.pelanggan_id = p.id
      WHERE t.id = ?
    `,
      [id]
    );
    return rows[0];
  },

  // Tambah transaksi baru
  async create(data) {
    const {
      pelanggan_id,
      total_harga = 0,
      pembayaran_awal = 0,
      pembayaran_status = "Belum Bayar",
      tanggal_masuk,
      tanggal_selesai,
      status = "Pending",
    } = data;

    const [result] = await promisePool.query(
      `
      INSERT INTO transaksi 
      (pelanggan_id, total_harga, pembayaran_awal, pembayaran_status, tanggal_masuk, tanggal_selesai, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [
        pelanggan_id,
        total_harga,
        pembayaran_awal,
        pembayaran_status,
        tanggal_masuk,
        tanggal_selesai,
        status,
      ]
    );

    return result.insertId;
  },

  // Update transaksi
  async update(id, data) {
    const fields = [];
    const values = [];

    if (data.total_harga !== undefined) {
      fields.push("total_harga = ?");
      values.push(data.total_harga);
    }
    if (data.pembayaran_awal !== undefined) {
      fields.push("pembayaran_awal = ?");
      values.push(data.pembayaran_awal);
    }
    if (data.pembayaran_status !== undefined) {
      fields.push("pembayaran_status = ?");
      values.push(data.pembayaran_status);
    }
    if (data.tanggal_selesai !== undefined) {
      fields.push("tanggal_selesai = ?");
      values.push(data.tanggal_selesai);
    }
    if (data.status !== undefined) {
      fields.push("status = ?");
      values.push(data.status);
    }

    if (fields.length === 0) {
      return false;
    }

    values.push(id);

    const [result] = await promisePool.query(
      `UPDATE transaksi SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    return result.affectedRows > 0;
  },

  // Hapus transaksi
  async delete(id) {
    await promisePool.query(
      "DELETE FROM transaksi_detail WHERE transaksi_id = ?",
      [id]
    );
    const [result] = await promisePool.query(
      "DELETE FROM transaksi WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  },
};

module.exports = Transaksi;
