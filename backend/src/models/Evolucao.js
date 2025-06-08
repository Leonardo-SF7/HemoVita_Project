const db = require('../utils/db');

const Evolucao = {
  async create(data) {
    const { descricao, dt_evolucao, id_paciente, id_profi } = data;
    const [result] = await db.query(
      `INSERT INTO Evolucao (descricao, dt_evolucao, id_paciente, id_profi)
       VALUES (?, ?, ?, ?)`,
      [descricao, dt_evolucao, id_paciente, id_profi]
    );
    return result.insertId;
  },
  async findAll() {
    const [rows] = await db.query(
      `SELECT e.*, p.nome_paciente, f.nome_profi
       FROM Evolucao e
       LEFT JOIN Paciente p ON e.id_paciente = p.id_paciente
       LEFT JOIN Profissional f ON e.id_profi = f.id_profi`
    );
    return rows;
  },
  async findById(id) {
    const [rows] = await db.query(
      `SELECT e.*, p.nome_paciente, f.nome_profi
       FROM Evolucao e
       LEFT JOIN Paciente p ON e.id_paciente = p.id_paciente
       LEFT JOIN Profissional f ON e.id_profi = f.id_profi
       WHERE e.id_evolucao = ?`,
      [id]
    );
    return rows[0];
  },
  async update(id, data) {
    const { descricao, dt_evolucao, id_paciente, id_profi } = data;
    const [result] = await db.query(
      `UPDATE Evolucao SET descricao = ?, dt_evolucao = ?, id_paciente = ?, id_profi = ?
       WHERE id_evolucao = ?`,
      [descricao, dt_evolucao, id_paciente, id_profi, id]
    );
    return result.affectedRows;
  },
  async delete(id) {
    const [result] = await db.query('DELETE FROM Evolucao WHERE id_evolucao = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Evolucao;