// import axios from "axios"

// const API = axios.create({
//     baseURL : import.meta.env.VITE_BASE_URL,
//     headers: { 'Content-Type': 'application/json' },
//     withCredentials: true
// });
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token'); // <-- Assumes token is saved here after login
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// export const userRegister = (userData) => API.post('users/register', userData,{
//     headers: { 'Content-Type': 'application/json' }
//   });
// export const userLogin = (credential) => API.post('users/login', credential,{
//     headers: { 'Content-Type': 'application/json' }
//   });
// export const getProfile = () => API.get('users/profile',{
//     headers: { 'Content-Type': 'application/json' }
//   });
// export const userLogout = () => API.get('users/logout',{
//     headers: { 'Content-Type': 'application/json' }
//   });

import axios from "axios"

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const userRegister = (userData) => API.post('users/register', userData);
export const userLogin = (credential) => API.post('users/login', credential);
export const getProfile = () => API.get('users/profile');
export const userLogout = () => API.get('users/logout');