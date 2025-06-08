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
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

function Triagem() {
  const [triagens, setTriagens] = useState([]);
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
    fetchTriagens();
    axios.get('http://localhost:3001/api/pacientes', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setPacientes(res.data));
    axios.get('http://localhost:3001/api/profissionais', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProfissionais(res.data));
    // eslint-disable-next-line
  }, [token]);

  async function fetchTriagens() {
    try {
      const response = await axios.get('http://localhost:3001/api/triagens', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTriagens(response.data);
    } catch (err) {
      setError('Erro ao buscar triagens');
      showMessage('Erro ao buscar triagens', 'error');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3001/api/triagens', {
        descricao,
        dt_triagem: data,
        id_paciente: idPaciente,
        id_profi: idProfi
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDescricao('');
      setData('');
      setIdPaciente('');
      setIdProfi('');
      fetchTriagens();
      showMessage('Triagem cadastrada com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao cadastrar triagem');
      showMessage('Erro ao cadastrar triagem', 'error');
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3001/api/triagens/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTriagens();
      showMessage('Triagem deletada com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao deletar triagem');
      showMessage('Erro ao deletar triagem', 'error');
    }
  }

  function startEdit(triagem) {
    setEditando(triagem.id_triagem);
    setNovaDescricao(triagem.descricao);
    setNovaData(triagem.dt_triagem);
  }

  async function handleEdit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/triagens/${editando}`, {
        descricao: novaDescricao,
        dt_triagem: novaData
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditando(null);
      fetchTriagens();
      showMessage('Triagem editada com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao editar triagem');
      showMessage('Erro ao editar triagem', 'error');
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
          Triagem
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
                startIcon={<MedicalServicesIcon />}
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
          {triagens.map(triagem => (
            <ListItem
              key={triagem.id_triagem}
              secondaryAction={
                editando !== triagem.id_triagem && (
                  <>
                    <IconButton onClick={() => startEdit(triagem)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(triagem.id_triagem)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </>
                )
              }
              sx={{ mb: 1, borderRadius: 1, bgcolor: editando === triagem.id_triagem ? 'grey.100' : 'inherit' }}
            >
              {editando === triagem.id_triagem ? (
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
                      {triagem.descricao}
                    </Typography>
                  }
                  secondary={triagem.dt_triagem}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Triagem;