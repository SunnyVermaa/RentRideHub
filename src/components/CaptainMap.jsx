// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix default Leaflet icon (necessary for many React apps)
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// const CaptainMap = ({ captains }) => {
//   const defaultCenter = [26.8467, 80.9462]; // Lucknow fallback
//   const hasCaptains = captains && captains.length > 0;

//   const center = hasCaptains
//     ? [
//         parseFloat(captains[0]?.location?.lat || defaultCenter[0]),
//         parseFloat(captains[0]?.location?.lon || defaultCenter[1]),
//       ]
//     : defaultCenter;

//   return (
//     <MapContainer
//       center={center}
//       zoom={10}
//       scrollWheelZoom={true}
//       style={{ height: "400px", width: "100%" }}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {hasCaptains &&
//         captains.map((captain, index) => {
//           const { location, fullname, email, status, vehicle } = captain;
//           if (!location?.lat || !location?.lon) return null;

//           return (
//             <Marker
//               key={index}
//               position={[parseFloat(location.lat), parseFloat(location.lon)]}
//             >
//               <Popup>
//                 <div style={{ fontSize: "14px", lineHeight: "1.5" }}>
//                   <strong>Name:</strong> {fullname?.firstname} {fullname?.lastname} <br />
//                   <strong>Email:</strong> {email} <br />
//                   <strong>Status:</strong> {status} <br />
//                   <strong>Vehicle:</strong> {vehicle?.vehicleType} ({vehicle?.plate}) <br />
//                   <strong>Color:</strong> {vehicle?.color}, Seats: {vehicle?.capacity}
//                 </div>
//               </Popup>
//             </Marker>
//           );
//         })}
//     </MapContainer>
//   );
// };

// export default CaptainMap;


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

