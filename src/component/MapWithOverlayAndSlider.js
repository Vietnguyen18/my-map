import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, ImageOverlay, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { pdfjs } from 'react-pdf';
import '../component/map.css';

const containerStyle = {
  width: '100%',
  height: '90vh',
};

const dongAnhBounds = [
  [21.229, 105.6652],
  [21.0290, 105.980] 
];

const UpdateMapView = ({ center }) => {
  const map = useMap();
  map.setView(center, 13);
  return null;
};

const MapWithOverlayAndSlider = () => {
  const [opacity, setOpacity] = useState(0);
  const [imageURL, setImageURL] = useState(null);

  const handleOpacityChange = (event) => {
    setOpacity(parseFloat(event.target.value));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const pdfFile = URL.createObjectURL(file);

        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

        const loadingTask = pdfjs.getDocument(pdfFile);
        const pdf = await loadingTask.promise;

        const page = await pdf.getPage(1);
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        await page.render(renderContext).promise;
        const imageData = canvas.toDataURL('image/png');

        setImageURL(imageData);
      } catch (error) {
        console.error('Error rendering PDF:', error);
      }
    }
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
        <label>{(opacity * 100).toFixed(0)} %</label>

        <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ marginLeft: '10px' }} />
      </div>
    </div>
  );
};

export default MapWithOverlayAndSlider;
