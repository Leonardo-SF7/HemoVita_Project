const db = require('../utils/db');

const Usuario = {
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
    return rows[0];
  },
  async create({ email, senha, status }) {
    const [result] = await db.query(
      'INSERT INTO Usuarios (email, senha, status) VALUES (?, ?, ?)',
      [email, senha, status]
    );
    return result.insertId;
  },
  async updateRole(id, role) {
    const [result] = await db.query(
      'UPDATE Usuarios SET role = ? WHERE id_usuario = ?',
      [role, id]
    );
    return result.affectedRows;
  }
};

module.exports = Usuario;