const db = require('../utils/db');

const Profissional = {
  async create(data) {
    const { nome_profi, reg_profi, agenda, contato, especialidade, id_usuario } = data;
    const [result] = await db.query(
      `INSERT INTO Profissional 
      (nome_profi, reg_profi, agenda, contato, especialidade, id_usuario)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [nome_profi, reg_profi, agenda, contato, especialidade, id_usuario]
    );
    return result.insertId;
  },
  async findAll() {
    const [rows] = await db.query('SELECT * FROM Profissional');
    return rows;
  },
  async findById(id) {
    const [rows] = await db.query('SELECT * FROM Profissional WHERE id_profi = ?', [id]);
    return rows[0];
  },
  async update(id, data) {
    const { nome_profi, reg_profi, agenda, contato, especialidade, id_usuario } = data;
    const [result] = await db.query(
      `UPDATE Profissional SET 
        nome_profi = ?, reg_profi = ?, agenda = ?, contato = ?, especialidade = ?, id_usuario = ?
      WHERE id_profi = ?`,
      [nome_profi, reg_profi, agenda, contato, especialidade, id_usuario, id]
    );
    return result.affectedRows;
  },
  async delete(id) {
    const [result] = await db.query('DELETE FROM Profissional WHERE id_profi = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Profissional;