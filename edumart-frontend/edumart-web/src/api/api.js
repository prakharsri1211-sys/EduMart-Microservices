import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Hits your Gateway
});

// Automatically adds the "Bearer eyJ..." token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('edumart_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// Define all your backend "links" here
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const fetchStudentMsg = () => api.get('/student/msg');

export default api;