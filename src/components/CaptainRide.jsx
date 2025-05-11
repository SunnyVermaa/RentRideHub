import React, { useState, useEffect } from "react";
import { 
  confirmRide, 
  declineRide, 
  startRide, 
  endRide,
  getAvailableRides,getRideStatus
} from "../api/ride"
import {captainsLogout} from '../api/captains'
import { useNavigate } from "react-router-dom";
const CaptainRide = () => {

  const navigate = useNavigate()

  const [rideId, setRideId] = useState("");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("");
  const [currentRide, setCurrentRide] = useState(null);
  const [availableRides, setAvailableRides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch available rides
  const fetchAvailableRides = async () => {
    setIsLoading(true);
    try {
      const response = await getAvailableRides();
      // console.log("Full API Response:", response); // Add this line
      // console.log("Response Data Structure:", {
      //   data: response.data,
      //   status: response.status,
      //   headers: response.headers
      // });
      setAvailableRides(response.data?.rides || response.data || response || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableRides();
    const interval = setInterval(fetchAvailableRides, 5000); // Fetch every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const updateRideStatus = (rideStatus) => {
    switch (rideStatus) {
      case "pending":
        setStatus("Ride available - please accept or decline");
        break;
      case "accepted":
        setStatus("Ride confirmed - enter OTP to start ride");
        break;
      case "ongoing":
        setStatus("Ride in progress - drive safely");
        break;
      case "completed":
        setStatus("Ride completed - thank you!");
        break;
      case "declined":
        setStatus("Ride declined");
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

  const handleSelectRide = (ride) => {
    setRideId(ride._id);
    setCurrentRide(ride);
    updateRideStatus(ride.status);
  };

  const handleConfirmRide = async () => {
    try {
      setIsLoading(true);
      const response = await confirmRide(rideId);
      setCurrentRide(response.data || response); // Handle both formats
      updateRideStatus(response.data?.status || response.status);
    } catch (err) {
      console.error("Confirm Ride Error:", err);
      setStatus("Failed to confirm ride: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeclineRide = async () => {
    try {
      setIsLoading(true);
      await declineRide(rideId);
      setStatus("cancelled");
      setRideId("");
      setCurrentRide(null);
      fetchAvailableRides();
    } catch (err) {
      console.error("Decline Ride Error:", err);
      setStatus("Failed to decline ride");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartRide = async () => {
    try {
      setIsLoading(true);
      const res = await startRide(rideId, otp);
      
      setCurrentRide(res.data || res);
      updateRideStatus(res.data?.status || res.status);
      setOtp(""); // Clear OTP after successful start
    } catch (err) {
      console.error("Start Ride Error:", err);
      setStatus("Failed to start ride - " + 
        (err.response?.data?.message || "Invalid OTP"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndRide = async () => {
    try {
      setIsLoading(true);
      // console.log("Attempting to end ride:", rideId); // Debug log
      const res = await endRide(rideId);
      // console.log("End Ride Success:", res); // Debug log
      setCurrentRide(res.data || res);
      updateRideStatus(res.data?.status || res.status);
    } catch (err) {
      console.error("End Ride Failed:", {
        error: err,
        response: err.response?.data
      });
      setStatus("Failed to end ride: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const resetRide = () => {
    setRideId("");
    setOtp("");
    setStatus("");
    setCurrentRide(null);
    fetchAvailableRides();
  };

  const handleLogout = async () => {
      await captainsLogout();
      localStorage.removeItem('captainToken');
      navigate('/captains/login');
    };

  return (
    <div className="p-4 border rounded shadow max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Captain Ride Manager</h2>
      {/* <div>
      <div className="debug">
      <h4>Debug Info:</h4>
      <pre>{JSON.stringify({ availableRides }, null, 2)}</pre>
    </div>
  
      </div> */}

      {/* Available Rides List */}
      {!rideId && (
        <div className="space-y-2">
          <h3 className="font-medium">Available Rides:</h3>
          {isLoading && <p>Loading available rides...</p>}
          {availableRides.length === 0 && !isLoading && (
            <p className="text-gray-500">No rides available at the moment</p>
          )}
          {availableRides.map((ride) => (
            <div 
              key={ride._id}
              className="p-3 border rounded bg-gray-50 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectRide(ride)}
            >
              <p><strong>From:</strong> {ride.pickup.address}</p>
              <p><strong>To:</strong> {ride.destination.address}</p>
              <p><strong>Fare:</strong> ₹{ride.fare}</p>
              <p><strong>Vehicle:</strong> {ride.vehicleType}</p>
            </div>
          ))}
        </div>
      )}

      {/* Ride Management */}
      {rideId && (
        <>
          <div className="bg-gray-100 p-3 rounded">
            <h3 className="font-medium mb-2">Ride Details</h3>
            <p><strong>Pickup:</strong> {currentRide?.pickup?.address}</p>
            <p><strong>Destination:</strong> {currentRide?.destination?.address}</p>
            <p><strong>Fare:</strong> ₹{currentRide?.fare}</p>
            <p><strong>Status:</strong> {currentRide?.status}</p>
          </div>

          {/* Action Buttons Based on Status */}
          {currentRide?.status === "pending" && (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleConfirmRide}
                className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Accept Ride"}
              </button>
              <button
                onClick={handleDeclineRide}
                className="bg-red-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Decline Ride"}
              </button>
            </div>
          )}

          {currentRide?.status === "accepted" && (
            <div className="space-y-2">
              <div>
                <label className="block mb-1">Enter OTP from Passenger</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="6-digit OTP"
                  maxLength={6}
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={handleStartRide}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:bg-gray-400"
                disabled={!otp || otp.length !== 6 || isLoading}
              >
                {isLoading ? "Verifying..." : "Start Ride"}
              </button>
            </div>
          )}

          {currentRide?.status === "ongoing" && (
            <button
              onClick={handleEndRide}
              className="bg-purple-600 text-white px-4 py-2 rounded w-full disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? "Ending..." : "End Ride"}
            </button>
          )}

          {status && <p className="text-center font-medium">{status}</p>}

          {currentRide?.status === "ongoing" && (
            <div className="grid grid-cols-2 gap-2">
            
              {/* <CaptainMap/> */}
            </div>
          )}

          {(currentRide?.status === "completed" || currentRide?.status === "declined") && (
            <button
              onClick={resetRide}
              className="bg-yellow-600 text-white px-4 py-2 rounded w-full"
            >
              Ready for New Ride
            </button>
          ) &&(
            <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition duration-200"
          >
            Logout
          </button>
          )}
        
          
        </>
        
      )}
      
      
    </div>
    
  
  );
};

export default CaptainRide;