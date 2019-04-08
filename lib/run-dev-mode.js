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
  server: './build',
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

const watcher = chokidar.watch(['./src', './build'], {
  persistent: true,
  ignoreInitial: true,
});

function onchange (path) {
  if (path.endsWith('___jb_tmp___')) {
    return;
  }
  console.log('add/change', path);
  if (path === 'src/slide-deck.adoc' || path.startsWith('src/templates')) {
    return buildSlideDeck();
  }
  if (path.startsWith('src/css')
    || path.startsWith('src/fonts')
    || path.startsWith('src/img')
    || path.startsWith('src/js')
    || path.startsWith('src/videos')) {
    const dstpath = path.replace(/^src\//, 'build/');
    return fs.copy(path, dstpath, (err) => err && console.log(err));
  }
  if (path.startsWith('build/')) {
    return bs.reload(path);
  }
}

watcher.on('add', onchange);
watcher.on('change', onchange);
watcher.on('unlink', (path) => {
  if (path.endsWith('___jb_tmp___')) {
    return;
  }
  console.log('unlink');
  if (path.startsWith('src/css')
    || path.startsWith('src/fonts')
    || path.startsWith('src/img')
    || path.startsWith('src/js')
    || path.startsWith('src/videos')) {
    const dstpath = path.replace(/^src\//, 'build/');
    console.log('delete path', dstpath);
    return fs.remove(dstpath, (err) => err && console.log(err));
  }
});

// takeScreenshot('http://localhost:8080', path.resolve(__dirname, '../src/img/poster_4-3.jpg'), {
//   width: 1920,
//   height: 1440,
// }, true);
//
// takeScreenshot('http://localhost:8080', path.resolve(__dirname, '../src/img/poster_16-9.jpg'), {
//   width: 1920,
//   height: 1080,
// }, true);
