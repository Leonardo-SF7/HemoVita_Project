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
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

function Profissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [error, setError] = useState('');
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [regProfi, setRegProfi] = useState('');
  const [agenda, setAgenda] = useState('');
  const [contato, setContato] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);
  const [novoNome, setNovoNome] = useState('');
  const [novoCargo, setNovoCargo] = useState('');
  const [filtro, setFiltro] = useState('');
  const { token } = useAuth();
  const { showMessage } = useFeedback();

  useEffect(() => {
    fetchProfissionais();
    axios.get('http://localhost:3001/api/usuarios', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsuarios(res.data));
    // eslint-disable-next-line
  }, [token]);

  async function fetchProfissionais() {
    try {
      const response = await axios.get('http://localhost:3001/api/profissionais', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfissionais(response.data);
    } catch (err) {
      setError('Erro ao buscar profissionais');
      showMessage('Erro ao buscar profissionais', 'error');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3001/api/profissionais', {
        nome_profi: nome,
        reg_profi: regProfi,
        agenda,
        contato,
        especialidade,
        id_usuario: idUsuario
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNome('');
      setRegProfi('');
      setAgenda('');
      setContato('');
      setEspecialidade('');
      setIdUsuario('');
      fetchProfissionais();
      showMessage('Profissional cadastrado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao cadastrar profissional');
      showMessage('Erro ao cadastrar profissional', 'error');
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3001/api/profissionais/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProfissionais();
      showMessage('Profissional deletado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao deletar profissional');
      showMessage('Erro ao deletar profissional', 'error');
    }
  }

  function startEdit(prof) {
    setEditando(prof.id_profi);
    setNovoNome(prof.nome_profi);
    setNovoCargo(prof.cargo);
  }

  async function handleEdit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/profissionais/${editando}`, {
        nome_profi: novoNome,
        cargo: novoCargo
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditando(null);
      fetchProfissionais();
      showMessage('Profissional editado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao editar profissional');
      showMessage('Erro ao editar profissional', 'error');
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
          Profissionais
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nome do Profissional"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Registro Profissional"
                value={regProfi}
                onChange={e => setRegProfi(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Agenda"
                type="text"
                value={agenda}
                onChange={e => setAgenda(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contato"
                value={contato}
                onChange={e => setContato(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Especialidade"
                value={especialidade}
                onChange={e => setEspecialidade(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Usuário do Sistema"
                value={idUsuario}
                onChange={e => setIdUsuario(e.target.value)}
                required
                fullWidth
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Selecione</option>
                {usuarios.map(u => (
                  <option key={u.id_usuario} value={u.id_usuario}>{u.email}</option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<PersonAddAltIcon />}
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
          label="Buscar profissional"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          fullWidth
          sx={{ mt: 3,  mb: 2 }}
        />
        <Divider sx={{ my: 3 }} />
        <List>
          {profissionais
            .filter(p => p.nome_profi.toLowerCase().includes(filtro.toLowerCase()))
            .map(prof => (
              <ListItem
                key={prof.id_profi}
                secondaryAction={
                  editando !== prof.id_profi && (
                    <>
                      <IconButton onClick={() => startEdit(prof)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(prof.id_profi)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )
                }
                sx={{ mb: 1, borderRadius: 1, bgcolor: editando === prof.id_profi ? 'grey.100' : 'inherit' }}
              >
                {editando === prof.id_profi ? (
                  <form onSubmit={handleEdit} style={{ display: 'flex', gap: 8, width: '100%' }}>
                    <TextField
                      value={novoNome}
                      onChange={e => setNovoNome(e.target.value)}
                      required
                      size="small"
                      fullWidth
                    />
                    <TextField
                      value={novoCargo}
                      onChange={e => setNovoCargo(e.target.value)}
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
                        {prof.nome_profi}
                      </Typography>
                    }
                    secondary={prof.cargo}
                  />
                )}
              </ListItem>
            ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Profissionais;