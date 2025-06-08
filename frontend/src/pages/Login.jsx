import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFeedback } from '../contexts/FeedbackContext';
import axios from 'axios';
import { Box, Paper, Typography, TextField, Button, Divider } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { showMessage } = useFeedback();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        senha
      });
      login(response.data.token, response.data.role);
      showMessage('Login realizado com sucesso!', 'success');
      window.location.href = '/';
    } catch (err) {
      setError('Email ou senha inválidos');
      showMessage('Email ou senha inválidos', 'error');
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f6fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ p: 4, width: 350, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
            HemoVita
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <form onSubmit={handleLogin}>
          <TextField
            label="E-mail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
            autoFocus
          />
          <TextField
            label="Senha"
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          {error && (
            <Typography color="error" align="center" sx={{ mt: 1, mb: 1, fontSize: 14 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, fontWeight: 600, borderRadius: 2 }}
          >
            Entrar
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;