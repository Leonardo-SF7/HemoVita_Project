const db = require('../utils/db');

const Atestado = {
  async create(data) {
    const { descricao, dt_emissao, id_paciente, id_profi } = data;
    const [result] = await db.query(
      `INSERT INTO Atestado (descricao, dt_emissao, id_paciente, id_profi)
       VALUES (?, ?, ?, ?)`,
      [descricao, dt_emissao, id_paciente, id_profi]
    );
    return result.insertId;
  },
  async findAll() {
    const [rows] = await db.query(
      `SELECT a.*, p.nome_paciente, f.nome_profi
       FROM Atestado a
       LEFT JOIN Paciente p ON a.id_paciente = p.id_paciente
       LEFT JOIN Profissional f ON a.id_profi = f.id_profi`
    );
    return rows;
  },
  async findById(id) {
    const [rows] = await db.query(
      `SELECT a.*, p.nome_paciente, f.nome_profi
       FROM Atestado a
       LEFT JOIN Paciente p ON a.id_paciente = p.id_paciente
       LEFT JOIN Profissional f ON a.id_profi = f.id_profi
       WHERE a.id_atestado = ?`,
      [id]
    );
    return rows[0];
  },
  async update(id, data) {
    const { descricao, dt_emissao, id_paciente, id_profi } = data;
    const [result] = await db.query(
      `UPDATE Atestado SET descricao = ?, dt_emissao = ?, id_paciente = ?, id_profi = ?
       WHERE id_atestado = ?`,
      [descricao, dt_emissao, id_paciente, id_profi, id]
    );
    return result.affectedRows;
  },
  async delete(id) {
    const [result] = await db.query('DELETE FROM Atestado WHERE id_atestado = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Atestado;