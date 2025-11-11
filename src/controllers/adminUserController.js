const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminAuth = require("../models/adminUser"); // ubah nama model

const JWT_SECRET = process.env.JWT_SECRET || "rahasia123";

module.exports = {
  // 🧩 Registrasi Admin
  async register(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username dan password wajib diisi" });
      }

      // Cek apakah username sudah ada
      const existingUser = await AdminAuth.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username sudah terdaftar" });
      }

      // Hash password sebelum disimpan
      const hashedPassword = await bcrypt.hash(password, 10);

      // Simpan ke database
      const userId = await AdminAuth.create(username, hashedPassword);

      res.status(201).json({
        message: "Registrasi berhasil",
        userId,
      });
    } catch (error) {
      console.error("Error saat registrasi:", error);
      res.status(500).json({ message: "Terjadi kesalahan server" });
    }
  },

  // 🔑 Login Admin
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username dan password wajib diisi" });
      }

      const user = await AdminAuth.findByUsername(username);
      if (!user) {
        return res.status(404).json({ message: "Username tidak ditemukan" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password salah" });
      }

      // Buat token JWT
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        message: "Login berhasil",
        token,
        user: { id: user.id, username: user.username },
      });
    } catch (error) {
      console.error("Error saat login:", error);
      res.status(500).json({ message: "Terjadi kesalahan server" });
    }
  },
};
