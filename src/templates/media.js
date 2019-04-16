'use strict';

const path = require('path');
const fs = require('fs');
const { takeScreenshot } = require('../../lib/screenshot');

const slide = require('./_slide');

module.exports = (node) => {
  const attrs = node.getAttributes();
  const classes = node.getRoles();

  // let svgFile
  // if (attrs.target.endsWith('.svg')) {
  //   svgFile = fs.readFileSync(path.resolve('src', attrs.target), 'utf-8');
  // }

  if (attrs.url != null) {
    classes.push('dark');
    const viewport = {};
    if (attrs.width != null) {
      viewport.height = Number(attrs.width) * 3 / 4;
      viewport.width = Number(attrs.width);
    }

    console.log('generating screenshot', attrs.url);

    if (attrs.url.startsWith('https://caniuse.com')) {
      viewport.deviceScaleFactor = 1.75;
      // takeScreenshot(attrs.url, path.resolve('src', attrs.target), viewport);
      return slide('media', node, classes, `<img class="element" src="${attrs.target}">`);
    }

    if (attrs.url.startsWith('https://twitter.com')) {
      if (attrs.url.includes('/status/')) {
        classes.push('twitter');
      }
      viewport.deviceScaleFactor = 3;
      takeScreenshot(attrs.url, path.resolve('src', attrs.target), viewport);
      if (attrs.url.includes('/status/')) {
        return slide('media', node, classes, `<img class="element" src="${attrs.target}">`);
      }
    }

    takeScreenshot(attrs.url, path.resolve('src', attrs.target), viewport);
    return slide('media', node, classes, `<div class="browser">
    <figcaption class="url"><a href="${attrs.url}" target="_blank" rel="noopener">${attrs.url}</a></figcaption>
    <img class="element" src="${attrs.target}">
  </div>`);
  }

  const author = (attrs.author) ? `<div class="author">Photo by ${attrs.author}</div>` : '';
  const figcaption = (node.getTitle() || attrs.url) ? `<figcaption class="caption">${node.getTitle() || attrs.url}</figcaption>` : '';

  // if (attrs.target.endsWith('.svg')) {
  //   return slide('media', node, classes, `<div class="element element--svg">${svgFile}</div>
  // ${author}
  // ${figcaption}`);
  // }

  return slide('media', node, classes, `<img class="element" src="${attrs.target}">
  ${author}
  ${figcaption}`);
};
