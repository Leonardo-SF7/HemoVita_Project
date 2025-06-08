const db = require('../utils/db');

const Triagem = {
  async create(data) {
    const { descricao, dt_triagem, id_paciente, id_profi } = data;
    const [result] = await db.query(
      `INSERT INTO Triagem (descricao, dt_triagem, id_paciente, id_profi)
       VALUES (?, ?, ?, ?)`,
      [descricao, dt_triagem, id_paciente, id_profi]
    );
    return result.insertId;
  },
  async findAll() {
    const [rows] = await db.query(
      `SELECT t.*, p.nome_paciente, f.nome_profi
       FROM Triagem t
       LEFT JOIN Paciente p ON t.id_paciente = p.id_paciente
       LEFT JOIN Profissional f ON t.id_profi = f.id_profi`
    );
    return rows;
  },
  async findById(id) {
    const [rows] = await db.query(
      `SELECT t.*, p.nome_paciente, f.nome_profi
       FROM Triagem t
       LEFT JOIN Paciente p ON t.id_paciente = p.id_paciente
       LEFT JOIN Profissional f ON t.id_profi = f.id_profi
       WHERE t.id_triagem = ?`,
      [id]
    );
    return rows[0];
  },
  async update(id, data) {
    const { descricao, dt_triagem, id_paciente, id_profi } = data;
    const [result] = await db.query(
      `UPDATE Triagem SET descricao = ?, dt_triagem = ?, id_paciente = ?, id_profi = ?
       WHERE id_triagem = ?`,
      [descricao, dt_triagem, id_paciente, id_profi, id]
    );
    return result.affectedRows;
  },
  async delete(id) {
    const [result] = await db.query('DELETE FROM Triagem WHERE id_triagem = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Triagem;