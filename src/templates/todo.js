'use strict';

const slide = require('./_slide');

module.exports = (node) => {
  const text = node.getContent();
  return slide('todo', node, `
    <div>${text}</div>
  `);
};
