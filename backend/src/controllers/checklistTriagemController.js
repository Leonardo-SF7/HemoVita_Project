const ChecklistTriagem = require('../models/ChecklistTriagem');

exports.createChecklist = async (req, res) => {
  try {
    const id = await ChecklistTriagem.create(req.body);
    res.status(201).json({ id, message: 'Checklist de triagem cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar checklist', error: err.message });
  }
};

exports.listChecklists = async (req, res) => {
  try {
    const checklists = await ChecklistTriagem.findAll();
    res.json(checklists);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar checklists', error: err.message });
  }
};

exports.getChecklistById = async (req, res) => {
  try {
    const checklist = await ChecklistTriagem.findById(req.params.id);
    if (!checklist) return res.status(404).json({ message: 'Checklist não encontrado' });
    res.json(checklist);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar checklist', error: err.message });
  }
};

exports.updateChecklist = async (req, res) => {
  try {
    const updated = await ChecklistTriagem.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Checklist não encontrado' });
    res.json({ message: 'Checklist atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar checklist', error: err.message });
  }
};

exports.deleteChecklist = async (req, res) => {
  try {
    const deleted = await ChecklistTriagem.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Checklist não encontrado' });
    res.json({ message: 'Checklist deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar checklist', error: err.message });
  }
};