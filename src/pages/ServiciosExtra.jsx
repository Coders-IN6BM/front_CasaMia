import React, { useState, useEffect } from "react";
import { useAgregarServicioExtra } from "../shared/agregarServi";
import { useActualizarServicioExtra } from "../shared/actualizar";
import { useEliminarServicioExtra } from "../shared/eliminarServi";
import { getServiciosExtra } from "../../services/api.jsx";




const ServiciosExtra = () => {
  const [servicios, setServicios] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showAgregar, setShowAgregar] = useState(false);
  const [showActualizar, setShowActualizar] = useState(false);
  const [showEliminar, setShowEliminar] = useState(false);
  const [form, setForm] = useState({ nombre: "", precio: "" });
  const [search, setSearch] = useState("");

  const agregarHook = useAgregarServicioExtra();
  const actualizarHook = useActualizarServicioExtra();
  const eliminarHook = useEliminarServicioExtra();

  const fetchServicios = async () => {
    const result = await getServiciosExtra();
    if (!result.error && result.data) {
      setServicios(result.data);
    }
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  useEffect(() => {
    if (agregarHook.success || actualizarHook.success || eliminarHook.success) {
      fetchServicios();
      setShowAgregar(false);
      setShowActualizar(false);
      setShowEliminar(false);
    }
  }, [agregarHook.success, actualizarHook.success, eliminarHook.success]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    agregarHook.agregar(form);
  };

  const handleActualizar = (e) => {
    e.preventDefault();
    actualizarHook.actualizar(selected.id, form);
  };

  const handleEliminar = () => {
    eliminarHook.eliminar(selected.id);
  };

  // Filtrado por búsqueda
  const serviciosFiltrados = servicios.filter((s) =>
    s.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: 24 }}>Servicios Extra</h1>
      <input
        style={styles.searchBox}
        placeholder="Buscar servicio por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        style={{ ...styles.btn, ...styles.btnAgregar, marginBottom: 16 }}
        onClick={() => {
          setShowAgregar(true);
          setForm({ nombre: "", precio: "" });
        }}
      >
        Agregar Servicio
      </button>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Precio</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {serviciosFiltrados.map((servicio) => (
            <tr key={servicio.id}>
              <td style={styles.td}>{servicio.nombre}</td>
              <td style={styles.td}>{servicio.precio}</td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.btn, ...styles.btnActualizar }}
                  onClick={() => {
                    setSelected(servicio);
                    setForm({ nombre: servicio.nombre, precio: servicio.precio });
                    setShowActualizar(true);
                  }}
                >
                  Actualizar
                </button>
                <button
                  style={{ ...styles.btn, ...styles.btnEliminar }}
                  onClick={() => {
                    setSelected(servicio);
                    setShowEliminar(true);
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Agregar */}
      {showAgregar && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Agregar Servicio Extra</h2>
            <form onSubmit={handleAgregar}>
              <input
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                style={styles.searchBox}
              />
              <input
                name="precio"
                placeholder="Precio"
                value={form.precio}
                onChange={handleChange}
                required
                type="number"
                style={styles.searchBox}
              />
              <div style={{ marginTop: 16 }}>
                <button
                  type="submit"
                  style={{ ...styles.btn, ...styles.btnAgregar }}
                  disabled={agregarHook.loading}
                >
                  Agregar
                </button>
                <button
                  type="button"
                  style={{ ...styles.btn, ...styles.btnCancelar }}
                  onClick={() => setShowAgregar(false)}
                >
                  Cancelar
                </button>
              </div>
              {agregarHook.error && <p style={{ color: "red" }}>{agregarHook.error}</p>}
            </form>
          </div>
        </div>
      )}

      {/* Modal Actualizar */}
      {showActualizar && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Actualizar Servicio Extra</h2>
            <form onSubmit={handleActualizar}>
              <input
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                style={styles.searchBox}
              />
              <input
                name="precio"
                placeholder="Precio"
                value={form.precio}
                onChange={handleChange}
                required
                type="number"
                style={styles.searchBox}
              />
              <div style={{ marginTop: 16 }}>
                <button
                  type="submit"
                  style={{ ...styles.btn, ...styles.btnActualizar }}
                  disabled={actualizarHook.loading}
                >
                  Actualizar
                </button>
                <button
                  type="button"
                  style={{ ...styles.btn, ...styles.btnCancelar }}
                  onClick={() => setShowActualizar(false)}
                >
                  Cancelar
                </button>
              </div>
              {actualizarHook.error && <p style={{ color: "red" }}>{actualizarHook.error}</p>}
            </form>
          </div>
        </div>
      )}

      {/* Modal Eliminar */}
      {showEliminar && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Eliminar Servicio Extra</h2>
            <p>¿Seguro que deseas eliminar "{selected?.nombre}"?</p>
            <div style={{ marginTop: 16 }}>
              <button
                style={{ ...styles.btn, ...styles.btnEliminar }}
                onClick={handleEliminar}
                disabled={eliminarHook.loading}
              >
                Eliminar
              </button>
              <button
                style={{ ...styles.btn, ...styles.btnCancelar }}
                onClick={() => setShowEliminar(false)}
              >
                Cancelar
              </button>
            </div>
            {eliminarHook.error && <p style={{ color: "red" }}>{eliminarHook.error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiciosExtra;
