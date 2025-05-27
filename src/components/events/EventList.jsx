import React from 'react';
import EventCard from './EventCard';
import '../../assets/styles/EventList.css';

const EventList = ({ events = [], onDelete, onEdit }) => {
  if (!events.length) {
    return <div>No hay eventos disponibles.</div>;
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard 
          key={event._id} 
          event={event} 
          onDelete={onDelete} 
          onEdit={onEdit} 
        />
      ))}
    </div>
  );
};

export default EventList;