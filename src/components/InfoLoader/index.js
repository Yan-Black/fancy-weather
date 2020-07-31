import React from 'react';
import './index.css';

const InfoLoader = ({ lng }) => (
  <div className="loader-wrapper">
    <div className="loader-container">
      <div className="loader">
        <div className="outer-circle">
          <div className="middle-circle">
            <div className="inner-circle" />
          </div>
        </div>
        <span className="loading">
          {lng.loading}
        </span>
      </div>
    </div>
  </div>
)

export default InfoLoader;
