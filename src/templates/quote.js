'use strict';

const slide = require('./_slide');
const { balanceText } = require('./lib');

module.exports = (node) => {
  const text = node.getContent();
  return slide('quote', node, `<div class="quote">${balanceText(text)}</div>`);
};
