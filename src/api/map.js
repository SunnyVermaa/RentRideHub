// import axios from "axios";
// const BASE_URL = import.meta.env.VITE_BASE_URL;

// const API = axios.create({
//     baseURL: import.meta.env.VITE_BASE_URL,
//     withCredentials: true, // this sends cookies (session) with requests
//   });
  
//   export const getSuggestion = async (input) => {
//     try {
//       const res = await API.get(`/maps/get-suggestions?input=${input}`);
//       return res.data;
//     } catch (error) {
//       console.error("failed to get suggestion", error);
//       return [];
//     }
//   };

// export const getCoordinates = async (placeId) => {
//     try{
//         const res = await API.get(`/maps/get-coordinates?address=${encodeURIComponent(placeId)}`);
//         return res.data;
//     } catch(error){
//         console.log('failed to get coordinates', error);
//         throw error;
//     }
// }

// export const getDistanceAndTime = async (origin, destination) =>{
//     // console.log("Fetching distance with:", origin, destination);

//     try{

//         const res = await API.get(`/maps/get-distance-time`, {
//             params: {
//                 origin,
//                 destination
//               }
//         });
//         return res.data;

//     } catch(error){
//         console.log("can not get distance and time",error);
//         throw error;
        
//     }
// }

// export const findNearbyCaptains = async (lat, lon) => {
//     // console.log("API call lat/lon:", lat, lon);
//     if (!lat || !lon) {
//       console.warn("Lat or Lon missing before API call");
//       return;
//     }
  
//     try {
//       const res = await API.get("/maps/nearby-captains", {
//         params: { lat, lon },
//       });
//       return res.data;
//     } catch (error) {
//       console.log("error happened to find captains ", error);
//     }
//   };


import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

// Add the authorization interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getSuggestion = async (input) => {
  try {
    const res = await API.get(`/maps/get-suggestions?input=${input}`);
    return res.data;
  } catch (error) {
    console.error("failed to get suggestion", error);
    return [];
  }
};

export const getCoordinates = async (placeId) => {
  try {
    const res = await API.get(`/maps/get-coordinates?address=${encodeURIComponent(placeId)}`);
    return res.data;
  } catch(error) {
    console.log('failed to get coordinates', error);
    throw error;
  }
}

export const getDistanceAndTime = async (origin, destination) => {
  try {
    const res = await API.get(`/maps/get-distance-time`, {
      params: { origin, destination }
    });
    return res.data;
  } catch(error) {
    console.log("can not get distance and time", error);
    throw error;
  }
}

export const findNearbyCaptains = async (lat, lon) => {
  if (!lat || !lon) {
    console.warn("Lat or Lon missing before API call");
    return;
  }

  try {
    const res = await API.get("/maps/nearby-captains", { params: { lat, lon } });
    return res.data;
  } catch (error) {
    console.log("error happened to find captains ", error);
  }
};