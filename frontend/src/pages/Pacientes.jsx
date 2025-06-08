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

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [error, setError] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [tSanguineo, setTSanguineo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [estCivil, setEstCivil] = useState('');
  const [dtNascimento, setDtNascimento] = useState('');
  const [nomeAcomp, setNomeAcomp] = useState('');
  const [cpfAcomp, setCpfAcomp] = useState('');
  const [editando, setEditando] = useState(null);
  const [novoNome, setNovoNome] = useState('');
  const [novaIdade, setNovaIdade] = useState('');
  const { token, role } = useAuth();
  const { showMessage } = useFeedback();

  useEffect(() => {
    fetchPacientes();
    // eslint-disable-next-line
  }, [token]);

  async function fetchPacientes() {
    try {
      const response = await axios.get('http://localhost:3001/api/pacientes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPacientes(response.data);
    } catch (err) {
      setError('Erro ao buscar pacientes');
      showMessage('Erro ao buscar pacientes', 'error');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3001/api/pacientes', {
        nome_paciente: nome,
        idade: Number(idade),
        sexo,
        t_sanguineo: tSanguineo,
        endereco,
        est_civil: estCivil,
        dt_nascimento: dtNascimento,
        nome_acomp: nomeAcomp,
        cpf_acomp: cpfAcomp
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNome('');
      setIdade('');
      setSexo('');
      setTSanguineo('');
      setEndereco('');
      setEstCivil('');
      setDtNascimento('');
      setNomeAcomp('');
      setCpfAcomp('');
      fetchPacientes();
      showMessage('Paciente cadastrado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao cadastrar paciente');
      showMessage('Erro ao cadastrar paciente', 'error');
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3001/api/pacientes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPacientes();
      showMessage('Paciente deletado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao deletar paciente');
      showMessage('Erro ao deletar paciente', 'error');
    }
  }

  function startEdit(p) {
    setEditando(p.id_paciente);
    setNovoNome(p.nome_paciente);
    setNovaIdade(p.idade);
  }

  async function handleEdit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/pacientes/${editando}`, {
        nome_paciente: novoNome,
        idade: Number(novaIdade)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditando(null);
      fetchPacientes();
      showMessage('Paciente editado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao editar paciente');
      showMessage('Erro ao editar paciente', 'error');
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
          Pacientes
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <TextField
                label="Nome do Paciente"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Idade"
                type="number"
                value={idade}
                onChange={e => setIdade(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                select
                label="Sexo"
                value={sexo}
                onChange={e => setSexo(e.target.value)}
                required
                fullWidth
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                select
                label="Tipo Sanguíneo"
                value={tSanguineo}
                onChange={e => setTSanguineo(e.target.value)}
                required
                fullWidth
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Selecione</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Endereço"
                value={endereco}
                onChange={e => setEndereco(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Estado Civil"
                value={estCivil}
                onChange={e => setEstCivil(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Data de Nascimento"
                type="date"
                value={dtNascimento}
                onChange={e => setDtNascimento(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nome do Acompanhante"
                value={nomeAcomp}
                onChange={e => setNomeAcomp(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="CPF do Acompanhante"
                value={cpfAcomp}
                onChange={e => setCpfAcomp(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
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
          {pacientes.map(p => (
            <ListItem
              key={p.id_paciente}
              secondaryAction={
                editando !== p.id_paciente && (
                  <>
                    <IconButton onClick={() => startEdit(p)} color="primary">
                      <EditIcon />
                    </IconButton>
                    {role === 'admin' && (
                      <IconButton onClick={() => handleDelete(p.id_paciente)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </>
                )
              }
              sx={{ mb: 1, borderRadius: 1, bgcolor: editando === p.id_paciente ? 'grey.100' : 'inherit' }}
            >
              {editando === p.id_paciente ? (
                <form onSubmit={handleEdit} style={{ display: 'flex', gap: 8, width: '100%' }}>
                  <TextField
                    value={novoNome}
                    onChange={e => setNovoNome(e.target.value)}
                    required
                    size="small"
                    fullWidth
                  />
                  <TextField
                    type="number"
                    value={novaIdade}
                    onChange={e => setNovaIdade(e.target.value)}
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
                      {p.nome_paciente}
                    </Typography>
                  }
                  secondary={`${p.idade} anos`}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Pacientes;