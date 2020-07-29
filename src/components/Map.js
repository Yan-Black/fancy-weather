import React, { useEffect, useRef, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import { appContext } from '../App';
import './css/Map.css';

const MapBlock = () => {
	const { payload: [ lang,,,,,,,, latitude, longtitude] } = useContext(appContext);
	const [map, setMap] = useState(null);
	const [zoom, setZoom] = useState(10);
	const [long, setLong] = useState(longtitude);
	const [lat, setLat] = useState(latitude);
	const mapContainer = useRef(null);

	useEffect(() => {
		if (map) {
			map.flyTo({ center: [longtitude, latitude], essential: true});
			map.on('zoomend', () => map.resize());
			new mapboxgl.Marker()
				.setLngLat([longtitude, latitude])
				.addTo(map);
			setLong(longtitude);
			setLat(latitude);
			setZoom(10);
		}
	}, [map, longtitude, latitude]);

	useEffect(() => {
		mapboxgl.accessToken = 'pk.eyJ1IjoieWFuYmxhY2siLCJhIjoiY2thcGc1anZnMWV1bjJybXZlczFxZWNneiJ9.GQmY2INRmLW50ynlijmI3A';
		const initializeMap = ({ setMap, mapContainer }) => {
			const map = new mapboxgl.Map({
				container: mapContainer.current,
				style: "mapbox://styles/mapbox/streets-v11",
				center: [long, lat],
				zoom
			});

			map.on("load", () => {
				setMap(map);
				map.resize();

				new mapboxgl.Marker()
					.setLngLat([long, lat])
					.addTo(map)
			});

			map.on('move', () => {
				setLong(map.getCenter().lng.toFixed(2));
				setLat(map.getCenter().lat.toFixed(2));
				setZoom(map.getZoom().toFixed(2));
			});
		};

		!map && initializeMap({ setMap, mapContainer });
	}, [map, long, lat, zoom]);

	const truncate = (n) => {
		return n > 0 ? Math.floor(n) : Math.ceil(n);
	}

	const getDMS = function (dd, longOrLat) {
		const hemisphere = /^[WE]|(?:lon)/i.test(longOrLat)
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
		const dmsArray = [degrees, minutes, seconds, hemisphere];

		return `${dmsArray[0]}°${dmsArray[1]}'${dmsArray[2]}" ${dmsArray[3]}`;
	}
	return (
		<div className="map-section">
			<div ref={el => (mapContainer.current = el)} className='mapContainer' />
			<div className="map-coords">
				<p className="prop">
					<span>
						{lang.latitude}
					</span>
					{' '}
					{getDMS(lat, 'Latitude')}
				</p>
				<p className="prop">
					<span>
						{lang.longtitude}
					</span>
					{' '}
					{getDMS(long, 'Longtitude')}
				</p>
			</div>
		</div>
	);
}

export default MapBlock;
