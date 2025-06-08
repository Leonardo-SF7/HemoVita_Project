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
import ChecklistIcon from '@mui/icons-material/Checklist';

function ChecklistTriagem() {
  const [checklists, setChecklists] = useState([]);
  const [error, setError] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [editando, setEditando] = useState(null);
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novaData, setNovaData] = useState('');
  const [idPaciente, setIdPaciente] = useState('');
  const [idProfi, setIdProfi] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const { token } = useAuth();
  const { showMessage } = useFeedback();

  useEffect(() => {
    fetchChecklists();
    axios.get('http://localhost:3001/api/pacientes', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setPacientes(res.data));
    axios.get('http://localhost:3001/api/profissionais', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProfissionais(res.data));
    // eslint-disable-next-line
  }, [token]);

  async function fetchChecklists() {
    try {
      const response = await axios.get('http://localhost:3001/api/checklists', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChecklists(response.data);
    } catch (err) {
      setError('Erro ao buscar checklists');
      showMessage('Erro ao buscar checklists', 'error');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3001/api/checklists', {
        descricao,
        dt_checklist: data,
        id_paciente: idPaciente,
        id_profi: idProfi
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDescricao('');
      setData('');
      setIdPaciente('');
      setIdProfi('');
      fetchChecklists();
      showMessage('Checklist cadastrado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao cadastrar checklist');
      showMessage('Erro ao cadastrar checklist', 'error');
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3001/api/checklists/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchChecklists();
      showMessage('Checklist deletado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao deletar checklist');
      showMessage('Erro ao deletar checklist', 'error');
    }
  }

  function startEdit(checklist) {
    setEditando(checklist.id_checklist);
    setNovaDescricao(checklist.descricao);
    setNovaData(checklist.dt_checklist);
  }

  async function handleEdit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/checklists/${editando}`, {
        descricao: novaDescricao,
        dt_checklist: novaData
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditando(null);
      fetchChecklists();
      showMessage('Checklist editado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao editar checklist');
      showMessage('Erro ao editar checklist', 'error');
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
          Checklist de Triagem
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                label="Descrição"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Data"
                type="date"
                value={data}
                onChange={e => setData(e.target.value)}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={2}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<ChecklistIcon />}
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
          {checklists.map(checklist => (
            <ListItem
              key={checklist.id_checklist}
              secondaryAction={
                editando !== checklist.id_checklist && (
                  <>
                    <IconButton onClick={() => startEdit(checklist)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(checklist.id_checklist)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </>
                )
              }
              sx={{ mb: 1, borderRadius: 1, bgcolor: editando === checklist.id_checklist ? 'grey.100' : 'inherit' }}
            >
              {editando === checklist.id_checklist ? (
                <form onSubmit={handleEdit} style={{ display: 'flex', gap: 8, width: '100%' }}>
                  <TextField
                    value={novaDescricao}
                    onChange={e => setNovaDescricao(e.target.value)}
                    required
                    size="small"
                    fullWidth
                  />
                  <TextField
                    type="date"
                    value={novaData}
                    onChange={e => setNovaData(e.target.value)}
                    required
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <Button type="submit" size="small" variant="contained" color="primary">Salvar</Button>
                  <Button type="button" onClick={() => setEditando(null)} size="small" color="inherit">Cancelar</Button>
                </form>
              ) : (
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {checklist.descricao}
                    </Typography>
                  }
                  secondary={checklist.dt_checklist}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default ChecklistTriagem;