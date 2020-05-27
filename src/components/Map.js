import React from 'react';
import './css/Map.css';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoieWFuYmxhY2siLCJhIjoiY2thcGc1anZnMWV1bjJybXZlczFxZWNneiJ9.GQmY2INRmLW50ynlijmI3A';

class MapBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: props.lng,
            lat: props.lat,
            zoom: 10
        };
    }
    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }
    render() {
        return (
            <div className="map-section">
                <div ref={el => this.mapContainer = el} className='mapContainer' />
                <div className="map-coords">
                    <p className="prop">Latitude:  {this.state.lat}</p>
                    <p className="prop">Longitude: {this.state.lng}</p>
                    <p className="prop">Zoom: {this.state.zoom}</p>
                </div>
            </div>
        )
    }
}

export default MapBlock;