'use strict';

const fs = require('fs-extra');
const del = require('del');

const { buildSlideDeck } = require('./build-slide-deck');

del(['build/**', '!build'])
  .then(() => fs.copy('node_modules/highlight.js/styles', 'build/css/highlight.js'))
  .then(() => fs.copy('src/css', 'build/css'))
  .then(() => fs.copy('src/fonts', 'build/fonts'))
  .then(() => fs.copy('src/img', 'build/img'))
  .then(() => fs.copy('src/js', 'build/js'))
  .then(() => fs.copy('src/videos', 'build/videos'))
  .then(() => buildSlideDeck());
