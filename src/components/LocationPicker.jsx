import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

function LocationSelector({ setCoords }) {
  useMapEvents({
    click(e) {
      setCoords({
        lat: e.latlng.lat,
        lng: e.latlng.lng
      });
    },
  });
  return null;
}

export default function LocationPicker({ isOpen, onClose, onSelect }) {
  const [coords, setCoords] = useState(null);

  if (!isOpen) return null;

  const fetchLocationName = async () => {
    if (!coords) return "";

    const url = `https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=jsonv2`;

    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "FoodConnectSU-App" }
      });
      const data = await res.json();
      
      return data?.address?.building || 
             data?.address?.hall || 
             data?.address?.road ||
             "Unknown Location";

    } catch (err) {
      console.error("Reverse geocoding error:", err);
      return "Unknown Location";
    }
  };

  const handleConfirm = async () => {
    const placeName = await fetchLocationName();

    onSelect({
      lat: coords.lat,
      lng: coords.lng,
      label: placeName   // ✅ pass human readable name
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-[90%] max-w-lg">
        <h3 className="text-lg font-semibold text-center mb-2">Select Pickup Location</h3>

        <div className="h-80 rounded overflow-hidden mb-3">
          <MapContainer
            center={[43.0389, -76.1344]}
            zoom={16}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {coords && <Marker position={[coords.lat, coords.lng]} />}
            <LocationSelector setCoords={setCoords} />
          </MapContainer>
        </div>

        <div className="flex justify-between">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            disabled={!coords}
            onClick={handleConfirm}
          >
            Confirm ✅
          </button>
        </div>
      </div>
    </div>
  );
}
