import React, { useState } from "react";
import "../../pages/dashboard/DashboardPage.css";
import { createExtraService, actualizar, eliminar } from "../../services/api.jsx";


export const DashboardPage = () => {
  const [search, setSearch] = useState("");
  const [activeAction, setActiveAction] = useState(""); // "agregar" | "actualizar" | "eliminar" | ""
  const [servicio, setServicio] = useState({ id: 1, name: "Servicio ejemplo", description: "Descripción ejemplo", cost: 100 });
  const [form, setForm] = useState({ name: "", description: "", cost: "" });
  const [mensaje, setMensaje] = useState("");

  // Para actualizar
  const handleActualizar = () => {
    setForm({ id: String(servicio.id), name: servicio.name, description: servicio.description, cost: servicio.cost });
    setActiveAction("actualizar");
    setMensaje("");
  };

  // Para agregar
  const handleAgregar = () => {
    setForm({ name: "", description: "", cost: "" }); // adaptado
    setActiveAction("agregar");
    setMensaje("");
  };

  // Para eliminar
  const handleEliminar = () => {
    setActiveAction("eliminar");
    setMensaje("");
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAgregarSubmit = async (e) => {
    e.preventDefault();
    if (form.name && form.description && form.cost) {
      // Simula hotelId 1, ajusta según tu lógica real
      const result = await createExtraService({ 
        name: form.name, 
        description: form.description, 
        cost: form.cost, 
        hotel: 1 // simulado
      });
      if (!result.error) {
        setServicio({
          ...servicio,
          name: form.name,
          description: form.description,
          cost: form.cost,
        });
        setMensaje("Servicio agregado correctamente.");
        setActiveAction("");
      } else {
        setMensaje("Error al agregar: " + (result.message || "Error desconocido"));
      }
    }
  };

  const handleActualizarSubmit = async (e) => {
    e.preventDefault();
    const idToUpdate = form.id !== "" ? String(form.id) : String(servicio.id);
    const result = await actualizar(idToUpdate, {
      name: form.name !== "" ? form.name : servicio.name,
      description: form.description !== "" ? form.description : servicio.description,
      cost: form.cost !== "" ? form.cost : servicio.cost,
    });
    if (!result.error) {
      setServicio({
        ...servicio,
        id: idToUpdate,
        name: form.name !== "" ? form.name : servicio.name,
        description: form.description !== "" ? form.description : servicio.description,
        cost: form.cost !== "" ? form.cost : servicio.cost,
      });
      setMensaje("Servicio actualizado correctamente.");
      setActiveAction("");
    } else {
      setMensaje("Error al actualizar: " + (result.message || "Error desconocido"));
    }
  };

  const handleEliminarSubmit = async (e) => {
    e.preventDefault();
    const result = await eliminar(servicio.id);
    if (!result.error) {
      setServicio({ id: null, name: "", description: "", cost: "" });
      setMensaje("Servicio eliminado correctamente.");
      setActiveAction("");
    } else {
      setMensaje("Error al eliminar: " + (result.message || "Error desconocido"));
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <button className="sidebar-btn" onClick={handleAgregar}>Agregar</button>
        <button className="sidebar-btn" onClick={handleActualizar}>Actualizar</button>
        <button className="sidebar-btn" onClick={handleEliminar}>Eliminar</button>
      </aside>

      <section className="main-content">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Buscar Servicios por hotel"
            className="search-bar"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="content-box"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            minHeight: "100%",
            boxSizing: "border-box",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {/* Renderiza el contenido según el botón activo */}
          {activeAction === "agregar" && (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto"
            }}>
              <h3 style={{ alignSelf: "center", color: "#cccccc" }}>Agregar Servicio</h3>
              <form onSubmit={handleAgregarSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  width: "100%",
                  alignItems: "center"
                }}>
                <input
                  className="search-bar"
                  name="name"
                  placeholder="Nombre"
                  value={form.name}
                  onChange={handleFormChange}
                  style={{ width: "100%" }}
                />
                <input
                  className="search-bar"
                  name="description"
                  placeholder="Descripción"
                  value={form.description}
                  onChange={handleFormChange}
                  style={{ width: "100%" }}
                />
                <input
                  className="search-bar"
                  name="cost"
                  placeholder="Costo"
                  type="number"
                  value={form.cost}
                  onChange={handleFormChange}
                  style={{ width: "100%" }}
                />
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  width: "100%"
                }}>
                  <button className="sidebar-btn" type="submit" style={{ flex: 1 }}>Agregar</button>
                  <button className="sidebar-btn" type="button" onClick={() => setActiveAction("")} style={{ flex: 1 }}>Cancelar</button>
                </div>
              </form>
              {mensaje && <div style={{ marginTop: 10, color: "#0118D8", alignSelf: "center" }}>{mensaje}</div>}
            </div>
          )}
          {activeAction === "actualizar" && (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto"
            }}>
              <h3 style={{ alignSelf: "center", color: "#cccccc" }}>Actualizar Servicio</h3>
              <form onSubmit={handleActualizarSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  width: "100%",
                  alignItems: "center"
                }}>
                <input
                  className="search-bar"
                  name="id"
                  placeholder="ID"
                  type="number"
                  value={form.id}
                  onChange={handleFormChange}
                  style={{ width: "100%" }}
                  required
                />
                <input
                  className="search-bar"
                  name="name"
                  placeholder="Nombre"
                  value={form.name}
                  onChange={handleFormChange}
                  style={{ width: "100%" }}
                />
                <input
                  className="search-bar"
                  name="description"
                  placeholder="Descripción"
                  value={form.description}
                  onChange={handleFormChange}
                  style={{ width: "100%" }}
                />
                <input
                  className="search-bar"
                  name="cost"
                  placeholder="Costo"
                  type="number"
                  value={form.cost}
                  onChange={handleFormChange}
                  style={{ width: "100%" }}
                />
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  width: "100%"
                }}>
                  <button className="sidebar-btn" type="submit" style={{ flex: 1 }}>Actualizar</button>
                  <button className="sidebar-btn" type="button" onClick={() => setActiveAction("")} style={{ flex: 1 }}>Cancelar</button>
                </div>
              </form>
              {mensaje && <div style={{ marginTop: 10, color: "#0118D8", alignSelf: "center" }}>{mensaje}</div>}
            </div>
          )}
          {activeAction === "eliminar" && (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto"
            }}>
              <h3 style={{ alignSelf: "center", color: "#cccccc" }}>Eliminar Servicio</h3>
              <form onSubmit={handleEliminarSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  width: "100%",
                  alignItems: "center"
                }}>
                <p style={{ textAlign: "center", color: "#cccccc" }}>
                  ¿Seguro que deseas eliminar el servicio <b style={{ color: "#cccccc" }}>{servicio.name}</b>?
                </p>
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  width: "100%"
                }}>
                  <button className="sidebar-btn" type="submit" style={{ flex: 1 }}>Eliminar</button>
                  <button className="sidebar-btn" type="button" onClick={() => setActiveAction("")} style={{ flex: 1 }}>Cancelar</button>
                </div>
              </form>
              {mensaje && <div style={{ marginTop: 10, color: "#0118D8", alignSelf: "center" }}>{mensaje}</div>}
            </div>
          )}
          {!activeAction && (
            <div style={{ width: "100%" }}>
              {/* Solo la tabla de datos, sin texto ni bloque de servicio actual */}
              {/* Tabla de datos ordenada y agradable */}
              <div style={{
                marginTop: "2.5rem",
                width: "100%",
                display: "flex",
                justifyContent: "center"
              }}>
                <div style={{
                  width: "100%",
                  maxWidth: "700px",
                  background: "#FFF8F8",
                  borderRadius: "1rem",
                  boxShadow: "0 2px 8px #E9DFC3",
                  border: "2px solid #1B56FD",
                  overflow: "hidden"
                }}>
                  <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "center",
                    fontFamily: "'Segoe UI', sans-serif",
                    background: "#FFF8F8"
                  }}>
                    <thead>
                      <tr style={{ background: "#E9DFC3", color: "#0118D8" }}>
                        <th style={{
                          padding: "1rem",
                          borderBottom: "2px solid #1B56FD",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          letterSpacing: "0.5px"
                        }}>ID</th>
                        <th style={{
                          padding: "1rem",
                          borderBottom: "2px solid #1B56FD",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          letterSpacing: "0.5px"
                        }}>Nombre</th>
                        <th style={{
                          padding: "1rem",
                          borderBottom: "2px solid #1B56FD",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          letterSpacing: "0.5px"
                        }}>Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ background: "#FFF8F8", color: "#0118D8" }}>
                        <td style={{
                          padding: "1rem",
                          borderBottom: "1px solid #E9DFC3",
                          wordBreak: "break-word"
                        }}>{servicio.id}</td>
                        <td style={{
                          padding: "1rem",
                          borderBottom: "1px solid #E9DFC3",
                          wordBreak: "break-word"
                        }}>{servicio.name}</td>
                        <td style={{
                          padding: "1rem",
                          borderBottom: "1px solid #E9DFC3",
                          wordBreak: "break-word"
                        }}>{servicio.cost}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {mensaje && <div style={{ marginTop: 10, color: "#0118D8", textAlign: "center" }}>{mensaje}</div>}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};