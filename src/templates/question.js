'use strict';

const slide = require('./_slide');

module.exports = (node) => {
  const question = node.getContent()
    .replace(' ?', '&nbsp;?');
  const balancedQuestion = question.includes('  ')
    ? question
      .replace(/ /g, '&nbsp;')
      .replace(/&nbsp;&nbsp;/g, ' ')
    : question;
  return slide('question', node, `<div class="text">${balancedQuestion}</div>`);
};
