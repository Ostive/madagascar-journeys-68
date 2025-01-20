import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { CircuitMapProps } from '@/types';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const CircuitMap: React.FC<CircuitMapProps> = ({ circuit, cities, className }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const defaultCoordinates: [number, number] = [47.5162, -18.8792]; // Madagascar default center
    const initialCoordinates = circuit.coordinates || defaultCoordinates;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: initialCoordinates,
      zoom: 10,
    });

    // Add navigation control
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for cities if provided
    if (cities && cities.length > 0) {
      cities.forEach((city) => {
        new mapboxgl.Marker()
          .setLngLat(city.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${city.name}</h3><p>Day ${city.day}</p>`))
          .addTo(map);
      });

      // Fit bounds to include all cities
      const bounds = new mapboxgl.LngLatBounds();
      cities.forEach(city => bounds.extend(city.coordinates));
      map.fitBounds(bounds, { padding: 50 });
    } else {
      // If no cities, just add a marker for the circuit location
      new mapboxgl.Marker()
        .setLngLat(initialCoordinates)
        .addTo(map);
    }

    return () => {
      map.remove();
    };
  }, [circuit, cities]);

  return (
    <div
      ref={mapContainerRef}
      className={className || "w-full h-96"}
    />
  );
};

export default CircuitMap;