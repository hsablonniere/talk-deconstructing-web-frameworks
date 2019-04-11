'use strict';

const { buildSlideDeck } = require('./build-slide-deck');

Promise.all([
  buildSlideDeck('src/slide-deck/slide-deck.fr.adoc'),
  buildSlideDeck('src/slide-deck/slide-deck.en.adoc'),
])
  .then(console.log)
  .catch(console.error);
