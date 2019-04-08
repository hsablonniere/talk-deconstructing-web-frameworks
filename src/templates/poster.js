'use strict';

const slide = require('./_slide');

module.exports = (node) => {

  const docAttrs = node.document.getAttributes();
  const attrs = node.getAttributes();
  const [title, subtitle] = docAttrs.doctitle.split(' : ');

  const $title = (node.getTitle())
    ? `<div class="header">
         <div class="title">${node.title}</div>
      </div>`
    : `<div class="header">
        <div class="title">
          <div class="line"><span class="key">le</span><span class="word">Web</span></div>
          <div class="line"><span class="key">ses</span><span class="word">Frameworks</span></div>
          <div class="line"><span class="key">et ses</span><span class="word">Standards</span></div>
        </div>
        <div class="subtitle">${subtitle}</div>
      </div>`;

  return slide('poster', node, `
  ${$title}
  <div class="details">
    <div class="details_author">
      <div class="author-company">${docAttrs['author-company']}</div>
      <div class="author-twitter">${docAttrs['author-twitter']}</div>
      <div class="author">${docAttrs.author}</div>
    </div>
    <div class="details_event">
      <div class="event">${docAttrs.event}</div>
      <div class="date">${docAttrs.date}</div>
      <div class="hashtags">${docAttrs.hashtags}</div>
    </div>
  </div>`);
};
