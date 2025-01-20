import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Circuit } from '@/types';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

interface CircuitMapProps {
  circuit: Circuit;
}

const CircuitMap: React.FC<CircuitMapProps> = ({ circuit }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [circuit.coordinates[0], circuit.coordinates[1]], // Set the initial map center
        zoom: 10,
      });

      // Add navigation control (the +/- zoom buttons)
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add a marker for the circuit location
      new mapboxgl.Marker()
        .setLngLat([circuit.coordinates[0], circuit.coordinates[1]])
        .addTo(map);

      return () => {
        map.remove();
      };
    }
  }, [circuit]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-96"
    />
  );
};

export default CircuitMap;
