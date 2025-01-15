import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface Location {
  name: string;
  coordinates: [number, number]; // This enforces exactly 2 numbers
  day: number;
}

interface CircuitMapProps {
  locations?: Location[];
  className?: string;
}

const MADAGASCAR_CENTER: [number, number] = [47.5162, -18.8792];
const DEFAULT_ZOOM = 5;

const CircuitMap = ({ locations = [], className = "" }: CircuitMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://tiles.openfreemap.org/styles/liberty',
        center: MADAGASCAR_CENTER,
        zoom: DEFAULT_ZOOM
      });

      // Add navigation controls
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

      // Add markers and connect them
      if (locations.length > 0) {
        const coordinates = locations.map(loc => loc.coordinates);
        
        // Add markers
        locations.forEach((location) => {
          const el = document.createElement('div');
          el.className = 'marker';
          el.style.backgroundColor = '#FF0000';
          el.style.width = '20px';
          el.style.height = '20px';
          el.style.borderRadius = '50%';
          el.style.border = '2px solid white';
          
          new maplibregl.Marker(el)
            .setLngLat(location.coordinates)
            .setPopup(new maplibregl.Popup().setHTML(`
              <h3 class="font-bold">Day ${location.day}</h3>
              <p>${location.name}</p>
            `))
            .addTo(map.current!);
        });

        // Add route line
        if (map.current && coordinates.length > 1) {
          map.current.on('load', () => {
            if (!map.current) return;
            
            map.current.addSource('route', {
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

            map.current.addLayer({
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
            const bounds = new maplibregl.LngLatBounds();
            coordinates.forEach(coord => bounds.extend(coord));
            map.current.fitBounds(bounds, { padding: 50 });
          });
        }
      }
    } catch (error) {
      console.error('Error initializing map:', error);
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