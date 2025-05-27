import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/casaMiaManagement/v1',
  timeout: 3000,
});

export const addEvent = async (data) => {
  try {
    return await apiClient.post('/event/create', data);
  } catch (e) {
    return { error: true, e };
  }
};

export const editEvent = async (hotelId, eventId, data) => {
  try {
    return await apiClient.put(`/event/edit/${hotelId}/${eventId}`, data);
  } catch (e) {
    return { error: true, e };
  }
};

export const deleteEvent = async (hotelId, eventId) => {
  try {
    return await apiClient.delete(`/event/delete/${hotelId}/${eventId}`);
  } catch (e) {
    return { error: true, e };
  }
};

export const getEventsByHotel = async (hotelId) => {
  try {
    return await apiClient.get(`/event/hotel/${hotelId}`);
  } catch (e) {
    return { error: true, e, message: "Error fetching events" };
  }
};