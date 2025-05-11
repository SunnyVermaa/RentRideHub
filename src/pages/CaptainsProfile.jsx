import React, { useState, useEffect } from "react";
import { 
  getCaptainsProfile, 
  captainsLogout, 
  updateCaptainLocation, 
  getStatus 
} from "../api/captains";
import { useNavigate } from 'react-router-dom';

export default function CaptainsProfile() {
  const [captain, setCaptain] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCaptains = async () => {
      try {
        const res = await getCaptainsProfile();
        setCaptain(res.data.captain);
      } catch (error) {
        console.error(error);
        navigate('/captains/login');
      }
    };
    fetchCaptains();
  }, [navigate]);

  const toggleStatus = async () => {
    try {
      setStatusUpdating(true);
      const res = await getStatus();
      setCaptain(prev => ({
        ...prev,
        status: res.data.status || res.data.captain?.status,
      }));
    } catch (error) {
      console.error('Error in status:', error);
    } finally {
      setStatusUpdating(false);
    }
  };

  useEffect(() => {
    const updateLocation = async () => {
      if (!navigator.geolocation) {
        console.log('Geolocation not supported');
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        try {
          await updateCaptainLocation({ lat, lon });
          // console.log("Location updated:", lat, lon);
        } catch (error) {
          console.error("Failed to update location", error);
        }
      });
    };

    updateLocation();
    const interval = setInterval(updateLocation, 100000);
    return () => clearInterval(interval);
  }, []);

  const handleRideManagement = () => {
    navigate('/captains/ride');
  };

  const handleLogout = async () => {
    await captainsLogout();
    localStorage.removeItem('captainToken');
    navigate('/captains/login');
  };

  if (!captain) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500 text-lg">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-purple-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Captain Profile</h2>

        <div className="space-y-4 text-gray-700">
          <p><span className="font-semibold">Name:</span> {captain.fullname?.firstname} {captain.fullname?.lastname}</p>
          <p><span className="font-semibold">Email:</span> {captain.email}</p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              captain.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {captain.status}
            </span>
          </p>
          <p><span className="font-semibold">Vehicle Type:</span> {captain.vehicle?.vehicleType}</p>
          <p><span className="font-semibold">Location:</span> Latitude {captain.location?.lat}, Longitude {captain.location?.lon}</p>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={toggleStatus}
            disabled={statusUpdating}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition duration-200 disabled:opacity-60"
          >
            {statusUpdating ? 'Updating...' : (captain.status === 'active' ? 'Set Inactive' : 'Set Active')}
          </button>
          <button
            onClick={handleRideManagement}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200 mt-3"
          >
            Ride Management
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}