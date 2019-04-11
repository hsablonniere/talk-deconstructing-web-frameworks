'use strict';

const path = require('path');

const fs = require('fs-extra');
const initAsciidoctorWithTemplates = require('./asciidoctor-with-templates');

async function buildSlideDeck (sourcePath) {

  const destPath = sourcePath.replace(/slide-deck\/slide-deck\.(.*)\.adoc$/, 'index.$1.html');

  const templatesPath = path.resolve(__dirname, '../src/templates');
  // TODO: move this elswhere
  for (let key in require.cache) {
    if (key.startsWith(templatesPath)) {
      delete require.cache[key];
    }
  }
  const convertNode = require('../src/templates/_nodeConverter');

  const { asciidoctor } = initAsciidoctorWithTemplates(convertNode);
  const asciidoc = await fs.readFile(sourcePath, 'utf-8');

  const html = asciidoctor.convert(asciidoc, {
    header_footer: 'true',
    sourcemap: 'true',
    attributes: {
      foo: 'bar',
    },
  });
  return fs.writeFile(destPath, html);
}

module.exports = { buildSlideDeck };
