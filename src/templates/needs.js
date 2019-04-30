'use strict';

const slide = require('./_slide');

module.exports = (node) => {

  const solution = node.getContent() !== '_'
    ? `<div class="solution">${node.getContent()}</div>`
    : '';

  const displayIndex = node.getAttributes().display != null
    ? Number(node.getAttributes().display)
    : null;

  const focus = (node.getAttributes().focus == null)
    ? null
    : node.getAttributes().focus
      .split(',')
      .filter((a) => a !== '')
      .map(Number);

  function hide (index) {
    if (displayIndex != null) {
      return (index >= displayIndex)
        ? `data-hidden`
        : '';
    }
    if (focus != null) {
      return (!focus.includes(index))
        ? `data-blur`
        : '';
    }
    return '';
  }

  return slide('needs', node, `
    ${solution}
    <div class="needs">
      <div class="needs-block">
        <div class="title">Users</div>
        <div class="list">
          <div class="need-item" ${hide(0)}>Fast (1st load)</div>
          <div class="need-item" ${hide(1)}>Fast (following navigations)</div>
          <div class="need-item" ${hide(2)}>Smooth and reactive (60 fps)</div>
          <div class="need-item" ${hide(3)}>Careful with battery, CPU, RAM...</div>
          <div class="need-item" ${hide(4)}>Accessibility</div>
          <div class="need-item" ${hide(5)}>Cross-device, cross-browser</div>
        </div>
      </div>
      <div class="needs-block">
        <div class="title">Devs</div>
        <div class="list">
          <div class="need-item" ${hide(6)}>Save time</div>
          <div class="need-item" ${hide(7)}>Clean code, reusability</div>
          <div class="need-item" ${hide(8)}>Simple mind model</div>
          <div class="need-item" ${hide(9)}>Isolation of impacts</div>
          <div class="need-item" ${hide(10)}>Avoid errors/bugs</div>
          <div class="need-item" ${hide(11)}>Collab. with non-devs</div>
        </div>
      </div>
    </div>
  `);
};
