export const { getName } = require('country-list');
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const ID_API ={
  key: '465144289736aa',
  base: 'https://ipinfo.io/'
}
export const WEATHER_API = {
  key: 'ca2af16f2e06c1e0b367014ae6b14e53',
  base: 'https://api.openweathermap.org/data/2.5/'
};
export const BACKGROUND_API = {
  key: 'a96vjeJorduF_JUfRtLii9qY2b8-tX3cZG0T_Si10W0',
  base: 'https://api.unsplash.com/photos/'
};

export const setNewBackImage = (fn, src, loader) => {
  fn(src);
  if(loader) {
    setTimeout(() => {
      loader.classList.add('preloader-fade-out');
    }, 800); 
    setTimeout(() => {
      loader.remove();
    }, 1300); 
  }
} 
