'use strict';

const highlightjs = require('highlight.js');

const slide = require('./_slide');

module.exports = (node) => {

  const attrs = node.getAttributes();
  const title = node.getTitle()
    ? `<div class="title">${node.getTitle()}</div>`
    : '';

  return slide('listing', node, `${title}
<pre class="codeBlock" data-lang="${attrs.language}">
${highlightjs.highlight(attrs.language, node.getContent()).value}
</pre>`);
};
