'use strict';

const slide = require('./_slide');
const { balanceText } = require('./lib');

module.exports = (node) => {
  const attrs = node.getAttributes();
  const bubble = node.getTitle();
  const position = attrs.target.includes('-l-')
    ? 'left'
    : 'right';
  return slide('bubble', node, `
    <div class="bubble-wrapper" data-position="${position}">
      <div class="bubble">${balanceText(bubble)}</div>  
    </div>
    <img src="${attrs.target}" alt="">
  `);
};
