import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, ImageOverlay, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import anh from '../image/anh_mau.jpg';
import '../component/map.css';

const containerStyle = {
  width: '100%',
  height: '90vh',
};

const dongAnhBounds = [
  [21.224, 105.7215],
  [21.0540, 105.952] 
];

const UpdateMapView = ({ center }) => {
  const map = useMap();
  map.setView(center, 13);
  return null;
};

const MapWithOverlayAndSlider = () => {
  const [opacity, setOpacity] = useState(0);
  const imageURL = anh;
  

  const handleOpacityChange = (event) => {
    setOpacity(parseFloat(event.target.value));
  };

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer style={containerStyle} center={[21.175, 105.827]} zoom={13}>
        <UpdateMapView center={[21.175, 105.827]} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[21.175, 105.827]} />
        {imageURL && (
          <ImageOverlay
            url={imageURL}
            bounds={dongAnhBounds}
            opacity={opacity}
          />
        )}
      </MapContainer>
      <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
        <label htmlFor="opacitySlider">Điều chỉnh độ trong suốt của ảnh:</label>
        <input
          type="range"
          id="opacitySlider"
          min="0"
          max="1"
          step="0.1"
          value={opacity}
          onChange={handleOpacityChange}
        />
      </div>
    </div>
  );
};

export default MapWithOverlayAndSlider;
