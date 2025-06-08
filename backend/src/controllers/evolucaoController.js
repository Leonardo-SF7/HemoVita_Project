const Evolucao = require('../models/Evolucao');

exports.createEvolucao = async (req, res) => {
  try {
    const id = await Evolucao.create(req.body);
    res.status(201).json({ id, message: 'Evolução cadastrada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar evolução', error: err.message });
  }
};

exports.listEvolucoes = async (req, res) => {
  try {
    const evolucoes = await Evolucao.findAll();
    res.json(evolucoes);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar evoluções', error: err.message });
  }
};

exports.getEvolucaoById = async (req, res) => {
  try {
    const evolucao = await Evolucao.findById(req.params.id);
    if (!evolucao) return res.status(404).json({ message: 'Evolução não encontrada' });
    res.json(evolucao);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar evolução', error: err.message });
  }
};

exports.updateEvolucao = async (req, res) => {
  try {
    const updated = await Evolucao.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Evolução não encontrada' });
    res.json({ message: 'Evolução atualizada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar evolução', error: err.message });
  }
};

exports.deleteEvolucao = async (req, res) => {
  try {
    const deleted = await Evolucao.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Evolução não encontrada' });
    res.json({ message: 'Evolução deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar evolução', error: err.message });
  }
};