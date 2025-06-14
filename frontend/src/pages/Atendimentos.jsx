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
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import jsPDF from 'jspdf';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function Atendimentos() {
  const [atendimentos, setAtendimentos] = useState([]);
  const [error, setError] = useState('');
  const [idPaciente, setIdPaciente] = useState('');
  const [idProfi, setIdProfi] = useState('');
  const [tipoAtendimento, setTipoAtendimento] = useState('');
  const [notas, setNotas] = useState('');
  const [leito, setLeito] = useState('');
  const [evolucao, setEvolucao] = useState('');
  const [data, setData] = useState('');
  const [editando, setEditando] = useState(null);
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novaData, setNovaData] = useState('');
  const [filtro, setFiltro] = useState('');
  const { token } = useAuth();
  const { showMessage } = useFeedback();

  const [pacientes, setPacientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);

  useEffect(() => {
    fetchAtendimentos();
    axios.get('http://localhost:3001/api/pacientes', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setPacientes(res.data));
    axios.get('http://localhost:3001/api/profissionais', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProfissionais(res.data));
    // eslint-disable-next-line
  }, [token]);

  async function fetchAtendimentos() {
    try {
      const response = await axios.get('http://localhost:3001/api/atendimentos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAtendimentos(response.data);
    } catch (err) {
      setError('Erro ao buscar atendimentos');
      showMessage('Erro ao buscar atendimentos', 'error');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3001/api/atendimentos', {
        id_paciente: idPaciente,
        id_profi: idProfi,
        tipo_atendimento: tipoAtendimento,
        notas,
        leito,
        evolucao,
        dt_atendimento: data
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIdPaciente('');
      setIdProfi('');
      setTipoAtendimento('');
      setNotas('');
      setLeito('');
      setEvolucao('');
      setData('');
      fetchAtendimentos();
      showMessage('Atendimento cadastrado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao cadastrar atendimento');
      showMessage('Erro ao cadastrar atendimento', 'error');
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3001/api/atendimentos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAtendimentos();
      showMessage('Atendimento deletado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao deletar atendimento');
      showMessage('Erro ao deletar atendimento', 'error');
    }
  }

  function startEdit(atendimento) {
    setEditando(atendimento.id_atendimento);
    setNovaDescricao(atendimento.descricao);
    setNovaData(atendimento.data_atendimento);
  }

  async function handleEdit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/atendimentos/${editando}`, {
        descricao: novaDescricao,
        data_atendimento: novaData
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditando(null);
      fetchAtendimentos();
      showMessage('Atendimento editado com sucesso!', 'success');
    } catch (err) {
      setError('Erro ao editar atendimento');
      showMessage('Erro ao editar atendimento', 'error');
    }
  }

  const handleDownloadPdf = (atendimento) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Atendimento - ${atendimento.id_atendimento}`, 14, 22);
    doc.text(`Paciente: ${atendimento.paciente.nome}`, 14, 32);
    doc.text(`Profissional: ${atendimento.profissional.nome_profi}`, 14, 42);
    doc.text(`Tipo de Atendimento: ${atendimento.tipo_atendimento}`, 14, 52);
    doc.text(`Notas: ${atendimento.notas}`, 14, 62);
    doc.text(`Leito: ${atendimento.leito}`, 14, 72);
    doc.text(`Evolução: ${atendimento.evolucao}`, 14, 82);
    doc.text(`Data: ${new Date(atendimento.data_atendimento).toLocaleString()}`, 14, 92);
    doc.save(`atendimento_${atendimento.id_atendimento}.pdf`);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Relatório de Atendimentos', 10, 10);

    let y = 20;
    atendimentos.forEach((a, i) => {
      doc.setFontSize(12);
      doc.text(
        `${i + 1}. Tipo: ${a.tipo_atendimento} | Paciente: ${a.nome_paciente || ''} | Profissional: ${a.nome_profi || ''} | Data: ${a.dt_atendimento || a.data_atendimento || ''}`,
        10,
        y
      );
      y += 8;
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save('relatorio_atendimentos.pdf');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
          Atendimentos
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
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
                  <option key={p.id_paciente} value={p.id_paciente}>{p.nome}</option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tipo de Atendimento"
                value={tipoAtendimento}
                onChange={e => setTipoAtendimento(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Notas"
                value={notas}
                onChange={e => setNotas(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Leito"
                type="number"
                value={leito}
                onChange={e => setLeito(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Evolução"
                value={evolucao}
                onChange={e => setEvolucao(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={2}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<AssignmentIndIcon />}
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
          label="Buscar atendimento"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        />
        <Divider sx={{ my: 3 }} />
        <Button
          variant="contained"
          color="primary"
          onClick={exportarPDF}
          startIcon={<PictureAsPdfIcon />}
          sx={{ mb: 2 }}
        >
          Exportar PDF
        </Button>
        <List>
          {atendimentos
            .filter(a => a.tipo_atendimento.toLowerCase().includes(filtro.toLowerCase()))
            .map(atendimento => (
              <ListItem
                key={atendimento.id_atendimento}
                secondaryAction={
                  editando !== atendimento.id_atendimento && (
                    <>
                      <IconButton onClick={() => startEdit(atendimento)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(atendimento.id_atendimento)} color="error">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDownloadPdf(atendimento)} color="default">
                        <PictureAsPdfIcon />
                      </IconButton>
                    </>
                  )
                }
                sx={{ mb: 1, borderRadius: 1, bgcolor: editando === atendimento.id_atendimento ? 'grey.100' : 'inherit' }}
              >
                {editando === atendimento.id_atendimento ? (
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
                        {atendimento.descricao}
                      </Typography>
                    }
                    secondary={atendimento.data_atendimento}
                  />
                )}
              </ListItem>
            ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Atendimentos;