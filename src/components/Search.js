import React, { useState, useEffect } from 'react';
import './css/Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

function SearchBar(props) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const [tscript, setTscript] = useState('');

    recognition.lang = 'en-US';

    recognition.onstart = () => {
        const input = document.getElementById('searcher');
        input.value = '';
    }

    recognition.onresult = (e) => {
        const { resultIndex } = e;
        const input = document.getElementById('searcher');
        setTscript(e.results[resultIndex][0].transcript);
        input.value = tscript;
        toggleSpeechRecorder();
    }

    function toggleSpeechRecorder() {
        const mic = document.querySelector('.mic-icon');
        mic.classList.toggle('mic-active');
        if (mic.classList.contains('mic-active')) {
            recognition.start();
        } else {
            recognition.stop();
        }
    }

    return(
        <div className="search-box">
            <input id="searcher" type="text" className="search-bar" placeholder="Search..."
                onChange={e => props.fn(e.target.value)}
                value={props.query} 
                onKeyPress={props.search} />
            <button className="mic">
                <FontAwesomeIcon icon={faMicrophone} onClick={toggleSpeechRecorder}className="mic-icon"/>
            </button>
            <button data-i18n="search" className="search-but" onClick={props.search || tscript}>Search</button>
        </div>
    );
}

export default SearchBar;