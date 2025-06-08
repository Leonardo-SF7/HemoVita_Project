const db = require('../utils/db');

const ChecklistTriagem = {
  async create(data) {
    const { descricao, dt_checklist, id_paciente, id_profi } = data;
    const [result] = await db.query(
      `INSERT INTO ChecklistTriagem (descricao, dt_checklist, id_paciente, id_profi)
       VALUES (?, ?, ?, ?)`,
      [descricao, dt_checklist, id_paciente, id_profi]
    );
    return result.insertId;
  },
  async findAll() {
    const [rows] = await db.query(
      `SELECT c.*, p.nome_paciente, f.nome_profi
       FROM ChecklistTriagem c
       LEFT JOIN Paciente p ON c.id_paciente = p.id_paciente
       LEFT JOIN Profissional f ON c.id_profi = f.id_profi`
    );
    return rows;
  },
  async findById(id) {
    const [rows] = await db.query(
      `SELECT c.*, p.nome_paciente, f.nome_profi
       FROM ChecklistTriagem c
       LEFT JOIN Paciente p ON c.id_paciente = p.id_paciente
       LEFT JOIN Profissional f ON c.id_profi = f.id_profi
       WHERE c.id_checklist = ?`,
      [id]
    );
    return rows[0];
  },
  async update(id, data) {
    const { descricao, dt_checklist, id_paciente, id_profi } = data;
    const [result] = await db.query(
      `UPDATE ChecklistTriagem SET descricao = ?, dt_checklist = ?, id_paciente = ?, id_profi = ?
       WHERE id_checklist = ?`,
      [descricao, dt_checklist, id_paciente, id_profi, id]
    );
    return result.affectedRows;
  },
  async delete(id) {
    const [result] = await db.query('DELETE FROM ChecklistTriagem WHERE id_checklist = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = ChecklistTriagem;