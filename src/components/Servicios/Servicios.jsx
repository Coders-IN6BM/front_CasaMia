import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Paper,
  TextField,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

const casaMiaMainBlue = "#2563eb";
const casaMiaMainBlueGradient = "linear-gradient(135deg, #2563eb 80%, #1e40af 100%)";

export const Servicios = () => {
  const [selectedMenu, setSelectedMenu] = useState('crear');
  const [servicio, setServicio] = useState('');
  const [servicios, setServicios] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // Crear servicio
  const handleAddServicio = (e) => {
    e.preventDefault();
    if (servicio.trim()) {
      setServicios([...servicios, { id: Date.now(), nombre: servicio.trim() }]);
      setServicio('');
      setSelectedMenu('crear');
    }
  };

  // Eliminar servicio
  const handleDeleteServicio = (idx) => {
    setServicios(servicios.filter((_, i) => i !== idx));
  };

  // Editar servicio
  const handleOpenEdit = (idx) => {
    setEditIdx(idx);
    setEditValue(servicios[idx].nombre);
  };
  const handleEditServicio = () => {
    if (editValue.trim()) {
      setServicios(servicios.map((s, i) =>
        i === editIdx ? { ...s, nombre: editValue.trim() } : s
      ));
      setEditIdx(null);
      setEditValue('');
    }
  };

  // Buscar servicio por nombre o id
  const handleSearch = (e) => {
    e.preventDefault();
    let result = null;
    if (!searchTerm.trim()) {
      setSearchResult(null);
      return;
    }
    if (!isNaN(Number(searchTerm))) {
      result = servicios.find(s => String(s.id) === searchTerm.trim());
    }
    if (!result) {
      result = servicios.find(s => s.nombre.toLowerCase() === searchTerm.trim().toLowerCase());
    }
    setSearchResult(result || null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        bgcolor: '#18191A',
        m: 0,
        p: 0,
        overflow: 'hidden',
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 320,
          minWidth: 320,
          bgcolor: casaMiaMainBlueGradient,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 6,
          height: '100vh',
          borderRadius: 0,
          boxShadow: 6,
          justifyContent: 'center',
        }}
      >
        <Button
          variant={selectedMenu === 'crear' ? 'contained' : 'outlined'}
          onClick={() => setSelectedMenu('crear')}
          sx={{
            width: '80%',
            mb: 3,
            fontWeight: 700,
            fontSize: 18,
            bgcolor: selectedMenu === 'crear' ? '#2563eb' : 'white',
            color: selectedMenu === 'crear' ? 'white' : '#2563eb',
            borderColor: '#2563eb',
            boxShadow: selectedMenu === 'crear' ? 4 : 0,
            '&:hover': {
              bgcolor: '#1e40af',
              color: 'white',
              borderColor: '#1e40af',
            },
          }}
        >
          Crear Servicio
        </Button>
        <Button
          variant={selectedMenu === 'editar' ? 'contained' : 'outlined'}
          onClick={() => setSelectedMenu('editar')}
          sx={{
            width: '80%',
            mb: 3,
            fontWeight: 700,
            fontSize: 18,
            bgcolor: selectedMenu === 'editar' ? '#2563eb' : 'white',
            color: selectedMenu === 'editar' ? 'white' : '#2563eb',
            borderColor: '#2563eb',
            boxShadow: selectedMenu === 'editar' ? 4 : 0,
            '&:hover': {
              bgcolor: '#1e40af',
              color: 'white',
              borderColor: '#1e40af',
            },
          }}
        >
          Editar Servicio
        </Button>
        <Button
          variant={selectedMenu === 'eliminar' ? 'contained' : 'outlined'}
          onClick={() => setSelectedMenu('eliminar')}
          sx={{
            width: '80%',
            mb: 3,
            fontWeight: 700,
            fontSize: 18,
            bgcolor: selectedMenu === 'eliminar' ? '#2563eb' : 'white',
            color: selectedMenu === 'eliminar' ? 'white' : '#2563eb',
            borderColor: '#2563eb',
            boxShadow: selectedMenu === 'eliminar' ? 4 : 0,
            '&:hover': {
              bgcolor: '#1e40af',
              color: 'white',
              borderColor: '#1e40af',
            },
          }}
        >
          Eliminar Servicio
        </Button>
        <Button
          variant={selectedMenu === 'obtener' ? 'contained' : 'outlined'}
          onClick={() => setSelectedMenu('obtener')}
          sx={{
            width: '80%',
            fontWeight: 700,
            fontSize: 18,
            bgcolor: selectedMenu === 'obtener' ? '#2563eb' : 'white',
            color: selectedMenu === 'obtener' ? 'white' : '#2563eb',
            borderColor: '#2563eb',
            boxShadow: selectedMenu === 'obtener' ? 4 : 0,
            '&:hover': {
              bgcolor: '#1e40af',
              color: 'white',
              borderColor: '#1e40af',
            },
          }}
        >
          Obtener Servicio
        </Button>
      </Box>
      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          bgcolor: '#232324',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          px: 4,
          py: 0,
          borderRadius: 0,
          boxShadow: 6,
          maxWidth: '100%',
        }}
      >
        {/* Crear */}
        {selectedMenu === 'crear' && (
          <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h3" fontWeight={700} color="white" gutterBottom>
              Crear Servicio
            </Typography>
            <Paper
              elevation={4}
              sx={{
                mt: 6,
                p: 4,
                borderRadius: 3,
                background: '#f8fafc',
              }}
            >
              <form onSubmit={handleAddServicio}>
                <TextField
                  label="Nuevo servicio"
                  value={servicio}
                  onChange={(e) => setServicio(e.target.value)}
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={{
                    mb: 3,
                    background: 'white',
                    borderRadius: 1,
                    input: { color: '#1e293b' }
                  }}
                  InputLabelProps={{
                    style: { color: casaMiaMainBlue }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: casaMiaMainBlue,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 18,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: '0 2px 8px 0 #2563eb33',
                    '&:hover': {
                      bgcolor: '#1e40af',
                      color: '#fff'
                    }
                  }}
                >
                  Crear Servicio
                </Button>
              </form>
            </Paper>
          </Box>
        )}
        {/* Editar */}
        {selectedMenu === 'editar' && (
          <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h3" fontWeight={700} color="white" gutterBottom>
              Editar Servicio
            </Typography>
            <Paper
              elevation={4}
              sx={{
                mt: 6,
                p: 3,
                borderRadius: 3,
                background: '#f8fafc',
                minHeight: 200,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                color={casaMiaMainBlue}
                gutterBottom
                sx={{ textAlign: 'left' }}
              >
                Selecciona un servicio para editar
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {servicios.length === 0 && (
                  <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
                    No hay servicios registrados.
                  </Typography>
                )}
                {servicios.map((s, idx) => (
                  <ListItem
                    key={s.id}
                    sx={{
                      bgcolor: '#e0e7ff',
                      mb: 1,
                      borderRadius: 2,
                      boxShadow: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="editar"
                        onClick={() => handleOpenEdit(idx)}
                        sx={{
                          color: casaMiaMainBlue,
                          '&:hover': { color: '#f59e42' }
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    }
                  >
                    <Typography fontWeight={500} color={casaMiaMainBlue}>
                      {s.nombre}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              {/* Dialogo de edición */}
              <Dialog open={editIdx !== null} onClose={() => setEditIdx(null)}>
                <DialogTitle>Editar Servicio</DialogTitle>
                <DialogContent>
                  <TextField
                    label="Nombre del servicio"
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setEditIdx(null)}>Cancelar</Button>
                  <Button onClick={handleEditServicio} variant="contained" color="primary">
                    Guardar
                  </Button>
                </DialogActions>
              </Dialog>
            </Paper>
          </Box>
        )}
        {/* Eliminar */}
        {selectedMenu === 'eliminar' && (
          <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h3" fontWeight={700} color="white" gutterBottom>
              Eliminar Servicio
            </Typography>
            <Paper
              elevation={4}
              sx={{
                mt: 6,
                p: 3,
                borderRadius: 3,
                background: '#f8fafc',
                minHeight: 200,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                color={casaMiaMainBlue}
                gutterBottom
                sx={{ textAlign: 'left' }}
              >
                Selecciona un servicio para eliminar
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {servicios.length === 0 && (
                  <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
                    No hay servicios registrados.
                  </Typography>
                )}
                {servicios.map((s, idx) => (
                  <ListItem
                    key={s.id}
                    sx={{
                      bgcolor: '#e0e7ff',
                      mb: 1,
                      borderRadius: 2,
                      boxShadow: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="eliminar"
                        onClick={() => handleDeleteServicio(idx)}
                        sx={{
                          color: casaMiaMainBlue,
                          '&:hover': { color: '#ef4444' }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <Typography fontWeight={500} color={casaMiaMainBlue}>
                      {s.nombre}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )}
        {/* Obtener */}
        {selectedMenu === 'obtener' && (
          <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h3" fontWeight={700} color="white" gutterBottom>
              Obtener Servicio
            </Typography>
            <Paper
              elevation={4}
              sx={{
                mt: 6,
                p: 4,
                borderRadius: 3,
                background: '#f8fafc',
              }}
            >
              <form onSubmit={handleSearch}>
                <TextField
                  label="Buscar por nombre o ID"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={{
                    mb: 3,
                    background: 'white',
                    borderRadius: 1,
                    input: { color: '#1e293b' }
                  }}
                  InputLabelProps={{
                    style: { color: casaMiaMainBlue }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SearchIcon />}
                  sx={{
                    bgcolor: casaMiaMainBlue,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 18,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: '0 2px 8px 0 #2563eb33',
                    '&:hover': {
                      bgcolor: '#1e40af',
                      color: '#fff'
                    }
                  }}
                >
                  Buscar
                </Button>
              </form>
              <Divider sx={{ my: 3 }} />
              {searchResult ? (
                <Box>
                  <Typography variant="subtitle1" color={casaMiaMainBlue} fontWeight={700}>
                    Servicio encontrado:
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <b>ID:</b> {searchResult.id}
                  </Typography>
                  <Typography variant="body1">
                    <b>Nombre:</b> {searchResult.nombre}
                  </Typography>
                </Box>
              ) : searchTerm ? (
                <Typography color="text.secondary" sx={{ mt: 2 }}>
                  No se encontró ningún servicio con ese nombre o ID.
                </Typography>
              ) : null}
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};
