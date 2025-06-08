import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useFeedback } from '../contexts/FeedbackContext';
import {
  TextField, Button, List, ListItem, ListItemText, Box, Typography,
  Paper, Divider, Grid, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';

function Prontuarios() {
  const [prontuarios, setProntuarios] = useState([]);
  const [error, setError] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [anotacoes, setAnotacoes] = useState('');
  const [idPaciente, setIdPaciente] = useState('');
  const [idProfi, setIdProfi] = useState('');
  const [idAtendimento, setIdAtendimento] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [atendimentos, setAtendimentos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [novoDiagnostico, setNovoDiagnostico] = useState('');
  const [novasAnotacoes, setNovasAnotacoes] = useState('');
  const [novoIdPaciente, setNovoIdPaciente] = useState('');
  const [novoIdProfi, setNovoIdProfi] = useState('');
  const [novoIdAtendimento, setNovoIdAtendimento] = useState('');
  const { token } = useAuth();
  const { showMessage } = useFeedback();

  useEffect(() => {
    fetchProntuarios();
    axios.get('http://localhost:3001/api/pacientes', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setPacientes(res.data));
    axios.get('http://localhost:3001/api/profissionais', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProfissionais(res.data));
    axios.get('http://localhost:3001/api/atendimentos', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setAtendimentos(res.data));
    // eslint-disable-next-line
  }, [token]);

  async function fetchProntuarios() {
    try {
      const response = await axios.get('http://localhost:3001/api/prontuarios', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProntuarios(response.data);
    } catch (err) {
      setError('Erro ao buscar prontuários');
      showMessage('Erro ao buscar prontuários', 'error');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3001/api/prontuarios', {
        diagnostico,
        anotacoes,
        id_paciente: idPaciente,
        id_profi: idProfi,
        id_atendimento: idAtendimento
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDiagnostico('');
      setAnotacoes('');
      setIdPaciente('');
      setIdProfi('');
      setIdAtendimento('');
      fetchProntuarios();
      showMessage('Prontuário cadastrado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao cadastrar prontuário');
      showMessage('Erro ao cadastrar prontuário', 'error');
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3001/api/prontuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProntuarios();
      showMessage('Prontuário deletado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao deletar prontuário');
      showMessage('Erro ao deletar prontuário', 'error');
    }
  }

  function startEdit(prontuario) {
    setEditando(prontuario.id_prontuario);
    setNovoDiagnostico(prontuario.diagnostico);
    setNovasAnotacoes(prontuario.anotacoes);
    setNovoIdPaciente(prontuario.id_paciente);
    setNovoIdProfi(prontuario.id_profi);
    setNovoIdAtendimento(prontuario.id_atendimento);
  }

  async function handleEdit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/prontuarios/${editando}`, {
        diagnostico: novoDiagnostico,
        anotacoes: novasAnotacoes,
        id_paciente: novoIdPaciente,
        id_profi: novoIdProfi,
        id_atendimento: novoIdAtendimento
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditando(null);
      fetchProntuarios();
      showMessage('Prontuário editado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao editar prontuário');
      showMessage('Erro ao editar prontuário', 'error');
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
          Prontuários
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="Diagnóstico"
                value={diagnostico}
                onChange={e => setDiagnostico(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Anotações"
                value={anotacoes}
                onChange={e => setAnotacoes(e.target.value)}
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Paciente"
                value={idPaciente}
                onChange={e => setIdPaciente(e.target.value)}
                required
                fullWidth
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Selecione</option>
                {pacientes.map(p => (
                  <option key={p.id_paciente} value={p.id_paciente}>{p.nome_paciente}</option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Profissional"
                value={idProfi}
                onChange={e => setIdProfi(e.target.value)}
                required
                fullWidth
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Selecione</option>
                {profissionais.map(p => (
                  <option key={p.id_profi} value={p.id_profi}>{p.nome_profi}</option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Atendimento"
                value={idAtendimento}
                onChange={e => setIdAtendimento(e.target.value)}
                required
                fullWidth
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Selecione</option>
                {atendimentos.map(a => (
                  <option key={a.id_atendimento} value={a.id_atendimento}>{a.id_atendimento}</option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<DescriptionIcon />}
                fullWidth
                sx={{ height: '100%' }}
              >
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </form>
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        <Divider sx={{ my: 3 }} />
        <List>
          {prontuarios.map(prontuario => (
            <ListItem
              key={prontuario.id_prontuario}
              secondaryAction={
                editando !== prontuario.id_prontuario && (
                  <>
                    <IconButton onClick={() => startEdit(prontuario)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(prontuario.id_prontuario)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </>
                )
              }
              sx={{ mb: 1, borderRadius: 1, bgcolor: editando === prontuario.id_prontuario ? 'grey.100' : 'inherit' }}
            >
              {editando === prontuario.id_prontuario ? (
                <form onSubmit={handleEdit} style={{ display: 'flex', gap: 8, width: '100%' }}>
                  <TextField
                    value={novoDiagnostico}
                    onChange={e => setNovoDiagnostico(e.target.value)}
                    required
                    size="small"
                    fullWidth
                  />
                  <TextField
                    value={novasAnotacoes}
                    onChange={e => setNovasAnotacoes(e.target.value)}
                    multiline
                    rows={3}
                    size="small"
                    fullWidth
                  />
                  <TextField
                    select
                    label="Paciente"
                    value={novoIdPaciente}
                    onChange={e => setNovoIdPaciente(e.target.value)}
                    required
                    size="small"
                    fullWidth
                    SelectProps={{ native: true }}
                    InputLabelProps={{ shrink: true }}
                  >
                    <option value="">Selecione</option>
                    {pacientes.map(p => (
                      <option key={p.id_paciente} value={p.id_paciente}>{p.nome_paciente}</option>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Profissional"
                    value={novoIdProfi}
                    onChange={e => setNovoIdProfi(e.target.value)}
                    required
                    size="small"
                    fullWidth
                    SelectProps={{ native: true }}
                    InputLabelProps={{ shrink: true }}
                  >
                    <option value="">Selecione</option>
                    {profissionais.map(p => (
                      <option key={p.id_profi} value={p.id_profi}>{p.nome_profi}</option>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Atendimento"
                    value={novoIdAtendimento}
                    onChange={e => setNovoIdAtendimento(e.target.value)}
                    required
                    size="small"
                    fullWidth
                    SelectProps={{ native: true }}
                    InputLabelProps={{ shrink: true }}
                  >
                    <option value="">Selecione</option>
                    {atendimentos.map(a => (
                      <option key={a.id_atendimento} value={a.id_atendimento}>{a.id_atendimento}</option>
                    ))}
                  </TextField>
                  <Button type="submit" size="small" variant="contained" color="primary">Salvar</Button>
                  <Button type="button" onClick={() => setEditando(null)} size="small" color="inherit">Cancelar</Button>
                </form>
              ) : (
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {prontuario.diagnostico}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {prontuario.anotacoes}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {`Paciente: ${prontuario.id_paciente}, Profissional: ${prontuario.id_profi}, Atendimento: ${prontuario.id_atendimento}`}
                      </Typography>
                    </Box>
                  }
                />
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Prontuarios;