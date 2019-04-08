'use strict';

export default function configurePlugin () {

  return function initPlugin (deck) {

    const sherlock = document.querySelector('#sherlock-sound');
    const sherlockFull = document.querySelector('#sherlock-sound-full');

    deck.on('toggle-slide-deck-state', ({ state, enabled }) => {
      document.body.classList.toggle(`state-${state}`, enabled);
      if (state === 'four') {
        if (deck.slide() < 5) {
          if (enabled) {
            sherlock.play();
          }
          else {
            sherlock.pause();
            sherlock.currentTime = 0;
          }
        }
        if (deck.slide() > deck.slides.length - 4) {
          if (enabled) {
            sherlockFull.play();
          }
          else {
            sherlockFull.pause();
            sherlockFull.currentTime = 0;
          }
        }
      }
    });
  };
}
