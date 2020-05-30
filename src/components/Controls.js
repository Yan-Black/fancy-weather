import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { changeUnits, changeAppLang } from '../base/functionalConstants';
import { weatherCodesBel, weatherCodesRu, weatherCodesEng } from '../base/weatherCodes';
import { translationsToEng, translationsToRu, translationsToBel } from '../base/translateConstants';
import { daysBel, daysEng, daysRu, monthsBel, monthsRu, monthsEng } from '../base/translateConstants';
import { daysFullBel, daysFullEng, daysFullRu } from '../base/translateConstants';
import './css/Controls.css';

function revealList() {
  const langList = document.querySelector('.lang-list');
  langList.classList.toggle('hidden-list');
}

function changeActiveButton(e) {
  saveUnitsFormat(e);
  const fButton = document.querySelector('.change-f');
  const cButton = document.querySelector('.change-c');
  if(e.target.classList.contains('active-but')) {
    return
  }
  fButton.classList.toggle('active-but');
  cButton.classList.toggle('active-but');
  changeUnits(fButton);
}

function saveUnitsFormat(e) {
  const imperial = 'imerial';
  const metric = 'metric';
  if (e.target.className === 'change-f') {
      localStorage.setItem('units', imperial);
  } else {
    localStorage.setItem('units', metric);
  }
}

function selectLang(e) {
  const appLang = document.querySelector('.app-lang');
  const input = document.querySelector('.search-bar');
  const ru = 'ru';
  const en = 'en';
  const be = 'be';
  switch(e.target.innerText) {
    case 'RU':
      appLang.innerText = 'RU';
      input.placeholder = 'Поиск...';
      changeAppLang(translationsToRu, weatherCodesRu, daysRu, monthsRu, e.target.innerText, daysFullRu);
      localStorage.setItem('lang', ru);
      break;
    case 'EN':
      appLang.innerText = 'EN';
      input.placeholder = 'Search...';
      changeAppLang(translationsToEng, weatherCodesEng, daysEng, monthsEng, e.target.innerText, daysFullEng);
      localStorage.setItem('lang', en);
      break;
    case 'BE':
      appLang.innerText = 'BE';
      input.placeholder = 'Пошук...';
      changeAppLang(translationsToBel, weatherCodesBel, daysBel, monthsBel, 'be', daysFullBel);
      localStorage.setItem('lang', be);
      break;
    default:
      appLang.innerText = 'EN';
      input.placeholder = 'Search...';
      changeAppLang(translationsToEng, weatherCodesEng, daysEng, monthsEng, e.target.innerText, daysFullEng);
      localStorage.setItem('lang', en);
      break;
  }
}

function Controls(props) {
    return (
          <div className="controls">
            <div className="change-image" onClick={props.changeImg}>
              <FontAwesomeIcon icon={faSyncAlt} className="rotate-icon"/>
            </div>
            <div className="change-lang" onClick={revealList}>
              <p className="app-lang">EN</p>
              <FontAwesomeIcon icon={faAngleDown} />
              <ul className="lang-list hidden-list" onClick={selectLang}>
                <li className="lang-selector">RU</li>
                <li className="lang-selector">EN</li>
                <li className="lang-selector">BE</li>
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