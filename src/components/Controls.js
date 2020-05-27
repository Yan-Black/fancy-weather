import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import './css/Controls.css';

function revealList() {
  const langList = document.querySelector('.lang-list');
  langList.classList.toggle('hidden-list');
}

function changeActiveButton(e) {
  const fButton = document.querySelector('.change-f');
  const cButton = document.querySelector('.change-c');
  if(e.target.classList.contains('active-but')) {
    return
  }
  fButton.classList.toggle('active-but');
  cButton.classList.toggle('active-but');
}

function changeAppLang(e) {
  const appLang = document.querySelector('.app-lang');
  switch(e.target.innerText) {
    case 'RU':
      appLang.innerText = 'RU';
      break;
    case 'EN':
      appLang.innerText = 'EN';
      break;
    case 'BY':
      appLang.innerText = 'BY';
      break;
    default:
      appLang.innerText = 'EN';
      break;
  }
}

function Controls() {
    return (
          <div className="controls">
            <div className="change-image">
              {/* <FontAwesomeIcon icon={faSyncAlt} className="rotate-icon"/> */}
            </div>
            <div className="change-lang" onClick={revealList}>
              <p className="app-lang">EN</p>
              {/* <FontAwesomeIcon icon={faAngleDown} /> */}
              <ul className="lang-list hidden-list" onClick={changeAppLang}>
                <li className="RU">RU</li>
                <li className="EN">EN</li>
                <li className="BY">BY</li>
              </ul>
            </div>
            <div className="change-units">
                <button className="change-f" onClick={changeActiveButton}>F°</button>
                <button className="change-c active-but" onClick={changeActiveButton}>C°</button>
            </div>
          </div>
    )
}

export default Controls