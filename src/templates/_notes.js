'use strict';

const debugNode = require('../../lib/debugNode');

module.exports = (node, contents) => {
  const multilineContents = node.getContent()
    .replace(/\n/g, '<br>');
  return `<div class="notes">${multilineContents}</div>`;
};
