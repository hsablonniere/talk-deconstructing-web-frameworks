'use strict';

const slide = require('./_slide');

module.exports = (node) => {

  const docAttrs = node.document.getAttributes();
  const attrs = node.getAttributes();
  const [title, subtitle] = docAttrs.doctitle.split(' : ');

  const titleParts = title.split('  ')

  const $title = (node.getTitle())
  ? `<div class="title">
      ${node.title.split('  ').map((txt) => `<span>${txt}</span>`).join('\n')}
    </div>`
  : `<div class="title">
      ${titleParts.map((txt) => `<span>${txt}</span>`).join('\n')}
    </div>
    <div class="subtitle">${subtitle}</div>`;

  return slide('poster', node, `
  <div class="header">
    <div class="details">
      <div class="author">${docAttrs.author}</div>
      <div class="author-twitter">${docAttrs['author-twitter']}</div>
      <div class="author-company">${docAttrs['author-company']}</div>
      <div class="date">${docAttrs.date}</div>
      <div class="event">${docAttrs.event}</div>
    </div>
    ${$title}
  </div>
  `);
};
