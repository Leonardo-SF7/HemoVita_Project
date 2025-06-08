const Atendimento = require('../models/Atendimento');

exports.createAtendimento = async (req, res) => {
  try {
    const id = await Atendimento.create(req.body);
    res.status(201).json({ id, message: 'Atendimento cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar atendimento', error: err.message });
  }
};

exports.listAtendimentos = async (req, res) => {
  try {
    const atendimentos = await Atendimento.findAll();
    res.json(atendimentos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar atendimentos', error: err.message });
  }
};

exports.getAtendimentoById = async (req, res) => {
  try {
    const atendimento = await Atendimento.findById(req.params.id);
    if (!atendimento) return res.status(404).json({ message: 'Atendimento não encontrado' });
    res.json(atendimento);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar atendimento', error: err.message });
  }
};

exports.updateAtendimento = async (req, res) => {
  try {
    const updated = await Atendimento.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Atendimento não encontrado' });
    res.json({ message: 'Atendimento atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar atendimento', error: err.message });
  }
};

exports.deleteAtendimento = async (req, res) => {
  try {
    const deleted = await Atendimento.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Atendimento não encontrado' });
    res.json({ message: 'Atendimento deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar atendimento', error: err.message });
  }
};