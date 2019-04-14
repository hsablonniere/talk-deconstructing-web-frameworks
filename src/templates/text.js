'use strict';

const slide = require('./_slide');
const { balanceText } = require('./lib');

module.exports = (node) => {
  const text = node.getContent();
  return slide('text', node, `<div>${balanceText(text)}</div>`);
};
