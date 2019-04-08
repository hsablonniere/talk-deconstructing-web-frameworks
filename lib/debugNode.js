'use strict';

module.exports = function debugNode (node) {
  for (let prop in node) {
    if (typeof node[prop] !== 'function') {
      if (node.hasOwnProperty(prop)) {
        if (prop !== 'blocks') {
          if (prop !== 'document') {
            if (prop !== 'parent') {
              console.log(prop, node[prop]);
            }
          }
        }
      }
    }
  }
};
