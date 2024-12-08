import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MyCustomMarker from "./MyCustomMarker";

const UpdateMapView = ({ latitude, longitude }) => {
  const map = useMap();

  useEffect(() => {
    if (latitude && longitude) {
      map.setView([latitude, longitude], map.getZoom());
    }
  }, [latitude, longitude, map]);

  return null;
};

export const MyMap = ({ title, longitude, latitude, px = 4 }) => {
  return (
    <div className={`px-${px} flex flex-col gap-2 z-10`}>
      <p className="text-sm-medium text-gray-light/700 z-10">{title}</p>
      <div className="h-[360px] w-full bg-gray-light/200 rounded-lg">
        <MapContainer
          center={[latitude || 0, longitude || 0]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyCustomMarker position={[latitude || 0, longitude || 0]} />
          <UpdateMapView latitude={latitude} longitude={longitude} />
        </MapContainer>
      </div>
    </div>
  );
};
