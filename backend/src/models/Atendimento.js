const db = require('../utils/db');

const Atendimento = {
  async create(data) {
    const { tipo_atendimento, notas, leito, evolucao, dt_atendimento, id_paciente, id_profi } = data;
    const [result] = await db.query(
      `INSERT INTO Atendimento (tipo_atendimento, notas, leito, evolucao, dt_atendimento, id_paciente, id_profi)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [tipo_atendimento, notas, leito, evolucao, dt_atendimento, id_paciente, id_profi]
    );
    return result.insertId;
  },
  async findAll() {
    const [rows] = await db.query(
      `SELECT a.*, p.nome_paciente, f.nome_profi
       FROM Atendimento a
       LEFT JOIN Paciente p ON a.id_paciente = p.id_paciente
       LEFT JOIN Profissional f ON a.id_profi = f.id_profi`
    );
    return rows;
  },
  async findById(id) {
    const [rows] = await db.query(
      `SELECT a.*, p.nome_paciente, f.nome_profi
       FROM Atendimento a
       LEFT JOIN Paciente p ON a.id_paciente = p.id_paciente
       LEFT JOIN Profissional f ON a.id_profi = f.id_profi
       WHERE a.id_atendimento = ?`,
      [id]
    );
    return rows[0];
  },
  async update(id, data) {
    const { tipo_atendimento, notas, leito, evolucao, dt_atendimento, id_paciente, id_profi } = data;
    const [result] = await db.query(
      `UPDATE Atendimento SET tipo_atendimento = ?, notas = ?, leito = ?, evolucao = ?, dt_atendimento = ?, id_paciente = ?, id_profi = ?
       WHERE id_atendimento = ?`,
      [tipo_atendimento, notas, leito, evolucao, dt_atendimento, id_paciente, id_profi, id]
    );
    return result.affectedRows;
  },
  async delete(id) {
    const [result] = await db.query('DELETE FROM Atendimento WHERE id_atendimento = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Atendimento;