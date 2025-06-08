import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar sx={{ justifyContent: 'center', position: 'relative' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            mx: 'auto',
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          HemoVita
        </Typography>
        {token && (
          <Tooltip title="Sair">
            <IconButton
              onClick={handleLogout}
              sx={{
                position: 'absolute',
                right: 8,
                bgcolor: '#fff',
                color: 'error.main',
                width: 36,
                height: 36,
                p: 0,
                '&:hover': { bgcolor: '#f8d7da' },
                boxShadow: 1,
              }}
              size="small"
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;