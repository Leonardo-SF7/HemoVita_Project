const Triagem = require('../models/Triagem');

exports.createTriagem = async (req, res) => {
  try {
    const id = await Triagem.create(req.body);
    res.status(201).json({ id, message: 'Triagem cadastrada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar triagem', error: err.message });
  }
};

exports.listTriagens = async (req, res) => {
  try {
    const triagens = await Triagem.findAll();
    res.json(triagens);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar triagens', error: err.message });
  }
};

exports.getTriagemById = async (req, res) => {
  try {
    const triagem = await Triagem.findById(req.params.id);
    if (!triagem) return res.status(404).json({ message: 'Triagem não encontrada' });
    res.json(triagem);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar triagem', error: err.message });
  }
};

exports.updateTriagem = async (req, res) => {
  try {
    const updated = await Triagem.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Triagem não encontrada' });
    res.json({ message: 'Triagem atualizada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar triagem', error: err.message });
  }
};

exports.deleteTriagem = async (req, res) => {
  try {
    const deleted = await Triagem.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Triagem não encontrada' });
    res.json({ message: 'Triagem deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar triagem', error: err.message });
  }
};