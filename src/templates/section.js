'use strict';

const slide = require('./_slide');

module.exports = (node) => {
  const attrs = node.getAttributes();
  const [pretitle, title] = node.getTitle().split(' : ');
  const balancedTitle = title.includes('  ')
    ? title
      .replace(/ /g, '&nbsp;')
      .replace(/&nbsp;&nbsp;/g, ' ')
    : title;
  const contenteditable = (attrs.contenteditable === 'true') ? 'contenteditable spellcheck="false"' : '';
  return slide('section', node, `<div class="pretitle">${pretitle}</div>
  <div class="title" ${contenteditable}>${balancedTitle}</div>`);
};
