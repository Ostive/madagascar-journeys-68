import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

interface CircuitMapProps {
  cities: {
    name: string;
    coordinates: [number, number];
    day: number;
  }[];
}

const CircuitMap: React.FC<CircuitMapProps> = ({ cities }) => {
  useEffect(() => {
    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

    const map = new mapboxgl.Map({
      container: 'map', // ID of the container element
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: cities[0].coordinates, // Initial map center
      zoom: 6, // Initial zoom level
    });

    cities.forEach(city => {
      new mapboxgl.Marker()
        .setLngLat(city.coordinates)
        .setPopup(new mapboxgl.Popup().setText(city.name)) // Add popups
        .addTo(map);
    });

    return () => map.remove(); // Cleanup on unmount
  }, [cities]);

  return (
    <>
      <div id="map" className="w-full h-full" />
      <style>
        {`
          .mapboxgl-map {
            width: 100%;
            height: 100%;
          }
        `}
      </style>
    </>
  );
};

export default CircuitMap;
