'use strict';

const slide = require('./_slide');
const { balanceText } = require('./lib');

module.exports = (node) => {
  const text = node.getContent();
  const classes = node.getRoles();
  return slide('text', node, classes, `<div>${balanceText(text)}</div>`);
};
