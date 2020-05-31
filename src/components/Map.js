import React, { useEffect, useRef, useState } from 'react';
import './css/Map.css';
import mapboxgl from 'mapbox-gl';

function MapBlock({ lat: latitude, lng: longtitude, setLon, setLat, name }) {
    const [map, setMap] = useState(null);
    const [zoom, setZoom] = useState(10);
    const mapContainer = useRef(null);

    useEffect(() => {
        setMap(null);
    }, [name]);
  
    useEffect(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoieWFuYmxhY2siLCJhIjoiY2thcGc1anZnMWV1bjJybXZlczFxZWNneiJ9.GQmY2INRmLW50ynlijmI3A';
      const initializeMap = ({ setMap, mapContainer }) => {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11", 
          center: [longtitude, latitude],
          zoom,
        });

        map.on("load", () => {
              setMap(map);
              map.resize();
              map.jumpTo({
                center: [longtitude, latitude],
                speed: 2,
                curve: 1,
                essential: true
                });
              new mapboxgl.Marker() 
              .setLngLat([longtitude, latitude]) 
              .addTo(map)
            });

        map.on('move', () => {
            setLon(map.getCenter().lng.toFixed(2));
            setLat(map.getCenter().lat.toFixed(2));
            setZoom(map.getZoom().toFixed(2));
        });
      };
  
        !map && initializeMap({ setMap, mapContainer });
    }, [map, longtitude, latitude, zoom, setLat, setLon, name]);

    const truncate = (n) => {
        return n > 0 ? Math.floor(n) : Math.ceil(n);
    }
    
    const getDMS = function (dd, longOrLat) {
        let hemisphere = /^[WE]|(?:lon)/i.test(longOrLat)
        ? dd < 0
          ? "W"
          : "E"
        : dd < 0
          ? "S"
          : "N";
        
        const absDD = Math.abs(dd);
        const degrees = truncate(absDD);
        const minutes = truncate((absDD - degrees) * 60);
        const seconds = ((absDD - degrees - minutes / 60) * Math.pow(60, 2)).toFixed(2);
        
        let dmsArray = [degrees, minutes, seconds, hemisphere];
        return `${dmsArray[0]}°${dmsArray[1]}'${dmsArray[2]}" ${dmsArray[3]}`;
    }
    return (
        <div className="map-section">
            <div ref={el => (mapContainer.current = el)} className='mapContainer' />
            <div className="map-coords">
                <p className="prop"><span data-i18n="latitude">Latitude:</span>&nbsp;{getDMS(latitude, 'Latitude')}</p>
                <p className="prop"><span data-i18n="longtitude">Longitude:</span>&nbsp;{getDMS(longtitude, 'Longtitude')}</p>
            </div>
        </div>
    );
}

export default MapBlock;