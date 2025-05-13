// import axios from "axios";
// const BASE_URL = import.meta.env.VITE_BASE_URL;

// const API = axios.create({
//     baseURL: BASE_URL,
//     headers: { 'Content-Type': 'application/json' },
//     withCredentials: true
// });

// // Add request interceptor to include authorization token
// API.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     // console.log(token);
    
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

// export const createRide = async (data) => {
//     try {
//         const response = await API.post('/rides/create', data,{
//     headers: { 'Content-Type': 'application/json' }
//   });
//         return response.data;
//     } catch (error) {
//         console.error("Create ride error:", error.response?.data || error.message);
//         throw error;
//     }
// };

// export const getFareEstimate = async (pickup, destination) => {
//     try {
//         const response = await API.get('/rides/get-fare', {
//             params: { pickup, destination },
//     headers: { 'Content-Type': 'application/json' }
  
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Fare estimate error:", error.response?.data || error.message);
//         throw error;
//     }
// };
// export const getAvailableRides = async () => {
//     try {
//       const response = await API.get('/rides/available',{
//     headers: { 'Content-Type': 'application/json' }
//   });
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching available rides:", error.response?.data || error.message);
//       throw error;
//     }
//   };
//   export const getRideStatus = async (rideId) => {
//     try {
//         const response = await API.get(`/rides/status/${rideId}`);
//         return response.data;
//     } catch (error) {
//         console.error("Get ride status error:", error.response?.data || error.message);
//         throw error;
//     }
// };
// export const confirmRide = (rideId) => API.post('/rides/confirm', { rideId },{
//     headers: { 'Content-Type': 'application/json' }
//   });
// export const startRide = (rideId, otp) => API.get(`/rides/start-ride?rideId=${rideId}&otp=${otp}`,{
//     headers: { 'Content-Type': 'application/json' }
//   });
// export const declineRide = (rideId) => API.post('/rides/decline', { rideId },{
//     headers: { 'Content-Type': 'application/json' }
//   });
// export const endRide = async (rideId) => {
//     try {
//       const response = await API.post('/rides/end-ride', { rideId },{
//     headers: { 'Content-Type': 'application/json' }
//   });
//     //   console.log("End Ride Response:", response.data); // Debug log
//       return response.data;
//     } catch (error) {
//       console.error("End Ride Error:", {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message
//       });
//       throw error;
//     }
//   };

// export const captainsLogout = () => API.get('captains/logout');

import axios from "axios";

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

export const createRide = async (data) => {
    try {
        const response = await API.post('/rides/create', data);
        return response.data;
    } catch (error) {
        console.error("Create ride error:", error.response?.data || error.message);
        throw error;
    }
};

export const getFareEstimate = async (pickup, destination) => {
    try {
        const response = await API.get('/rides/get-fare', {
            params: { pickup, destination }
        });
        return response.data;
    } catch (error) {
        console.error("Fare estimate error:", error.response?.data || error.message);
        throw error;
    }
};

export const getAvailableRides = async () => {
    try {
      const response = await API.get('/rides/available');
      return response.data;
    } catch (error) {
      console.error("Error fetching available rides:", error.response?.data || error.message);
      throw error;
    }
};

export const getRideStatus = async (rideId) => {
    try {
        const response = await API.get(`/rides/status/${rideId}`);
        return response.data;
    } catch (error) {
        console.error("Get ride status error:", error.response?.data || error.message);
        throw error;
    }
};

export const confirmRide = (rideId) => API.post('/rides/confirm', { rideId });
export const startRide = (rideId, otp) => API.get(`/rides/start-ride?rideId=${rideId}&otp=${otp}`);
export const declineRide = (rideId) => API.post('/rides/decline', { rideId });

export const endRide = async (rideId) => {
    try {
      const response = await API.post('/rides/end-ride', { rideId });
      return response.data;
    } catch (error) {
      console.error("End Ride Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
};

export const captainsLogout = () => API.get('captains/logout');