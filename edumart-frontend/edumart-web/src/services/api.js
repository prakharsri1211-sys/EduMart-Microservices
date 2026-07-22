import axios from 'axios';

const api = axios.create({
    baseURL: (process.env.REACT_APP_API_URL || 'https://edumart-gateway.onrender.com') + '/api',
});

// Auto-attach JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('edumart_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('edumart_token', response.data);
    return response.data;
};

export const fetchStudentStats = () => api.get('/student/stats'); // New visual endpoint
export const fetchStudentMsg = () => api.get('/student/msg');

export default api;