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
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';

function Farmacia() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [error, setError] = useState('');
  const [nome, setNome] = useState('');
  const [editando, setEditando] = useState(null);
  const [novoNome, setNovoNome] = useState('');
  const [filtro, setFiltro] = useState('');
  const { token } = useAuth();
  const { showMessage } = useFeedback();

  useEffect(() => {
    fetchMedicamentos();
    // eslint-disable-next-line
  }, [token]);

  async function fetchMedicamentos() {
    try {
      const response = await axios.get('http://localhost:3001/api/farmacia', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMedicamentos(response.data);
    } catch (err) {
      setError('Erro ao buscar medicamentos');
      showMessage('Erro ao buscar medicamentos', 'error');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3001/api/farmacia', {
        nome_medicamento: nome
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNome('');
      fetchMedicamentos();
      showMessage('Medicamento cadastrado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao cadastrar medicamento');
      showMessage('Erro ao cadastrar medicamento', 'error');
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3001/api/farmacia/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMedicamentos();
      showMessage('Medicamento deletado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao deletar medicamento');
      showMessage('Erro ao deletar medicamento', 'error');
    }
  }

  function startEdit(med) {
    setEditando(med.id_medicamento);
    setNovoNome(med.nome_medicamento);
  }

  async function handleEdit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/farmacia/${editando}`, {
        nome_medicamento: novoNome
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditando(null);
      fetchMedicamentos();
      showMessage('Medicamento editado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao editar medicamento');
      showMessage('Erro ao editar medicamento', 'error');
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
          Farmácia
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={10}>
              <TextField
                label="Nome do Medicamento"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<LocalPharmacyIcon />}
                fullWidth
                sx={{ height: '100%' }}
              >
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </form>
        <TextField
          label="Buscar medicamento"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        />
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        <Divider sx={{ my: 3 }} />
        <List>
          {medicamentos
            .filter(m => m.nome_medicamento.toLowerCase().includes(filtro.toLowerCase()))
            .map(med => (
              <ListItem
                key={med.id_medicamento}
                secondaryAction={
                  editando !== med.id_medicamento && (
                    <>
                      <IconButton onClick={() => startEdit(med)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(med.id_medicamento)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )
                }
                sx={{ mb: 1, borderRadius: 1, bgcolor: editando === med.id_medicamento ? 'grey.100' : 'inherit' }}
              >
                {editando === med.id_medicamento ? (
                  <form onSubmit={handleEdit} style={{ display: 'flex', gap: 8, width: '100%' }}>
                    <TextField
                      value={novoNome}
                      onChange={e => setNovoNome(e.target.value)}
                      required
                      size="small"
                      fullWidth
                    />
                    <Button type="submit" size="small" variant="contained" color="primary">Salvar</Button>
                    <Button type="button" onClick={() => setEditando(null)} size="small" color="inherit">Cancelar</Button>
                  </form>
                ) : (
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {med.nome_medicamento}
                      </Typography>
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

export default Farmacia;