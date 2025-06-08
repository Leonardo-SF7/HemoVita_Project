const db = require('../utils/db');

const Historico = {
  async create(data) {
    const { dt_registro, id_paciente, id_profi, id_atendimento } = data;
    const [result] = await db.query(
      `INSERT INTO Historico (dt_registro, id_paciente, id_profi, id_atendimento)
       VALUES (?, ?, ?, ?)`,
      [dt_registro, id_paciente, id_profi, id_atendimento]
    );
    return result.insertId;
  },
  async findAll() {
    const [rows] = await db.query(
      `SELECT h.*, p.nome_paciente, f.nome_profi, a.tipo_atendimento
       FROM Historico h
       LEFT JOIN Paciente p ON h.id_paciente = p.id_paciente
       LEFT JOIN Profissional f ON h.id_profi = f.id_profi
       LEFT JOIN Atendimento a ON h.id_atendimento = a.id_atendimento`
    );
    return rows;
  },
  async findById(id) {
    const [rows] = await db.query(
      `SELECT h.*, p.nome_paciente, f.nome_profi, a.tipo_atendimento
       FROM Historico h
       LEFT JOIN Paciente p ON h.id_paciente = p.id_paciente
       LEFT JOIN Profissional f ON h.id_profi = f.id_profi
       LEFT JOIN Atendimento a ON h.id_atendimento = a.id_atendimento
       WHERE h.id_historico = ?`,
      [id]
    );
    return rows[0];
  },
  async update(id, data) {
    const { dt_registro, id_paciente, id_profi, id_atendimento } = data;
    const [result] = await db.query(
      `UPDATE Historico SET dt_registro = ?, id_paciente = ?, id_profi = ?, id_atendimento = ?
       WHERE id_historico = ?`,
      [dt_registro, id_paciente, id_profi, id_atendimento, id]
    );
    return result.affectedRows;
  },
  async delete(id) {
    const [result] = await db.query('DELETE FROM Historico WHERE id_historico = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Historico;