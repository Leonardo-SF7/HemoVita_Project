const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../utils/db');

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

    console.log('Senha digitada:', senha);
    console.log('Hash no banco:', user.senha);
    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) return res.status(401).json({ message: 'Senha inválida' });

    const token = jwt.sign(
      { id: user.id_usuario, role: user.role },
      process.env.JWT_SECRET || 'segredo',
      { expiresIn: '8h' }
    );
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Erro no login', error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id_usuario, email, role FROM Usuarios');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error: err.message });
  }
};

exports.create = async (req, res) => {
  const { email, senha, role } = req.body;
  try {
    const hash = await bcrypt.hash(senha, 10);
    await db.query('INSERT INTO Usuarios (email, senha, role) VALUES (?, ?, ?)', [email, hash, role]);
    res.status(201).json({ message: 'Usuário criado' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error: err.message });
  }
};

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    await db.query('UPDATE Usuarios SET role = ? WHERE id_usuario = ?', [role, id]);
    res.json({ message: 'Permissão atualizada' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar permissão', error: err.message });
  }
};