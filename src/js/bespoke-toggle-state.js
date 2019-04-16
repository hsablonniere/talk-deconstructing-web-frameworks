'use strict';

import _debounce from './_debounce.js';

export default function configurePlugin () {

  return function initPlugin (deck) {

    const music = document.querySelector('#gymnopedie');

    const toggleMusic = _debounce(() => {
      console.log('toggle');
      if (music.paused) {
        music.play();
      }
      else {
        music.pause();
        music.currentTime = 0;
      }
    }, 700);

    deck.on('toggle-slide-deck-state', ({ state, enabled }) => {
      document.body.classList.toggle(`state-${state}`, enabled);
      if (state === 'four') {
        if (deck.slide() < 40 || deck.slide() > deck.slides.length - 4) {
          toggleMusic();
        }
      }
    });

    deck.on('activate', ({ index }) => {
      if (deck.slides[index].classList.contains('play-music')) {
        music.play();
      }
      if (deck.slides[index].classList.contains('reset-music')) {
        music.currentTime = 0;
      }
      if (deck.slides[index].classList.contains('stop-music')) {
        music.pause();
        music.currentTime = 0;
      }
    });
  };
}
