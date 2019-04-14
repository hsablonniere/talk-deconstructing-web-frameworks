'use strict';

function balanceText (text) {
  if (!text.includes('  ')) {
    return text;
  }
  return text
    .replace(/   /g, '<br>')
    .split('  ')
    .map((t) => `<span class="one-line">${t}</span>`)
    .join(' ');
}

module.exports = {
  balanceText,
};
