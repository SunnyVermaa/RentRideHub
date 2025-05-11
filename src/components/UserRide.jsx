import React, { useState, useEffect } from "react";
import { createRide, getFareEstimate, getRideStatus } from "../api/ride";
import {userLogout} from '../api/user'
import { useNavigate } from "react-router-dom";


const UserRide = ({ pickup, destination, rideId, setRideId, }) => {
  const [vehicleType, setVehicleType] = useState("car");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("");
  const [fare, setFare] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [fareEstimate, setFareEstimate] = useState(null);
  const [currentRide, setCurrentRide] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchFareEstimate = async () => {
      if (pickup && destination) {
        try {
          const estimate = await getFareEstimate(pickup, destination);
          setFareEstimate(estimate);
        } catch (err) {
          console.error("Failed to get fare estimate:", err);
        }
      }
    };
    fetchFareEstimate();
  }, [pickup, destination]);

  



  const handleCreateRide = async () => {
    try {
      const res = await createRide({
        pickup,
        destination,
        vehicleType,
      });
      
      setRideId(res.ride._id || res._id); // Handle both response formats
      setOtp(res.otp);
      setFare(res.ride?.fare || res.fare);
      setDistance(res.distance);
      setDuration(res.duration);
      setCurrentRide(res.ride || res);
      updateRideStatus(res.ride?.status || res.status);

      // console.log("Ride created:", res);
      
      setStatus("Ride created! Searching for captains...");
    } catch (err) {
      console.error("Create Ride Error:", err);
      setStatus("Failed to create ride: " + (err.response?.data?.message || err.message));
    }
  };

  const updateRideStatus = (rideStatus) => {
    switch (rideStatus) {
      case "pending":
        setStatus("Ride created - waiting for captain");
        break;
      case "accepted":
        setStatus("Captain is on the way - share OTP when they arrive : " + otp);
        break;
      case "ongoing":
        setStatus("Ride in progress : ongoing ");
        break;
      case "completed":
        setStatus("Ride completed - thank you!");
        break;
      case "declined":
        setStatus("Ride declined by captain - please try again");
        break;
      default:
        setStatus("Ride status: " + rideStatus);
    }
  };
 
  useEffect(() => {
    let interval;
    if (rideId && !["completed", "cancelled"].includes(currentRide?.status)) {
        const checkStatus = async () => {
            try {
                const response = await getRideStatus(rideId);
                if (response.status !== currentRide?.status) {
                    setCurrentRide(prev => ({
                        ...prev,
                        status: response.status,
                        captain: response.captain
                    }));
                    updateRideStatus(response.status);
                }
            } catch (err) {
                console.error("Status check error:", err);
            }
        };

        // Immediate check
        checkStatus();
        
        // Then check every 5 seconds
        interval = setInterval(checkStatus, 5000);
    }
    return () => clearInterval(interval);
}, [rideId, currentRide?.status]);

  const resetRide = () => {
    setRideId(null);
    setOtp("");
    setFare(null);
    setDistance(null);
    setDuration(null);
    setStatus("");
    setCurrentRide(null);
  };

   const handleLogout = async () =>{
          await userLogout();
          localStorage.removeItem('token');
          navigate('/users/login')
      }

  const showOtpToUser = otp && ["pending", "confirmed"].includes(currentRide?.status);

  return (
    <div className="p-4 border rounded shadow max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Your Ride</h2>

      <div>
        <p><strong>Pickup:</strong> {pickup}</p>
        <p><strong>Destination:</strong> {destination}</p>
        {rideId && <p><strong>Ride ID:</strong> {rideId}</p>}
      </div>

      <div>
        <label>Vehicle Type</label>
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={rideId}
        >
          <option value="car">Car</option>
          <option value="auto">Auto</option>
          <option value="moto">Moto</option>
        </select>
      </div>

      {fareEstimate && (
        <div className="bg-gray-100 p-3 rounded text-sm">
          <p><strong>Estimated Fare:</strong> 
            <span className="ml-2">Car: ₹{fareEstimate.car}</span>
            <span className="ml-2">Auto: ₹{fareEstimate.auto}</span>
            <span className="ml-2">Moto: ₹{fareEstimate.moto}</span>
          </p>
        </div>
      )}

      {!rideId ? (
        <button 
          onClick={handleCreateRide} 
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={!pickup || !destination}
        >
          Request Ride
        </button>
      ) : (
        <button 
          className="bg-gray-500 text-white px-4 py-2 rounded w-full"
          disabled
        >
          Ride {currentRide?.status || "in progress"}
        </button>
      )}

      {showOtpToUser && (
        <div className="bg-yellow-100 p-3 rounded text-center">
          <p className="text-green-600 font-medium">
            Your OTP: <strong className="text-xl">{otp}</strong>
          </p>
          <p className="text-sm mt-1">Share this OTP with your captain when they arrive</p>
        </div>
      )}

      {currentRide && (
        <div className="bg-gray-100 p-3 rounded text-sm">
          <p><strong>Status:</strong> {currentRide.status}</p>
          <p><strong>Final Fare:</strong> ₹{currentRide.fare}</p>
          {currentRide.distance && <p><strong>Distance:</strong> {currentRide.distance} km</p>}
          {currentRide.duration && <p><strong>Duration:</strong> {currentRide.duration} min</p>}
        </div>
      )}

      {status && <p className="text-center text-lg font-medium">{status}</p>}

      {(status.includes("completed") || status.includes("declined")) && (
        <div>
          <button
          onClick={resetRide}
          className="bg-purple-600 text-white px-4 py-2 rounded w-full mt-2"
        >
          Request New Ride
        </button>
        </div>
        

      ) && (<button
        onClick={handleLogout}
        className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition duration-200"
      >
        Logout
      </button>)}
    </div>
  );
};

export default UserRide;