import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; 
import '../../assets/styles/EventCard.css';
import '../../assets/styles/global.css';

const EventCard = ({ event, onEdit, onDelete }) => {
  if (!event) return null; // Asegúrate de que el evento exista

  return (
    <div className="event-card">
      <h3>{event.nombre}</h3>
      <p>{event.descripcion}</p>
      <small>
        {format(new Date(event.fecha), "PPPp", { locale: es })}
      </small>
      <div className="event-actions">
        <button onClick={() => onEdit && onEdit(event._id)}>Editar</button>
        <button onClick={() => onDelete && onDelete(event._id)}>Eliminar</button>
      </div>
    </div>
  );
};

export default EventCard;