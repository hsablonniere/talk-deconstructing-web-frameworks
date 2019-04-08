'use strict';

const slide = require('./_slide');

module.exports = (node) => {
  return slide('blank', node, node.getRoles(), '');
};
