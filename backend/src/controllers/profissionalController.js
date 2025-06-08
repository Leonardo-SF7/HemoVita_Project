const Profissional = require('../models/Profissional');
const bcrypt = require('bcryptjs');

exports.create = async (req, res) => {
  const { nome, cargo, crm, especialidade, email, senha, status } = req.body;
};

exports.createProfissional = async (req, res) => {
  try {
    const { nome_profi, reg_profi, agenda, contato, especialidade, id_usuario } = req.body;

    const id = await Profissional.create({
      nome_profi,
      reg_profi,
      agenda,
      contato,
      especialidade,
      id_usuario
    });

    res.status(201).json({ id, message: 'Profissional cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar profissional', error: err.message });
  }
};

exports.listProfissionais = async (req, res) => {
  try {
    const profissionais = await Profissional.findAll();
    res.json(profissionais);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar profissionais', error: err.message });
  }
};

exports.getProfissionalById = async (req, res) => {
  try {
    const profissional = await Profissional.findById(req.params.id);
    if (!profissional) return res.status(404).json({ message: 'Profissional não encontrado' });
    res.json(profissional);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar profissional', error: err.message });
  }
};

exports.updateProfissional = async (req, res) => {
  try {
    const updated = await Profissional.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Profissional não encontrado' });
    res.json({ message: 'Profissional atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar profissional', error: err.message });
  }
};

exports.deleteProfissional = async (req, res) => {
  try {
    const deleted = await Profissional.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Profissional não encontrado' });
    res.json({ message: 'Profissional deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar profissional', error: err.message });
  }
};