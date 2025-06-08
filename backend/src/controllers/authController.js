const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await Usuario.findByEmail(email);
    if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) return res.status(401).json({ message: 'Senha inválida' });

    const token = jwt.sign(
      { id: user.id_usuario, email: user.email, status: user.status, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no login', error: err.message });
  }
};

exports.updatePermissao = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;
    if (!role) return res.status(400).json({ message: 'Papel (role) é obrigatório' });

    const updated = await Usuario.updateRole(id, role);
    if (!updated) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.json({ message: 'Permissão atualizada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar permissão', error: err.message });
  }
};