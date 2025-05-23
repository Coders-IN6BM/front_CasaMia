import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3001/casaMiaManagement/v1', 
    timeout: 3000, 
    httpsAgent: false
});

// Crear servicio extra: recibe un objeto { name, description, cost, hotel }
export const createExtraService = async (data) => {
    try {
        // data.hotel debe ser el id del hotel
        const { hotel, ...body } = data;
        const { data: response } = await apiClient.post(`/extraServices/addExtraService/${hotel}`, body);
        return response;
    } catch (e) {
        return {
            error: true,
            message: e.response || e.message,
        }
    }
}

// Actualizar servicio extra: recibe hotelId, extraServiceId y data
export const actualizar = async (extraServiceId, data) => {
    try {
        // data debe incluir hotel si es necesario, o ajusta según tu backend
        const { hotel, ...body } = data;
        // Si necesitas hotelId, pásalo como argumento o ajusta aquí
        const hotelId = hotel || 1; // Cambia esto según tu lógica real
        return await apiClient.put(`/updateExtraService/${hotelId}/${extraServiceId}`, body);
    } catch (e) {
        return {
            error: true,
            message: e.response || e.message,
        }
    }
}

export const eliminar = async (id) => {
    try {
        return await apiClient.delete(`/deleteExtraService/${id}`);
    } catch (e) {
        return {
            error: true,
            message: e.response || e.message,
        }
    }
}

