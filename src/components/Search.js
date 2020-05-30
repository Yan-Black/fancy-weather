import React from 'react';
import './css/Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

function SearchBar(props) {
    return(
        <div className="search-box">
            <input type="text" className="search-bar" placeholder="Search..."
                onChange={e => props.fn(e.target.value)}
                value={props.query} 
                onKeyPress={props.search} />
            <button className="mic">
                <FontAwesomeIcon icon={faMicrophone} className="mic-icon"/>
            </button>
            <button data-i18n="search" className="search-but" onClick={props.search}>Search</button>
        </div>
    );
}

export default SearchBar;