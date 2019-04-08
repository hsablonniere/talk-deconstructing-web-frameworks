'use strict';

const slide = require('./_slide');

module.exports = (node) => {
  const [keyword, subtext] = node.getContent().split(' : ');
  const balancedSubtext = (subtext || '').includes('  ')
    ? subtext
      .replace(/ /g, '&nbsp;')
      .replace(/&nbsp;&nbsp;/g, ' ')
    : subtext;
  return slide('text', node, `<div class="keyword">${keyword}</div>
${ subtext ? `<div class="subtext">${balancedSubtext}</div>` : '' }`);
};
