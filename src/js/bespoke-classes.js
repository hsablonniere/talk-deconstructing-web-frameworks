'use strict';

// adapted from https://github.com/bespokejs/bespoke-classes/blob/master/lib/bespoke-classes.js

export default function configurePlugin () {

  return function initPlugin (deck) {

    deck.on('activate', ({ index }) => {
      deck.slides.forEach((slide, slideIdx) => {
        if (slideIdx < index) {
          slide.dataset.position = 'before';
        }
        if (slideIdx === index) {
          slide.dataset.position = 'current';
        }
        if (slideIdx > index) {
          slide.dataset.position = 'after';
        }
        slide.dataset.relativeIndex = (slideIdx - index);
      });
    });
  };
}
