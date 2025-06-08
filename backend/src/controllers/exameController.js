const Exame = require('../models/Exame');

exports.createExame = async (req, res) => {
  try {
    const id = await Exame.create(req.body);
    res.status(201).json({ id, message: 'Exame cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar exame', error: err.message });
  }
};

exports.listExames = async (req, res) => {
  try {
    const exames = await Exame.findAll();
    res.json(exames);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar exames', error: err.message });
  }
};

exports.getExameById = async (req, res) => {
  try {
    const exame = await Exame.findById(req.params.id);
    if (!exame) return res.status(404).json({ message: 'Exame não encontrado' });
    res.json(exame);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar exame', error: err.message });
  }
};

exports.updateExame = async (req, res) => {
  try {
    const updated = await Exame.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Exame não encontrado' });
    res.json({ message: 'Exame atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar exame', error: err.message });
  }
};

exports.deleteExame = async (req, res) => {
  try {
    const deleted = await Exame.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Exame não encontrado' });
    res.json({ message: 'Exame deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar exame', error: err.message });
  }
};