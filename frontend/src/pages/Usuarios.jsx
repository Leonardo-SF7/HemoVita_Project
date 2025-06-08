import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useFeedback } from '../contexts/FeedbackContext';
import {
  TextField, Button, List, ListItem, ListItemText, Box, Typography,
  Paper, Divider, Grid, IconButton, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState('medico');
  const [editando, setEditando] = useState(null);
  const [novoRole, setNovoRole] = useState('');
  const { token, role: userRole } = useAuth();
  const { showMessage } = useFeedback();

  useEffect(() => {
    fetchUsuarios();
    // eslint-disable-next-line
  }, [token]);

  async function fetchUsuarios() {
    try {
      const response = await axios.get('http://localhost:3001/api/usuarios', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsuarios(response.data);
    } catch (err) {
      setError('Erro ao buscar usuários');
      showMessage('Erro ao buscar usuários', 'error');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3001/api/usuarios', {
        email,
        senha,
        role
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmail('');
      setSenha('');
      setRole('medico');
      fetchUsuarios();
      showMessage('Usuário cadastrado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao cadastrar usuário');
      showMessage('Erro ao cadastrar usuário', 'error');
    }
  }

  function startEdit(usuario) {
    setEditando(usuario.id_usuario);
    setNovoRole(usuario.role);
  }

  async function handleEdit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/usuarios/${editando}/permissao`, {
        role: novoRole
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditando(null);
      fetchUsuarios();
      showMessage('Permissão editada com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao editar permissão');
      showMessage('Erro ao editar permissão', 'error');
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3001/api/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsuarios();
      showMessage('Usuário deletado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao deletar usuário');
      showMessage('Erro ao deletar usuário', 'error');
    }
  }

  if (userRole !== 'admin') {
    return <Typography color="error">Acesso restrito ao administrador.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
          Usuários
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                label="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Senha"
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id="role-label">Papel</InputLabel>
                <Select
                  labelId="role-label"
                  value={role}
                  label="Papel"
                  onChange={e => setRole(e.target.value)}
                  required
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="medico">Médico</MenuItem>
                  <MenuItem value="enfermeiro">Enfermeiro</MenuItem>
                  <MenuItem value="tecnico">Técnico</MenuItem>
                </Select>
              </FormControl>
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
        <Divider sx={{ my: 3 }} />
        <List>
          {usuarios.map(usuario => (
            <ListItem
              key={usuario.id_usuario}
              secondaryAction={
                editando !== usuario.id_usuario && (
                  <>
                    <IconButton onClick={() => startEdit(usuario)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(usuario.id_usuario)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </>
                )
              }
              sx={{ mb: 1, borderRadius: 1, bgcolor: editando === usuario.id_usuario ? 'grey.100' : 'inherit' }}
            >
              {editando === usuario.id_usuario ? (
                <form onSubmit={handleEdit} style={{ display: 'flex', gap: 8, width: '100%' }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="edit-role-label">Papel</InputLabel>
                    <Select
                      labelId="edit-role-label"
                      value={novoRole}
                      label="Papel"
                      onChange={e => setNovoRole(e.target.value)}
                      required
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="medico">Médico</MenuItem>
                      <MenuItem value="enfermeiro">Enfermeiro</MenuItem>
                      <MenuItem value="tecnico">Técnico</MenuItem>
                    </Select>
                  </FormControl>
                  <Button type="submit" size="small" variant="contained" color="primary">Salvar</Button>
                  <Button type="button" onClick={() => setEditando(null)} size="small" color="inherit">Cancelar</Button>
                </form>
              ) : (
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {usuario.email}
                    </Typography>
                  }
                  secondary={usuario.role}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Usuarios;