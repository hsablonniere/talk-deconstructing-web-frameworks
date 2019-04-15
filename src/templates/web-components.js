'use strict';

const slide = require('./_slide');
const { balanceText } = require('./lib');

module.exports = (node) => {
  const displayIdx = Number(node.getAttributes().display);
  const title = node.getCaptionedTitle();
  const hasItems = Array.isArray(node.getContent());
  let items = '';
  if (hasItems) {
    const rawItems = node.getContent()
      .map((item, idx) => {
        const hidden = idx >= displayIdx
          ? 'class="hidden"'
          : '';
        return `<li ${hidden}>${item.text}</li>`;
      })
      .join('\n');
    items = `<ul>${rawItems}</ul>`;
  }

  return slide('web-components', node, `
    <div class="title">${title}</div>
    ${items}
  `);
};
