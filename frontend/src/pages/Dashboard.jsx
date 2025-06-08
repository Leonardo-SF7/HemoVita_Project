import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Box, Paper, Typography, Button, Divider } from '@mui/material';

function Dashboard() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f6fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ p: 4, width: 400, borderRadius: 3 }}>
        <Typography variant="h5" align="center" color="primary" sx={{ fontWeight: 700, mb: 2 }}>
          HemoVita
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" align="center" sx={{ mb: 1 }}>
          Bem-vindo ao Dashboard!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ fontWeight: 600, borderRadius: 2 }}
          onClick={handleLogout}
        >
          Sair
        </Button>
      </Paper>
    </Box>
  );
}

export default Dashboard;