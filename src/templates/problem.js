'use strict';

const slide = require('./_slide');
const { balanceText } = require('./lib');

module.exports = (node) => {
  const problem = node.getTitle();
  const text = node.getContent();
  return slide('problem', node, `<div>
    <div class="problem">${problem}</div>
    <div class="text">${balanceText(text)}</div>
  </div>`);
};
