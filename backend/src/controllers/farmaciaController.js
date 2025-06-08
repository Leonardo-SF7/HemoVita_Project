const Farmacia = require('../models/Farmacia');

exports.createMedicamento = async (req, res) => {
  try {
    const id = await Farmacia.create(req.body);
    res.status(201).json({ id, message: 'Medicamento cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar medicamento', error: err.message });
  }
};

exports.listMedicamentos = async (req, res) => {
  try {
    const medicamentos = await Farmacia.findAll();
    res.json(medicamentos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar medicamentos', error: err.message });
  }
};

exports.getMedicamentoById = async (req, res) => {
  try {
    const medicamento = await Farmacia.findById(req.params.id);
    if (!medicamento) return res.status(404).json({ message: 'Medicamento não encontrado' });
    res.json(medicamento);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar medicamento', error: err.message });
  }
};

exports.updateMedicamento = async (req, res) => {
  try {
    const updated = await Farmacia.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Medicamento não encontrado' });
    res.json({ message: 'Medicamento atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar medicamento', error: err.message });
  }
};

exports.deleteMedicamento = async (req, res) => {
  try {
    const deleted = await Farmacia.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Medicamento não encontrado' });
    res.json({ message: 'Medicamento deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar medicamento', error: err.message });
  }
};