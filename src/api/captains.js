import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
     headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // <-- Assumes token is saved here after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const captainRegister = (data) => API.post('captains/register', data,
  {
    headers: { 'Content-Type': 'application/json' }
  }
);
export const captainsLogin = (credential) => API.post('captains/login', credential,
  {
    headers: { 'Content-Type': 'application/json' }
  }
);
export const getCaptainsProfile = () => API.get('captains/profile');
export const getStatus = () => API.patch('captains/status');
export const updateCaptainLocation = async (location) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/captains/update-location`,
        {
            location: {
                lat: location.lat,
                lon: location.lon,
              },
            
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("API error: ", error.response?.data || error.message);
      throw error;
    }
  };
export const captainsLogout = () => API.get('captains/logout');