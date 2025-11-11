const Transaksi = require("../models/transaksi");
const TransaksiDetail = require("../models/transaksiDetail");

const transaksiController = {
  // Ambil semua transaksi
  async getAll(req, res) {
    try {
      const rows = await Transaksi.getAll();
      
      // Kelompokkan transaksi berdasarkan transaksi_id
      const transaksiMap = new Map();
      
      rows.forEach(row => {
        const transaksiId = row.transaksi_id;
        
        if (!transaksiMap.has(transaksiId)) {
          // Buat objek transaksi baru
          transaksiMap.set(transaksiId, {
            transaksi_id: row.transaksi_id,
            pelanggan_id: row.pelanggan_id,
            nama_pelanggan: row.nama_pelanggan,
            no_telepon: row.no_telepon,
            total_harga: row.total_harga,
            pembayaran_awal: row.pembayaran_awal,
            pembayaran_status: row.pembayaran_status,
            tanggal_masuk: row.tanggal_masuk,
            tanggal_selesai: row.tanggal_selesai,
            status: row.status,
            detail_layanan: []
          });
        }
        
        // Tambahkan detail layanan ke array
        transaksiMap.get(transaksiId).detail_layanan.push({
          detail_id: row.detail_id,
          nama_layanan: row.nama_layanan,
          tipe_layanan: row.tipe_layanan,
          durasi: row.durasi,
          berat: row.berat,
          subtotal: row.subtotal
        });
      });
      
      // Convert Map ke Array
      const data = Array.from(transaksiMap.values());
      
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Gagal mengambil data transaksi" });
    }
  },

  // Ambil transaksi berdasarkan ID (dengan detail)
  async getById(req, res) {
    try {
      const { id } = req.params;
      const transaksi = await Transaksi.getById(id);
      if (!transaksi) {
        return res
          .status(404)
          .json({ success: false, message: "Transaksi tidak ditemukan" });
      }

      const details = await TransaksiDetail.getByTransaksiId(id);
      res.status(200).json({ success: true, data: { ...transaksi, details } });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Gagal mengambil detail transaksi" });
    }
  },

  // Tambah transaksi baru + detail
  async create(req, res) {
    const { promisePool } = require("../config/database");
    const Pelanggan = require("../models/pelangganModel");
    const conn = await promisePool.getConnection();
    try {
      await conn.beginTransaction();

      const { 
        pelanggan_id, 
        nama_pelanggan, 
        no_telp_pelanggan,
        simpan_pelanggan,
        tanggal_masuk, 
        tanggal_selesai, 
        detail, 
        pembayaran_awal, 
        pembayaran_status, 
        status 
      } = req.body;

      // Validasi: harus ada pelanggan_id ATAU (nama_pelanggan DAN no_telp_pelanggan)
      if (!pelanggan_id && (!nama_pelanggan || !no_telp_pelanggan)) {
        throw new Error("Data tidak lengkap: pelanggan_id ATAU (nama_pelanggan dan no_telp_pelanggan) wajib diisi");
      }

      if (!tanggal_masuk || !detail || !Array.isArray(detail) || detail.length === 0) {
        throw new Error("Data tidak lengkap: tanggal_masuk dan detail wajib diisi");
      }

      let finalPelangganId = pelanggan_id;
      let pelangganBaru = false;

      // Jika tidak ada pelanggan_id, gunakan data manual
      if (!pelanggan_id) {
        // Cek apakah nomor telepon sudah terdaftar di database
        const pelangganExisting = await Pelanggan.getByNoTelp(no_telp_pelanggan);
        
        if (pelangganExisting) {
          throw new Error(
            `Nomor telepon ${no_telp_pelanggan} sudah terdaftar atas nama "${pelangganExisting.nama}". ` +
            `Gunakan pelanggan_id: ${pelangganExisting.id} atau gunakan nomor telepon yang berbeda.`
          );
        }

        // Jika simpan_pelanggan = true, simpan ke database
        if (simpan_pelanggan === true) {
          finalPelangganId = await Pelanggan.create({
            nama: nama_pelanggan,
            no_telp: no_telp_pelanggan
          });
          pelangganBaru = true;
        } else {
          // Jika tidak disimpan, gunakan ID khusus (0) untuk pelanggan sementara
          finalPelangganId = 0;
        }
      }

      let total = 0;

      // Tambahkan detail layanan dan hitung total
      for (const item of detail) {
        if (!item.layanan_id || !item.berat) {
          throw new Error("Setiap detail harus memiliki layanan_id dan berat");
        }

        // Ambil harga layanan dari database
        const [layananRows] = await conn.query(
          "SELECT harga FROM layanan WHERE id = ?",
          [item.layanan_id]
        );

        if (!layananRows.length) {
          throw new Error(
            `Layanan dengan ID ${item.layanan_id} tidak ditemukan`
          );
        }

        const harga = Number(layananRows[0].harga);
        const berat = Number(item.berat);
        const subtotal = harga * berat;

        total += subtotal;
      }

      // Buat transaksi utama dengan total yang sudah dihitung
      const [transaksiResult] = await conn.query(
        `INSERT INTO transaksi 
        (pelanggan_id, total_harga, pembayaran_awal, pembayaran_status, tanggal_masuk, tanggal_selesai, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          finalPelangganId,
          total,
          pembayaran_awal || 0,
          pembayaran_status || "Belum Bayar",
          tanggal_masuk,
          tanggal_selesai || null,
          status || "Pending",
        ]
      );

      const transaksiId = transaksiResult.insertId;

      // Simpan semua detail transaksi
      for (const item of detail) {
        const [layananRows] = await conn.query(
          "SELECT harga FROM layanan WHERE id = ?",
          [item.layanan_id]
        );

        const harga = Number(layananRows[0].harga);
        const berat = Number(item.berat);
        const subtotal = harga * berat;

        await conn.query(
          `INSERT INTO transaksi_detail (transaksi_id, layanan_id, berat, subtotal)
          VALUES (?, ?, ?, ?)`,
          [transaksiId, item.layanan_id, berat, subtotal]
        );
      }

      await conn.commit();

      const response = {
        success: true,
        message: "Transaksi berhasil dibuat",
        transaksi_id: transaksiId,
        total_harga: total,
      };

      // Tambahkan info pelanggan baru jika disimpan
      if (pelangganBaru) {
        response.pelanggan_baru = {
          id: finalPelangganId,
          nama: nama_pelanggan,
          no_telp: no_telp_pelanggan,
          message: "Data pelanggan berhasil disimpan"
        };
      } else if (!pelanggan_id) {
        response.pelanggan_info = {
          nama: nama_pelanggan,
          no_telp: no_telp_pelanggan,
          message: "Data pelanggan tidak disimpan (transaksi sementara)"
        };
      }

      res.status(201).json(response);
    } catch (error) {
      await conn.rollback();
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Gagal membuat transaksi",
        error: error.message,
      });
    } finally {
      conn.release();
    }
  },

  // Update status atau pembayaran transaksi
  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await Transaksi.update(id, req.body);

      if (!updated) {
        return res
          .status(404)
          .json({ success: false, message: "Transaksi tidak ditemukan" });
      }

      res
        .status(200)
        .json({ success: true, message: "Transaksi berhasil diperbarui" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Gagal memperbarui transaksi" });
    }
  },

  // Hapus transaksi beserta detailnya
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Transaksi.delete(id);

      if (!deleted) {
        return res
          .status(404)
          .json({ success: false, message: "Transaksi tidak ditemukan" });
      }

      res
        .status(200)
        .json({ success: true, message: "Transaksi berhasil dihapus" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Gagal menghapus transaksi" });
    }
  },
};

module.exports = transaksiController;
