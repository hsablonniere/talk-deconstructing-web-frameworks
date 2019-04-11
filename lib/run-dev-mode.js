'use strict';

const path = require('path');

const bs = require('browser-sync').create();
const chokidar = require('chokidar');
const { buildSlideDeck } = require('./build-slide-deck');
const { takeScreenshot } = require('./screenshot');
const fs = require('fs-extra');

const port = 8080;
bs.init({
  port,
  server: './src',
  ghostMode: false,
  open: false,
  notify: false,
  reloadDebounce: 500,
});

let subdomain = process.cwd()
  .toLowerCase()
  .replace(require('os').homedir(), '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/-$/g, '')
  .replace(/^-/g, '');

console.log(`http://${subdomain}.localhost:${port}\n`);

const observedPaths = ['./src'];
const watcher = chokidar.watch(observedPaths, {
  persistent: true,
  ignoreInitial: true,
});

function onchange (path) {
  if (path.endsWith('___jb_tmp___')) {
    return;
  }
  console.log('add/change', path);
  if (path.startsWith('src/templates')) {
    return Promise.all([
      buildSlideDeck('src/slide-deck/slide-deck.fr.adoc'),
      buildSlideDeck('src/slide-deck/slide-deck.en.adoc'),
    ]);
  }
  if (path === 'src/slide-deck/slide-deck.fr.adoc') {
    return Promise.all([
      buildSlideDeck('src/slide-deck/slide-deck.fr.adoc'),
    ]);
  }
  if (path === 'src/slide-deck/slide-deck.en.adoc') {
    return Promise.all([
      buildSlideDeck('src/slide-deck/slide-deck.en.adoc'),
    ]);
  }
  return bs.reload(path);
}

watcher.on('add', onchange);
watcher.on('change', onchange);

// takeScreenshot('http://localhost:8080', path.resolve(__dirname, '../src/img/poster_4-3.jpg'), {
//   width: 1920,
//   height: 1440,
// }, true);
//
// takeScreenshot('http://localhost:8080', path.resolve(__dirname, '../src/img/poster_16-9.jpg'), {
//   width: 1920,
//   height: 1080,
// }, true);
