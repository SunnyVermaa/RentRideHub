// 
import React, { useState, useEffect } from "react";
import { 
  getSuggestion,
  getCoordinates,
  getDistanceAndTime,
  findNearbyCaptains 
} from "../api/map";
import CaptainMap from "./CaptainMap";
import UserRide from "./UserRide";
import CaptainRide from "./CaptainRide";

const LocationSearch = ({ role = "user" }) => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [distanceInfo, setDistanceInfo] = useState(null);
  const [nearbyCaptains, setNearbyCaptains] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [rideId, setRideId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce function for search suggestions
  const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  // Fetch suggestions with debouncing
  const fetchPickupSuggestions = debounce(async (value) => {
    if (value.length > 2) {
      const suggestions = await getSuggestion(value);
      setPickupSuggestions(suggestions);
    }
  }, 10);

  const fetchDestinationSuggestions = debounce(async (value) => {
    if (value.length > 2) {
      const suggestions = await getSuggestion(value);
      setDestinationSuggestions(suggestions);
    }
  }, 10);

  // Handle input changes
  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickup(value);
    fetchPickupSuggestions(value);
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    fetchDestinationSuggestions(value);
  };

  // Handle location selection
  const handleSelectPickup = (suggestion) => {
    setPickup(suggestion);
    setPickupSuggestions([]);
  };

  const handleSelectDestination = (suggestion) => {
    setDestination(suggestion);
    setDestinationSuggestions([]);
  };

  // Calculate distance and time
  const handleGetDistance = async () => {
    if (!pickup || !destination) return;
    
    setIsLoading(true);
    try {
      const result = await getDistanceAndTime(pickup, destination);
      setDistanceInfo(result);
    } catch (error) {
      console.error("Failed to get distance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Find nearby captains
  const handleFindCaptains = async () => {
    if (!pickup) return;
    
    setIsLoading(true);
    try {
      const pickupCoords = await getCoordinates(pickup);
      if (pickupCoords?.latitude && pickupCoords?.longitude) {
        const response = await findNearbyCaptains(
          parseFloat(pickupCoords.latitude),
          parseFloat(pickupCoords.longitude)
        );
        setNearbyCaptains(response.captains || []);
      }
    } catch (error) {
      console.error("Failed to find captains:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use current location
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await getSuggestion(`${latitude},${longitude}`);
          const address = res?.[0] || `${latitude}, ${longitude}`;
          setPickup(address);
          setUserLocation({ lat: latitude, lng: longitude });
        } catch (err) {
          console.error("Failed to get address:", err);
          setPickup(`${latitude}, ${longitude}`);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Could not get your location. Please enable location services.");
        setIsLoading(false);
      }
    );
  };

  // Auto-refresh nearby captains
  useEffect(() => {
    if (pickup) {
      const interval = setInterval(handleFindCaptains, 10000); // Refresh every 10 seconds
      return () => clearInterval(interval);
    }
  }, [pickup]);

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      {/* Location Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Pickup Location</label>
          <div className="relative">
            <input
              type="text"
              value={pickup}
              onChange={handlePickupChange}
              className="w-full p-2 border rounded"
              placeholder="Enter pickup location"
              disabled={isLoading}
            />
            <button 
              onClick={handleUseMyLocation}
              className="absolute right-2 top-2 text-xs bg-gray-100 px-2 py-1 rounded"
              disabled={isLoading}
            >
              Use My Location
            </button>
          </div>
          {pickupSuggestions.length > 0 && (
            <ul className="bg-white border rounded shadow mt-1 max-h-40 overflow-y-auto">
              {pickupSuggestions.map((suggestion, i) => (
                <li
                  key={i}
                  onClick={() => handleSelectPickup(suggestion)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Destination</label>
          <input
            type="text"
            value={destination}
            onChange={handleDestinationChange}
            className="w-full p-2 border rounded"
            placeholder="Enter destination"
            disabled={isLoading}
          />
          {destinationSuggestions.length > 0 && (
            <ul className="bg-white border rounded shadow mt-1 max-h-40 overflow-y-auto">
              {destinationSuggestions.map((suggestion, i) => (
                <li
                  key={i}
                  onClick={() => handleSelectDestination(suggestion)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleGetDistance}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
            disabled={!pickup || !destination || isLoading}
          >
            {isLoading ? "Calculating..." : "Get Distance & Time"}
          </button>
          <button
            onClick={handleFindCaptains}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex-1"
            disabled={!pickup || isLoading}
          >
            {isLoading ? "Searching..." : "Find Captains"}
          </button>
        </div>
      </div>

      {/* Distance Information */}
      {distanceInfo && (
        <div className="bg-gray-100 p-3 rounded">
          <h3 className="font-medium mb-2">Route Information</h3>
          <p><strong>Distance:</strong> {distanceInfo.distance_km} km</p>
          <p><strong>Estimated Time:</strong> {distanceInfo.duration_min} minutes</p>
        </div>
      )}

      {/* Nearby Captains and Ride Management */}
      {nearbyCaptains.length > 0 && (
        <div className="space-y-4">
          <div className="bg-gray-100 p-3 rounded">
            <h3 className="font-medium mb-2">Available Captains</h3>
            <CaptainMap 
              captains={nearbyCaptains} 
              userLocation={userLocation} 
            />
          </div>

          {/* Show appropriate ride component based on user role */}
          {role === "user" ? (
            <UserRide
              pickup={pickup}
              destination={destination}
              rideId={rideId}
              setRideId={setRideId}
            />
          ) : (
            <CaptainRide rideId={rideId} />
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;