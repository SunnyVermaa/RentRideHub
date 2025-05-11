import axios from "axios"

const API = axios.create({
    baseURL : import.meta.env.VITE_BASE_URL,
    withCredentials: true
});

export const userRegister = (userData) => API.post('users/register', userData);
export const userLogin = (credential) => API.post('users/login', credential);
export const getProfile = () => API.get('users/profile');
export const userLogout = () => API.get('users/logout');

