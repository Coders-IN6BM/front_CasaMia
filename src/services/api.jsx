import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3001/casaMiaManagement/v1', 
    timeout: 3000, 
    httpsAgent: false
})