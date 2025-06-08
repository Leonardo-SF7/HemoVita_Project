import React, { useState } from 'react';
import {
  Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Toolbar, Typography, Box
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ScienceIcon from '@mui/icons-material/Science';
import ChecklistIcon from '@mui/icons-material/Checklist';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const drawerWidth = 220;
const collapsedWidth = 60;

const iconMap = {
  Dashboard: <DashboardIcon />,
  Pacientes: <PeopleIcon />,
  Profissionais: <AssignmentIndIcon />,
  Exames: <ScienceIcon />,
  Atendimentos: <LocalHospitalIcon />,
  Prontuários: <AssignmentIcon />,
  Atestados: <DescriptionIcon />,
  Evoluções: <FactCheckIcon />,
  Farmácia: <MedicalServicesIcon />,
  'Checklist de Triagem': <ChecklistIcon />,
  Triagem: <FactCheckIcon />,
  Usuários: <GroupIcon />,
};

const menuConfig = [
  { label: 'Dashboard', path: '/', roles: ['admin', 'medico', 'enfermeiro', 'tecnico', 'recepcao'] },
  { label: 'Pacientes', path: '/pacientes', roles: ['admin', 'medico', 'enfermeiro', 'tecnico', 'recepcao'] },
  { label: 'Profissionais', path: '/profissionais', roles: ['admin'] },
  { label: 'Exames', path: '/exames', roles: ['admin', 'medico'] },
  { label: 'Atendimentos', path: '/atendimentos', roles: ['admin', 'medico', 'enfermeiro', 'recepcao'] },
  { label: 'Prontuários', path: '/prontuarios', roles: ['admin', 'medico'] },
  { label: 'Atestados', path: '/atestados', roles: ['admin', 'medico'] },
  { label: 'Evoluções', path: '/evolucoes', roles: ['admin', 'medico', 'enfermeiro'] },
  { label: 'Farmácia', path: '/farmacia', roles: ['admin', 'enfermeiro'] },
  { label: 'Checklist de Triagem', path: '/checklists', roles: ['admin', 'tecnico'] },
  { label: 'Triagem', path: '/triagens', roles: ['admin', 'enfermeiro'] },
  { label: 'Usuários', path: '/usuarios', roles: ['admin'] },
];

function SideMenu() {
  const { role, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  if (!token) return null;

  return (
    <Drawer
      variant="permanent"
      open={open}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: theme => theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: 'border-box',
          bgcolor: '#fff',
          borderRight: '1px solid #f0f0f0',
          overflowX: 'hidden',
          transition: theme => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <Toolbar sx={{ justifyContent: open ? 'center' : 'flex-start', mt: 1, px: 0 }}>
        {open ? (
          <Typography variant="h6" color="primary" sx={{ fontWeight: 700, width: '100%', textAlign: 'center' }}>
            HemoVita
          </Typography>
        ) : (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <DashboardIcon color="primary" />
          </Box>
        )}
      </Toolbar>
      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <List>
          {menuConfig
            .filter(item => item.roles.includes(role))
            .map(item => (
              <ListItem
                key={item.path}
                disablePadding
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  mx: 1,
                  bgcolor: location.pathname === item.path ? 'primary.50' : 'transparent',
                  '&:hover': { bgcolor: 'primary.100' },
                }}
              >
                <ListItemButton onClick={() => navigate(item.path)} sx={{ px: open ? 2 : 1.5 }}>
                  <ListItemIcon sx={{ color: 'primary.main', minWidth: 36, justifyContent: 'center' }}>
                    {iconMap[item.label] || <DashboardIcon />}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontWeight: 500, fontSize: 16 }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default SideMenu;