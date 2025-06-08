const Atestado = require('../models/Atestado');

exports.createAtestado = async (req, res) => {
  try {
    const id = await Atestado.create(req.body);
    res.status(201).json({ id, message: 'Atestado cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar atestado', error: err.message });
  }
};

exports.listAtestados = async (req, res) => {
  try {
    const atestados = await Atestado.findAll();
    res.json(atestados);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar atestados', error: err.message });
  }
};

exports.getAtestadoById = async (req, res) => {
  try {
    const atestado = await Atestado.findById(req.params.id);
    if (!atestado) return res.status(404).json({ message: 'Atestado não encontrado' });
    res.json(atestado);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar atestado', error: err.message });
  }
};

exports.updateAtestado = async (req, res) => {
  try {
    const updated = await Atestado.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Atestado não encontrado' });
    res.json({ message: 'Atestado atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar atestado', error: err.message });
  }
};

exports.deleteAtestado = async (req, res) => {
  try {
    const deleted = await Atestado.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Atestado não encontrado' });
    res.json({ message: 'Atestado deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar atestado', error: err.message });
  }
};