const Paciente = require('../models/Paciente');

exports.createPaciente = async (req, res) => {
  try {
    const id = await Paciente.create(req.body);
    res.status(201).json({ id, message: 'Paciente cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar paciente', error: err.message });
  }
};

exports.listPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar pacientes', error: err.message });
  }
};

exports.getPacienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const paciente = await Paciente.findById(id);
    if (!paciente) return res.status(404).json({ message: 'Paciente não encontrado' });
    res.json(paciente);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar paciente', error: err.message });
  }
}

exports.updatePaciente = async (req, res) => {
  const { id } = req.params;
  try {
    await Paciente.update(id, req.body);
    res.json({ message: 'Paciente atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar paciente', error: err.message });
  }
};

exports.deletePaciente = async (req, res) => {
  const { id } = req.params;
  try {
    await Paciente.delete(id);
    res.json({ message: 'Paciente deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar paciente', error: err.message });
  }
}