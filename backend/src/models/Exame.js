const db = require('../utils/db');

const Exame = {
  async create(data) {
    const { tipo_exame, resultado, dt_exame, id_paciente, id_profi } = data;
    const [result] = await db.query(
      `INSERT INTO Exame (tipo_exame, resultado, dt_exame, id_paciente, id_profi)
       VALUES (?, ?, ?, ?, ?)`,
      [tipo_exame, resultado, dt_exame, id_paciente, id_profi]
    );
    return result.insertId;
  },
  async findAll() {
    const [rows] = await db.query('SELECT * FROM Exame');
    return rows;
  },
  async findById(id) {
    const [rows] = await db.query('SELECT * FROM Exame WHERE id_exame = ?', [id]);
    return rows[0];
  },
  async update(id, data) {
    const { tipo_exame, resultado, dt_exame, id_paciente, id_profi } = data;
    const [result] = await db.query(
      `UPDATE Exame SET tipo_exame = ?, resultado = ?, dt_exame = ?, id_paciente = ?, id_profi = ?
       WHERE id_exame = ?`,
      [tipo_exame, resultado, dt_exame, id_paciente, id_profi, id]
    );
    return result.affectedRows;
  },
  async delete(id) {
    const [result] = await db.query('DELETE FROM Exame WHERE id_exame = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Exame;