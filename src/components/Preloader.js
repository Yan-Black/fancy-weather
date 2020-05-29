import React from 'react';
import './css/Preloader.css';

function Preloader() {
    return (
        <div className="preloader">
            <div className="preloader-box">
                <h3>Loading data...</h3>
                <div className="preloader-image" />
            </div>
        </div>
    )
}

export default Preloader;