import React, { useState } from 'react';
import '../../assets/styles/EventForm.css';
import '../../assets/styles/global.css';

const EventForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: initialData.nombre || '',
    descripcion: initialData.descripcion || '',
    fecha: initialData.fecha || '',
    servicios: initialData.servicios || [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre del evento"
      />
      <textarea
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
      />
      <input
        type="datetime-local"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
      />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default EventForm;