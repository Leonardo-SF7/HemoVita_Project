const Historico = require('../models/Historico');

exports.createHistorico = async (req, res) => {
  try {
    const id = await Historico.create(req.body);
    res.status(201).json({ id, message: 'Histórico cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar histórico', error: err.message });
  }
};

exports.listHistoricos = async (req, res) => {
  try {
    const historicos = await Historico.findAll();
    res.json(historicos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar históricos', error: err.message });
  }
};

exports.getHistoricoById = async (req, res) => {
  try {
    const historico = await Historico.findById(req.params.id);
    if (!historico) return res.status(404).json({ message: 'Histórico não encontrado' });
    res.json(historico);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar histórico', error: err.message });
  }
};

exports.updateHistorico = async (req, res) => {
  try {
    const updated = await Historico.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Histórico não encontrado' });
    res.json({ message: 'Histórico atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar histórico', error: err.message });
  }
};

exports.deleteHistorico = async (req, res) => {
  try {
    const deleted = await Historico.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Histórico não encontrado' });
    res.json({ message: 'Histórico deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar histórico', error: err.message });
  }
};