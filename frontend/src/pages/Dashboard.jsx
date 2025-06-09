import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Box, Paper, Typography, Button, Divider, Grid, Card, CardContent, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ScienceIcon from '@mui/icons-material/Science';

function Dashboard() {
  const { logout, role, token } = useAuth();
  const [totais, setTotais] = useState({ totalPacientes: 0, totalAtendimentos: 0, totalExames: 0 });
  const [grafico, setGrafico] = useState([]);
  const [tipoGrafico, setTipoGrafico] = useState('atendimentos');

  useEffect(() => {
    async function fetchTotais() {
      const res = await axios.get('http://localhost:3001/api/dashboard/totais', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTotais(res.data);
    }
    async function fetchGrafico() {
      const res = await axios.get('http://localhost:3001/api/dashboard/dados-mensais', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGrafico(res.data.map(item => ({
        mes: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][item.mes - 1],
        atendimentos: item.atendimentos
      })));
    }
    fetchTotais();
    fetchGrafico();
  }, [token]);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const podeVer = indicador => {
    if (role === 'admin') return true;
    if (role === 'medico' && ['atendimentos', 'exames', 'grafico'].includes(indicador)) return true;
    if (role === 'recepcao' && ['pacientes', 'atendimentos'].includes(indicador)) return true;
    if (role === 'enfermeiro' && ['pacientes', 'atendimentos'].includes(indicador)) return true;
    return false;
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f6fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ p: 4, width: 600, borderRadius: 3 }}>
        <Typography variant="h5" align="center" color="primary" sx={{ fontWeight: 700, mb: 2 }}>
          HemoVita
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" align="center" sx={{ mb: 3 }}>
          Bem-vindo ao Dashboard!
        </Typography>
        <Grid
          container
          spacing={3}
          sx={{ mb: 3 }}
          justifyContent="center"
          alignItems="stretch"
        >
          {podeVer('pacientes') && (
            <Grid item xs={12} sm={4} md={3} display="flex" justifyContent="center">
              <Card sx={{ bgcolor: '#e3f2fd', boxShadow: 3, borderRadius: 3, minWidth: 180, width: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                  <PeopleIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
                  <Typography variant="subtitle2" color="text.secondary">Pacientes</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{totais.totalPacientes}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
          {podeVer('atendimentos') && (
            <Grid item xs={12} sm={4} md={3} display="flex" justifyContent="center">
              <Card sx={{ bgcolor: '#fff3e0', boxShadow: 3, borderRadius: 3, minWidth: 180, width: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                  <AssignmentIcon sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                  <Typography variant="subtitle2" color="text.secondary">Atendimentos</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{totais.totalAtendimentos}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
          {podeVer('exames') && (
            <Grid item xs={12} sm={4} md={3} display="flex" justifyContent="center">
              <Card sx={{ bgcolor: '#e8f5e9', boxShadow: 3, borderRadius: 3, minWidth: 180, width: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                  <ScienceIcon sx={{ fontSize: 40, color: '#43a047', mb: 1 }} />
                  <Typography variant="subtitle2" color="text.secondary">Exames</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{totais.totalExames}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
        {podeVer('grafico') && (
          <Card sx={{ mt: 2, boxShadow: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                Atendimentos por Mês
              </Typography>
              <FormControl sx={{ minWidth: 180, mb: 2 }}>
                <InputLabel id="tipo-grafico-label">Tipo de Dado</InputLabel>
                <Select
                  labelId="tipo-grafico-label"
                  value={tipoGrafico}
                  label="Tipo de Dado"
                  onChange={e => setTipoGrafico(e.target.value)}
                >
                  <MenuItem value="atendimentos">Atendimentos</MenuItem>
                  <MenuItem value="exames">Exames</MenuItem>
                  <MenuItem value="pacientes">Pacientes</MenuItem>
                </Select>
              </FormControl>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={grafico}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="atendimentos" fill="#1976d2" name="Atendimentos" radius={[8, 8, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ fontWeight: 600, borderRadius: 2, mt: 3 }}
          onClick={handleLogout}
        >
          Sair
        </Button>
      </Paper>
    </Box>
  );
}

export default Dashboard;