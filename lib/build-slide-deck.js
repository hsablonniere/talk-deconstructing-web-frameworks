'use strict';

const path = require('path');

const fs = require('fs-extra');
const initAsciidoctorWithTemplates = require('./asciidoctor-with-templates');

async function buildSlideDeck () {

  const templatesPath = path.resolve(__dirname, '../src/templates');
  // TODO: move this elswhere
  for (let key in require.cache) {
    if (key.startsWith(templatesPath)) {
      delete require.cache[key];
    }
  }
  const convertNode = require('../src/templates/_nodeConverter');

  const { asciidoctor } = initAsciidoctorWithTemplates(convertNode);
  const asciidoc = await fs.readFile('src/slide-deck.adoc', 'utf-8');

  const html = asciidoctor.convert(asciidoc, {
    header_footer: 'true',
    sourcemap: 'true',
    attributes: {
      foo: 'bar',
    },
  });
  return fs.writeFile('build/index.html', html);
}

module.exports = { buildSlideDeck };
