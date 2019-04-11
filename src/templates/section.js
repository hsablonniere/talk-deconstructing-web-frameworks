'use strict';

const slide = require('./_slide');

module.exports = (node) => {
  const classes = node.getRoles().includes('old')
    ? ['old']
    : [];
  const $video = node.getRoles().includes('old')
    ? `<video src="./videos/old-movie.webm" muted loop></video>`
    : '';
  const attrs = node.getAttributes();
  const [title, pretitle = ''] = node.getTitle().split(' : ').reverse();
  const balancedTitle = title.includes('  ')
    ? title
      .replace(/ /g, '&nbsp;')
      .replace(/&nbsp;&nbsp;/g, '<br>')
    : title;
  const contenteditable = (attrs.contenteditable === 'true') ? 'contenteditable spellcheck="false"' : '';
  return slide('section', node, classes, `
    <div class="pretitle">${pretitle}</div>
    <div class="title" ${contenteditable}>${balancedTitle}</div>
    ${$video}
  `);
};
