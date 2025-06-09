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
import AssignmentIcon from '@mui/icons-material/Assignment';

function Atestados() {
  const [atestados, setAtestados] = useState([]);
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
  const [filtro, setFiltro] = useState('');
  const { token } = useAuth();
  const { showMessage } = useFeedback();

  useEffect(() => {
    fetchAtestados();
    axios.get('http://localhost:3001/api/pacientes', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setPacientes(res.data));
    axios.get('http://localhost:3001/api/profissionais', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProfissionais(res.data));
    // eslint-disable-next-line
  }, [token]);

  async function fetchAtestados() {
    try {
      const response = await axios.get('http://localhost:3001/api/atestados', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAtestados(response.data);
    } catch (err) {
      setError('Erro ao buscar atestados');
      showMessage('Erro ao buscar atestados', 'error');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3001/api/atestados', {
        descricao,
        dt_emissao: data,
        id_paciente: idPaciente,
        id_profi: idProfi
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDescricao('');
      setData('');
      setIdPaciente('');
      setIdProfi('');
      fetchAtestados();
      showMessage('Atestado cadastrado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao cadastrar atestado');
      showMessage('Erro ao cadastrar atestado', 'error');
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3001/api/atestados/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAtestados();
      showMessage('Atestado deletado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao deletar atestado');
      showMessage('Erro ao deletar atestado', 'error');
    }
  }

  function startEdit(atestado) {
    setEditando(atestado.id_atestado);
    setNovaDescricao(atestado.descricao);
    setNovaData(atestado.dt_emissao);
  }

  async function handleEdit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/atestados/${editando}`, {
        descricao: novaDescricao,
        dt_emissao: novaData
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditando(null);
      fetchAtestados();
      showMessage('Atestado editado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao editar atestado');
      showMessage('Erro ao editar atestado', 'error');
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
          Atestados
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
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
                label="Descrição"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Data de Emissão"
                type="date"
                value={data}
                onChange={e => setData(e.target.value)}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<AssignmentIcon />}
                fullWidth
                sx={{ height: '100%' }}
              >
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </form>
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        <TextField
          label="Buscar atestado"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        />
        <Divider sx={{ my: 3 }} />
        <List>
          {atestados
            .filter(a => a.descricao.toLowerCase().includes(filtro.toLowerCase()))
            .map(atestado => (
              <ListItem
                key={atestado.id_atestado}
                secondaryAction={
                  editando !== atestado.id_atestado && (
                    <>
                      <IconButton onClick={() => startEdit(atestado)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(atestado.id_atestado)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )
                }
                sx={{ mb: 1, borderRadius: 1, bgcolor: editando === atestado.id_atestado ? 'grey.100' : 'inherit' }}
              >
                {editando === atestado.id_atestado ? (
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
                        {atestado.descricao}
                      </Typography>
                    }
                    secondary={atestado.dt_emissao}
                  />
                )}
              </ListItem>
            ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Atestados;