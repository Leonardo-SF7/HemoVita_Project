const Prontuario = require('../models/Prontuario');

exports.createProntuario = async (req, res) => {
  try {
    const id = await Prontuario.create(req.body);
    res.status(201).json({ id, message: 'Prontuário cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar prontuário', error: err.message });
  }
};

exports.listProntuarios = async (req, res) => {
  try {
    const prontuarios = await Prontuario.findAll();
    res.json(prontuarios);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar prontuários', error: err.message });
  }
};

exports.getProntuarioById = async (req, res) => {
  try {
    const prontuario = await Prontuario.findById(req.params.id);
    if (!prontuario) return res.status(404).json({ message: 'Prontuário não encontrado' });
    res.json(prontuario);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar prontuário', error: err.message });
  }
};

exports.updateProntuario = async (req, res) => {
  try {
    const updated = await Prontuario.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Prontuário não encontrado' });
    res.json({ message: 'Prontuário atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar prontuário', error: err.message });
  }
};

exports.deleteProntuario = async (req, res) => {
  try {
    const deleted = await Prontuario.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Prontuário não encontrado' });
    res.json({ message: 'Prontuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar prontuário', error: err.message });
  }
};