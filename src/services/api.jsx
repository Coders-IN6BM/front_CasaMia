import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3001/casaMiaManagement/v1', 
    timeout: 3000, 
    httpsAgent: false
})

export const addFavoriteHotel = async (uid, favHotel) => {
  try {
    return await apiClient.patch(`/user/addFavoriteHotel/${uid}`, { favHotel })
  }catch (error) {
    return { error: true, message: error.message }
  }
}

export const removeFavoriteHotel = async (uid, favHotel) => {
  try {
    return await apiClient.patch(`/user/removeFavoriteHotel/${uid}`, { favHotel })
  }catch (error) {
    return { error: true, message: error.message }
  }
}
export const deleteHotel = async (uid) => {
  try {
    return await apiClient.patch(`/hotel/deleteHotel/${uid}`)
  } catch (error) {
    return { error: true, message: error.message }
  }
}

export const searchHotelsService = async ({
  search = "",
  page = 1,
  limit = 8
}) => {
  try {
    const desde = (page - 1) * limit
    const params = new URLSearchParams()
    params.append("search", search)
    params.append("desde", desde.toString())
    params.append("limite", limit.toString())
    return await apiHotel.get(`/hotel/searchHotels?${params.toString()}`)
  } catch (error) {
    return { error: true, message: error.message }
  }
}
