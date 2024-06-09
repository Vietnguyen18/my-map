import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, GroundOverlay } from '@react-google-maps/api';
import anh from '../image/anh_mau.jpg'

const containerStyle = {
  position: 'relative',
  width: '100%',
  height: '800px'
};

const center = {
  lat: 21.145,
  lng: 105.849
};

const imageURL = anh;

const MapWithOverlayAndSlider = () => {
  const [opacity, setOpacity] = useState(0);

  const handleOpacityChange = (event) => {
    setOpacity(parseFloat(event.target.value));
  };

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyBa7UlmsSGVz7NA2HkBdfevTBiwIPP2mdY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {window.google && window.google.maps ? (
            <>
              <Marker
                position={center}
              />
              <GroundOverlay 
                url={imageURL}
                bounds={{
                  north: center.lat + 0.01,
                  south: center.lat - 0.01,
                  east: center.lng + 0.01,
                  west: center.lng - 0.01
                }}
                opacity={opacity}
              />
            </>
          ) : null}
        </GoogleMap>
        <div style={{ position: 'absolute', top: '130px', left: '83px', transform: 'translateX(-60%)', zIndex: 1, backgroundColor: 'white', padding: '1px', borderRadius: '5px' }}>
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
      </LoadScript>
    </div>
  );
};

export default MapWithOverlayAndSlider;
