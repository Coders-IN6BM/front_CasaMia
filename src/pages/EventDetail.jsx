import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventsByHotel } from '../services/api.jsx';
import '../assets/styles/EventDetail.css';

const EventDetail = () => {
  const { hotelId, eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventsByHotel(hotelId);
        if (!response.error) {
          const foundEvent = response.data.find(e => e._id === eventId);
          setEvent(foundEvent || null);
        } else {
          setError("Evento no encontrado");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [hotelId, eventId]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>Evento no existe</div>;

  return (
    <div className="event-detail">
      <h1>{event.nombre}</h1>
      <p><strong>Descripción:</strong> {event.descripcion}</p>
      <p><strong>Fecha:</strong> {new Date(event.fecha).toLocaleString()}</p>
      <p><strong>Hotel ID:</strong> {event.hotel}</p>
      <p><strong>Estado:</strong> {event.status}</p>
    </div>
  );
};

export default EventDetail;