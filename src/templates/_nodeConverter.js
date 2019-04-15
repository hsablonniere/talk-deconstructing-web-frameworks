'use strict';

const document = require('./_document');
const notes = require('./_notes');

const blank = require('./blank');
const listing = require('./listing');
const media = require('./media');
const poster = require('./poster');
const question = require('./question');
const section = require('./section');
const text = require('./text');
const quote = require('./quote');
const problem = require('./problem');
const webComponents = require('./web-components');
const todo = require('./todo');
const video = require('./video');
const needs = require('./needs');
const bubble = require('./bubble');

module.exports = {
  document: node => document(node),
  image: (node) => {
    const attrs = node.getAttributes();
    if (attrs.slide === 'bubble') {
      return bubble(node);
    }
    return media(node);
  },
  listing: (node) => listing(node),
  paragraph: (node) => {
    const attrs = node.getAttributes();
    if (attrs.slide === 'poster') {
      return poster(node);
    }
    if (attrs.slide === 'needs') {
      return needs(node);
    }
    if (attrs.slide === 'question') {
      return question(node);
    }
    if (attrs.slide != null && attrs.slide.startsWith('todo')) {
      return todo(node);
    }
    if (attrs.slide === 'problem') {
      return problem(node);
    }
    if (attrs.slide === 'text') {
      return text(node);
    }
    if (attrs.slide === 'blank') {
      return blank(node);
    }
    if (attrs.slide === 'web-components') {
      return webComponents(node);
    }
    if (Object.keys(attrs).length === 0) {
      return notes(node);
    }
  },
  ulist: (node) => {
    const attrs = node.getAttributes();
    if (attrs.slide === 'web-components') {
      return webComponents(node);
    }
  },
  open: (node) => {
    const attrs = node.getAttributes();
    if (attrs.slide === 'needs') {
      return needs(node);
    }
  },
  // pass through
  preamble: (node) => node.getContent(),
  quote: (node) => quote(node),
  section: (node) => section(node) + node.getContent(),
  video: (node) => video(node),
};
