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
        <div class="title">User</div>
        <div class="list">
          <div class="need-item" ${hide(0)}>Rapidité (1er chargement)</div>
          <div class="need-item" ${hide(1)}>Rapidité (navigations consécutives)</div>
          <div class="need-item" ${hide(2)}>Fluidité + réactivité</div>
          <div class="need-item" ${hide(3)}>Conso. (batterie, RAM, CPU)</div>
          <div class="need-item" ${hide(4)}>Accessibilité</div>
          <div class="need-item" ${hide(5)}>Responsive</div>
        </div>
      </div>
      <div class="needs-block">
        <div class="title">Dev</div>
        <div class="list">
          <div class="need-item" ${hide(6)}>Gagner du temps</div>
          <div class="need-item" ${hide(7)}>Code propre, réutilisable</div>
          <div class="need-item" ${hide(8)}>Modèle de pensée simple</div>
          <div class="need-item" ${hide(9)}>Isolation des impacts</div>
          <div class="need-item" ${hide(10)}>Ne pas dépendre des outils</div>
          <div class="need-item" ${hide(11)}>Collab. avec 1 designer</div>
        </div>
      </div>
    </div>
  `);
};
