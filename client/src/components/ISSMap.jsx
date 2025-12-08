import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon in Leaflet with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom ISS icon
const issIcon = new L.Icon({
  iconUrl:
    "https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg",
  iconSize: [50, 30],
  iconAnchor: [25, 15],
  popupAnchor: [0, -15],
});

/**
 * Component to recenter map on ISS position
 */
const RecenterMap = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView([position.latitude, position.longitude], map.getZoom());
    }
  }, [position, map]);

  return null;
};

/**
 * ISS Map Component
 * Displays ISS position and trajectory on a Leaflet map
 */
const ISSMap = ({ position, trajectory = [] }) => {
  const mapRef = useRef();

  if (!position) {
    return (
      <div
        style={{
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
        }}
      >
        <p>Loading map...</p>
      </div>
    );
  }

  const trajectoryCoords = trajectory.map((point) => [
    point.latitude,
    point.longitude,
  ]);

  return (
    <MapContainer
      center={[position.latitude, position.longitude]}
      zoom={3}
      style={{ height: "500px", width: "100%", borderRadius: "8px" }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <RecenterMap position={position} />

      {/* ISS Marker */}
      <Marker position={[position.latitude, position.longitude]} icon={issIcon}>
        <Popup>
          <strong>International Space Station</strong>
          <br />
          Lat: {position.latitude.toFixed(4)}°
          <br />
          Lon: {position.longitude.toFixed(4)}°
        </Popup>
      </Marker>

      {/* Trajectory Path */}
      {trajectoryCoords.length > 0 && (
        <Polyline
          positions={trajectoryCoords}
          color="#1890ff"
          weight={2}
          opacity={0.7}
          dashArray="5, 10"
        />
      )}
    </MapContainer>
  );
};

export default ISSMap;
