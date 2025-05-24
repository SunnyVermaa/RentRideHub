


import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Custom captain icon
const captainIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/685/685887.png", // example captain icon
  iconSize: [32, 32],
});

// Custom user icon
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png", // example user icon
  iconSize: [32, 32],
});

const CaptainMap = ({ captains, userLocation }) => {
  const center = userLocation || (captains.length > 0 && {
    lat: captains[0].location.lat,
    lng: captains[0].location.lon,
  }) || { lat: 26.8467, lng: 80.9462 }; // default to Lucknow if nothing

  return (
    <MapContainer center={center} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>Your Location</Popup>
        </Marker>
      )}

      {captains.map((c, i) => (
        <Marker
          key={i}
          position={{ lat: c.location.lat, lng: c.location.lon }}
          icon={captainIcon}
        >
          <Popup>
            <strong>{c.fullname.firstname} {c.fullname.lastname}</strong><br />
            Email: {c.email}<br />
            Status: {c.status}<br />
            Vehicle: {c.vehicle.vehicleType} ({c.vehicle.color})<br />
            Plate: {c.vehicle.plate}<br />
            Capacity: {c.vehicle.capacity}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CaptainMap;

