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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from 'jspdf';

function Exames() {
  const [exames, setExames] = useState([]);
  const [error, setError] = useState('');
  const [tipo, setTipo] = useState('');
  const [resultado, setResultado] = useState('');
  const [editando, setEditando] = useState(null);
  const [novoTipo, setNovoTipo] = useState('');
  const [novoResultado, setNovoResultado] = useState('');
  const [dataExame, setDataExame] = useState('');
  const [idPaciente, setIdPaciente] = useState('');
  const [idProfi, setIdProfi] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [filtro, setFiltro] = useState('');
  const { token } = useAuth();
  const { showMessage } = useFeedback();

  useEffect(() => {
    fetchExames();
    axios.get('http://localhost:3001/api/pacientes', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setPacientes(res.data));
    axios.get('http://localhost:3001/api/profissionais', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProfissionais(res.data));
    // eslint-disable-next-line
  }, [token]);

  async function fetchExames() {
    try {
      const response = await axios.get('http://localhost:3001/api/exames', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExames(response.data);
    } catch (err) {
      setError('Erro ao buscar exames');
      showMessage('Erro ao buscar exames', 'error');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3001/api/exames', {
        tipo_exame: tipo,
        resultado,
        dt_exame: dataExame,
        id_paciente: idPaciente,
        id_profi: idProfi
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTipo('');
      setResultado('');
      setDataExame('');
      setIdPaciente('');
      setIdProfi('');
      fetchExames();
      showMessage('Exame cadastrado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao cadastrar exame');
      showMessage('Erro ao cadastrar exame', 'error');
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3001/api/exames/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchExames();
      showMessage('Exame deletado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao deletar exame');
      showMessage('Erro ao deletar exame', 'error');
    }
  }

  function startEdit(exame) {
    setEditando(exame.id_exame);
    setNovoTipo(exame.tipo_exame);
    setNovoResultado(exame.resultado);
    setDataExame(exame.data_exame.split('T')[0]);
    setIdPaciente(exame.id_paciente);
    setIdProfi(exame.id_profi);
  }

  async function handleEdit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/exames/${editando}`, {
        tipo_exame: novoTipo,
        resultado: novoResultado,
        data_exame: dataExame,
        id_paciente: idPaciente,
        id_profi: idProfi
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditando(null);
      fetchExames();
      showMessage('Exame editado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao editar exame');
      showMessage('Erro ao editar exame', 'error');
    }
  }

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Relatório de Exames', 10, 10);

    let y = 20;
    exames.forEach((e, i) => {
      doc.setFontSize(12);
      doc.text(
        `${i + 1}. Tipo: ${e.tipo_exame} | Resultado: ${e.resultado} | Data: ${e.data_exame || e.dt_exame || ''}`,
        10,
        y
      );
      y += 8;
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save('relatorio_exames.pdf');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
          Exames
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                label="Tipo de Exame"
                value={tipo}
                onChange={e => setTipo(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Resultado"
                value={resultado}
                onChange={e => setResultado(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Data do Exame"
                type="date"
                value={dataExame}
                onChange={e => setDataExame(e.target.value)}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
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
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
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
          label="Buscar exame"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        />
        <Divider sx={{ my: 3 }} />
        <List>
          {exames
            .filter(e => e.tipo_exame.toLowerCase().includes(filtro.toLowerCase()))
            .map(exame => (
              <ListItem
                key={exame.id_exame}
                secondaryAction={
                  editando !== exame.id_exame && (
                    <>
                      <IconButton onClick={() => startEdit(exame)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(exame.id_exame)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )
                }
                sx={{ mb: 1, borderRadius: 1, bgcolor: editando === exame.id_exame ? 'grey.100' : 'inherit' }}
              >
                {editando === exame.id_exame ? (
                  <form onSubmit={handleEdit} style={{ display: 'flex', gap: 8, width: '100%' }}>
                    <TextField
                      value={novoTipo}
                      onChange={e => setNovoTipo(e.target.value)}
                      required
                      size="small"
                      fullWidth
                    />
                    <TextField
                      value={novoResultado}
                      onChange={e => setNovoResultado(e.target.value)}
                      required
                      size="small"
                      fullWidth
                    />
                    <TextField
                      type="date"
                      value={dataExame}
                      onChange={e => setDataExame(e.target.value)}
                      required
                      size="small"
                      fullWidth
                    />
                    <TextField
                      select
                      value={idPaciente}
                      onChange={e => setIdPaciente(e.target.value)}
                      required
                      size="small"
                      fullWidth
                      SelectProps={{ native: true }}
                    >
                      <option value="">Selecione</option>
                      {pacientes.map(paciente => (
                        <option key={paciente.id_paciente} value={paciente.id_paciente}>
                          {paciente.nome_paciente}
                        </option>
                      ))}
                    </TextField>
                    <TextField
                      select
                      value={idProfi}
                      onChange={e => setIdProfi(e.target.value)}
                      required
                      size="small"
                      fullWidth
                      SelectProps={{ native: true }}
                    >
                      <option value="">Selecione</option>
                      {profissionais.map(profissional => (
                        <option key={profissional.id_profi} value={profissional.id_profi}>
                          {profissional.nome_profi}
                        </option>
                      ))}
                    </TextField>
                    <Button type="submit" size="small" variant="contained" color="primary">Salvar</Button>
                    <Button type="button" onClick={() => setEditando(null)} size="small" color="inherit">Cancelar</Button>
                  </form>
                ) : (
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {exame.tipo_exame}
                      </Typography>
                    }
                    secondary={exame.resultado}
                  />
                )}
              </ListItem>
            ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          onClick={exportarPDF}
          startIcon={<PictureAsPdfIcon />}
          sx={{ mb: 2 }}
        >
          Exportar PDF
        </Button>
      </Paper>
    </Box>
  );
}

export default Exames;