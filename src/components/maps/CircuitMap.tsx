import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface City {
  name: string;
  coordinates: [number, number];
  day: number;
}

interface CircuitMapProps {
  cities?: City[];
  className?: string;
}

const MADAGASCAR_CENTER: [number, number] = [47.5162, -18.8792];
const DEFAULT_ZOOM = 5;

const CircuitMap = ({ cities = [], className = "" }: CircuitMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markers = useRef<maplibregl.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: MADAGASCAR_CENTER,
      zoom: DEFAULT_ZOOM
    });

    map.current.addControl(new maplibregl.NavigationControl());

    return () => {
      map.current?.remove();
    };
  }, []);

  // Update markers and route when cities change
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Remove existing route if it exists
    if (map.current.getLayer('route')) {
      map.current.removeLayer('route');
    }
    if (map.current.getSource('route')) {
      map.current.removeSource('route');
    }

    // Add markers for each city
    cities.forEach((city, index) => {
      const el = document.createElement('div');
      el.className = 'step-marker';
      el.innerHTML = `${index + 1}`;

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(city.coordinates)
        .addTo(map.current!);

      markers.current.push(marker);
    });

    // Add route line if there are at least 2 cities
    if (cities.length >= 2) {
      // Wait for map style to be loaded
      if (map.current.isStyleLoaded()) {
        addRoute();
      } else {
        map.current.once('style.load', addRoute);
      }
    }

    function addRoute() {
      if (!map.current) return;

      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: cities.map(city => city.coordinates)
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
          'line-color': '#10b981',
          'line-width': 3,
          'line-dasharray': [2, 2]
        }
      });
    }

    // Fit bounds to show all markers
    if (cities.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      cities.forEach(city => {
        bounds.extend(city.coordinates);
      });
      map.current.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        duration: 1000
      });
    }
  }, [cities]);

  return (
    <div className={className}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      <style jsx global>{`
        .step-marker {
          width: 24px;
          height: 24px;
          background-color: #10b981;
          border: 2px solid white;
          border-radius: 50%;
          color: white;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default CircuitMap;