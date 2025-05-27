import React, { useEffect } from 'react';
import { useEvents } from '../shared/hooks/useEvents.jsx';
import EventList from '../components/events/EventList.jsx';
import EventForm from '../components/events/EventForm.jsx';
import '../assets/styles/EventPage.css';


const EventsPage = ({ hotelId }) => {
  const { events, loading, error, fetchEvents, createEvent, deleteEvent } = useEvents(hotelId);

  useEffect(() => {
    fetchEvents();
  }, [hotelId]);

  const handleCreate = async (eventData) => {
    await createEvent({ ...eventData, hotelId });
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Eventos del Hotel</h1>
      <EventForm onSubmit={handleCreate} />
      <EventList 
        events={events} 
        onDelete={deleteEvent} 
      />
    </div>
  );
};

export default EventsPage;