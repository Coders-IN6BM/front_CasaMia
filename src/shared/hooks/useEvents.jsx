import { useState } from 'react';
import { addEvent, editEvent, deleteEvent, getEventsByHotel } from "../../services/api.jsx";

export const useEvents = (hotelId) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    const response = await getEventsByHotel(hotelId);
    if (!response.error) {
      setEvents(response.data);
    } else {
      setError(response.e.message);
    }
    setLoading(false);
  };

  const createEvent = async (eventData) => {
    const response = await addEvent(eventData);
    if (!response.error) {
      await fetchEvents(); 
      return response.data;
    }
    throw new Error(response.e.message);
  };

  const updateEvent = async (eventId, updates) => {
    const response = await editEvent(hotelId, eventId, updates);
    if (!response.error) {
      await fetchEvents(); 
      return response.data;
    }
    throw new Error(response.e.message);
  };

  const removeEvent = async (eventId) => {
    const response = await deleteEvent(hotelId, eventId);
    if (!response.error) {
      await fetchEvents(); 
    } else {
      throw new Error(response.e.message);
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent: removeEvent,
  };
};