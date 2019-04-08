'use strict';

const slide = require('./_slide');

module.exports = (node) => {
  const attrs = node.getAttributes();

  const author = (attrs.author) ? `<div class="author">Photo by ${attrs.author}</div>` : '';
  const figcaption = (node.getTitle()) ? `<figcaption class="caption">${node.getTitle()}</figcaption>` : '';

  return slide('media', node, node.getRoles(), `
  <video class="element" src="${attrs.target}" loop></video>
  ${author}
  ${figcaption}`);
};
