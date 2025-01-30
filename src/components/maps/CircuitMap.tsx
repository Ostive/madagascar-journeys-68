import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { CircuitMapProps } from '@/types';

const CircuitMap: React.FC<CircuitMapProps> = ({ cities, className }) => {
  useEffect(() => {
    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: cities[0].coordinates,
      zoom: 6,
    });

    cities.forEach(city => {
      new mapboxgl.Marker()
        .setLngLat(city.coordinates)
        .setPopup(new mapboxgl.Popup().setText(city.name))
        .addTo(map);
    });

    return () => map.remove();
  }, [cities]);

  return (
    <div className={className}>
      <div id="map" className="w-full h-full" />
      <style>
        {`
          .mapboxgl-map {
            width: 100%;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
};

export default CircuitMap;