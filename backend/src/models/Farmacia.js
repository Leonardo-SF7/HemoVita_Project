const db = require('../utils/db');

const Farmacia = {
  async create(data) {
    const { nome_medicamento } = data;
    const [result] = await db.query(
      `INSERT INTO Farmacia (nome_medicamento) VALUES (?)`,
      [nome_medicamento]
    );
    return result.insertId;
  },
  async findAll() {
    const [rows] = await db.query('SELECT * FROM Farmacia');
    return rows;
  },
  async findById(id) {
    const [rows] = await db.query('SELECT * FROM Farmacia WHERE id_medicamento = ?', [id]);
    return rows[0];
  },
  async update(id, data) {
    const { nome_medicamento } = data;
    const [result] = await db.query(
      `UPDATE Farmacia SET nome_medicamento = ? WHERE id_medicamento = ?`,
      [nome_medicamento, id]
    );
    return result.affectedRows;
  },
  async delete(id) {
    const [result] = await db.query('DELETE FROM Farmacia WHERE id_medicamento = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Farmacia;