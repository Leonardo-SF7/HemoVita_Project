const db = require('../utils/db');

const Paciente = {
  async create(data) {
    const {
      nome_paciente, idade, sexo, t_sanguineo, endereco,
      est_civil, dt_nascimento, nome_acomp, cpf_acomp
    } = data;
    const [result] = await db.query(
      `INSERT INTO Paciente 
      (nome_paciente, idade, sexo, t_sanguineo, endereco, est_civil, dt_nascimento, nome_acomp, cpf_acomp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome_paciente, idade, sexo, t_sanguineo, endereco, est_civil, dt_nascimento, nome_acomp, cpf_acomp]
    );
    return result.insertId;
  },

  async findAll() {
    const [rows] = await db.query('SELECT * FROM Paciente');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM Paciente WHERE id_paciente = ?', [id]);
    return rows[0];
  },

  async update(id, data) {
    const {
      nome_paciente, idade, sexo, t_sanguineo, endereco,
      est_civil, dt_nascimento, nome_acomp, cpf_acomp
    } = data;
    await db.query(
      `UPDATE Paciente SET 
      nome_paciente = ?, idade = ?, sexo = ?, t_sanguineo = ?, 
      endereco = ?, est_civil = ?, dt_nascimento = ?, 
      nome_acomp = ?, cpf_acomp = ? 
      WHERE id_paciente = ?`,
      [nome_paciente, idade, sexo, t_sanguineo, endereco, est_civil, dt_nascimento, nome_acomp, cpf_acomp, id]
    );
  },

  async delete(id) {
    const [result] = await db.query('DELETE FROM Paciente WHERE id_paciente = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Paciente;

