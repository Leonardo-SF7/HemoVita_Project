const db = require('../utils/db');

const Prontuario = {
  async create(data) {
    const { diagnostico, anotacoes, id_paciente, id_profi, id_atendimento } = data;
    const [result] = await db.query(
      `INSERT INTO Prontuario (diagnostico, anotacoes, id_paciente, id_profi, id_atendimento)
       VALUES (?, ?, ?, ?, ?)`,
      [diagnostico, anotacoes, id_paciente, id_profi, id_atendimento]
    );
    return result.insertId;
  },
  async findAll() {
    const [rows] = await db.query(
      `SELECT pr.*, p.nome_paciente, f.nome_profi, a.tipo_atendimento
       FROM Prontuario pr
       LEFT JOIN Paciente p ON pr.id_paciente = p.id_paciente
       LEFT JOIN Profissional f ON pr.id_profi = f.id_profi
       LEFT JOIN Atendimento a ON pr.id_atendimento = a.id_atendimento`
    );
    return rows;
  },
  async findById(id) {
    const [rows] = await db.query(
      `SELECT pr.*, p.nome_paciente, f.nome_profi, a.tipo_atendimento
       FROM Prontuario pr
       LEFT JOIN Paciente p ON pr.id_paciente = p.id_paciente
       LEFT JOIN Profissional f ON pr.id_profi = f.id_profi
       LEFT JOIN Atendimento a ON pr.id_atendimento = a.id_atendimento
       WHERE pr.id_prontuario = ?`,
      [id]
    );
    return rows[0];
  },
  async update(id, data) {
    const { diagnostico, anotacoes, id_paciente, id_profi, id_atendimento } = data;
    const [result] = await db.query(
      `UPDATE Prontuario SET diagnostico = ?, anotacoes = ?, id_paciente = ?, id_profi = ?, id_atendimento = ?
       WHERE id_prontuario = ?`,
      [diagnostico, anotacoes, id_paciente, id_profi, id_atendimento, id]
    );
    return result.affectedRows;
  },
  async delete(id) {
    const [result] = await db.query('DELETE FROM Prontuario WHERE id_prontuario = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Prontuario;