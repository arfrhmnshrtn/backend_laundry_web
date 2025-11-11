const { promisePool } = require("../config/database");

const User = {
  async findByUsername(username) {
    const [rows] = await promisePool.query(
      "SELECT * FROM `admin_users` WHERE username = ?",
      [username]
    );
    return rows[0];
  },

  async create(username, hashedPassword) {
    const [result] = await promisePool.query(
      "INSERT INTO `admin_users` (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );
    return result.insertId;
  },
};

module.exports = User;
