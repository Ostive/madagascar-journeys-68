import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
  name: string;
  coordinates: [number, number];
  day: number;
}

interface CircuitMapProps {
  locations?: Location[];
  className?: string;
}

const CircuitMap = ({ locations = [], className = "" }: CircuitMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [47.5162, -18.8792], // Madagascar center
      zoom: 5
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers and connect them
    if (locations.length > 0) {
      const coordinates = locations.map(loc => loc.coordinates);
      
      // Add markers
      locations.forEach((location, index) => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundColor = '#FF0000';
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        
        new mapboxgl.Marker(el)
          .setLngLat(location.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(`
            <h3 class="font-bold">Day ${location.day}</h3>
            <p>${location.name}</p>
          `))
          .addTo(map.current!);
      });

      // Add route line
      if (map.current && coordinates.length > 1) {
        map.current.on('load', () => {
          map.current?.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: coordinates
              }
            }
          });

          map.current?.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#FF0000',
              'line-width': 2
            }
          });

          // Fit bounds to show all markers
          const bounds = new mapboxgl.LngLatBounds();
          coordinates.forEach(coord => bounds.extend(coord as [number, number]));
          map.current?.fitBounds(bounds, { padding: 50 });
        });
      }
    }

    return () => {
      map.current?.remove();
    };
  }, [locations]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="w-full h-[400px] rounded-lg" />
    </div>
  );
};

export default CircuitMap;