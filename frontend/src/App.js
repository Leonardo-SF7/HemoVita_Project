import Header from './components/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Pacientes from './pages/Pacientes';
import Profissionais from './pages/Profissionais';
import Exames from './pages/Exames';
import Atendimentos from './pages/Atendimentos';
import Prontuarios from './pages/Prontuarios';
import Atestados from './pages/Atestados';
import Evolucoes from './pages/Evolucoes';
import Farmacia from './pages/Farmacia';
import ChecklistTriagem from './pages/ChecklistTriagem';
import Triagem from './pages/Triagem';
import Usuarios from './pages/Usuarios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import SideMenu from './components/SideMenu';
import { Box } from '@mui/material';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/pacientes"
              element={
                <PrivateRoute>
                  <Pacientes />
                </PrivateRoute>
              }
            />
            <Route
              path="/profissionais"
              element={
                <PrivateRoute>
                  <Profissionais />
                </PrivateRoute>
              }
            />
            <Route
              path="/exames"
              element={
                <PrivateRoute>
                  <Exames />
                </PrivateRoute>
              }
            />
            <Route
              path="/atendimentos"
              element={
                <PrivateRoute>
                  <Atendimentos />
                </PrivateRoute>
              }
            />
            <Route
              path="/prontuarios"
              element={
                <PrivateRoute>
                  <Prontuarios />
                </PrivateRoute>
              }
            />
            <Route
              path="/atestados"
              element={
                <PrivateRoute>
                  <Atestados />
                </PrivateRoute>
              }
            />
            <Route
              path="/evolucoes"
              element={
                <PrivateRoute>
                  <Evolucoes />
                </PrivateRoute>
              }
            />
            <Route
              path="/farmacia"
              element={
                <PrivateRoute>
                  <Farmacia />
                </PrivateRoute>
              }
            />
            <Route
              path="/checklists"
              element={
                <PrivateRoute>
                  <ChecklistTriagem />
                </PrivateRoute>
              }
            />
            <Route
              path="/triagens"
              element={
                <PrivateRoute>
                  <Triagem />
                </PrivateRoute>
              }
            />
            <Route
              path="/usuarios"
              element={
                <PrivateRoute>
                  <Usuarios />
                </PrivateRoute>
              }
            />
            {/* Outras rotas */}
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;