'use strict';

/*
 * Inspired by those:
 * https://github.com/asciidoctor/asciidoctor-template.js
 * https://github.com/s-leroux/asciidoctor.js-pug
 * https://github.com/asciidoctor/asciidoctor-bespoke
 */

const debugNode = require('./debugNode')

function initAsciidoctorWithTemplates (templates) {

  const asciidoctor = require('asciidoctor.js')();
  const Opal = global.Opal;

  Opal.top.$require('asciidoctor/converter/html5');
  const Asciidoctor = Opal.const_get_qualified('::', 'Asciidoctor');
  const Converter = Opal.const_get_qualified(asciidoctor, 'Converter');
  const Html5Converter = Opal.const_get_qualified(Converter, 'Html5Converter');

  Opal.top.$require('asciidoctor/converter/factory');
  const Factory = Opal.const_get_qualified(Converter, 'Factory');

  Opal.top.$require('asciidoctor/converter/composite');
  const CompositeConverter = Opal.const_get_qualified(Converter, 'CompositeConverter');

  const CustomTemplatesConverter = Opal.Class.$new(Opal.Object);
  Opal.defn(CustomTemplatesConverter, '$initialize', () => {
  });

  Opal.defn(CustomTemplatesConverter, '$handles?', (transform) => {
    const handles = templates[transform] != null;
    if (!handles) {
      console.log('not handled', transform);
    }
    return handles;
  });

  Opal.defn(CustomTemplatesConverter, '$convert', function (node, transform, opts) {
    const applyTemplate = templates[transform];
    const html = applyTemplate(node, opts);
    if (html == null) {
      console.error('Unknown conversion!');
      debugNode(node);
    }
    return html;
  });

  const opts = Opal.hash2([], {});
  const backend = 'html5';

  Factory.$register(CompositeConverter.$new(
    backend,
    CustomTemplatesConverter.$new(),
    Html5Converter.$new(backend, opts)), [backend]);

  return { asciidoctor };
}

module.exports = initAsciidoctorWithTemplates;
