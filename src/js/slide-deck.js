'use strict';

import * as bespoke from './bespoke.js';
import classes from './bespoke-classes.js';
import hash from './bespoke-hash.js';
import multimedia from './bespoke-multimedia.js';
import multilang from './bespoke-multilang.js';
import navKbd from './bespoke-nav-kbd.js';
import protocol from './bespoke-protocol.js';
import toggleState from './bespoke-toggle-state.js';

const deck = bespoke.from({ parentSelector: 'body', slidesSelector: 'section.slide' }, [
  navKbd(),
  classes(),
  multimedia(),
  toggleState(),
  // should be last
  hash(),
  protocol(),
  // multilang(),
]);
