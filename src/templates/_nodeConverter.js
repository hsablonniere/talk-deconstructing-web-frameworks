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
const todo = require('./todo');
const video = require('./video');

module.exports = {
  document: node => document(node),
  image: (node) => media(node),
  listing: (node) => listing(node),
  paragraph: (node) => {
    const attrs = node.getAttributes();
    if (attrs.slide === 'poster') {
      return poster(node);
    }
    if (attrs.slide === 'question') {
      return question(node);
    }
    if (attrs.slide === 'todo') {
      return todo(node);
    }
    if (attrs.slide === 'text') {
      return text(node);
    }
    if (attrs.slide === 'blank') {
      return blank(node);
    }
    if (Object.keys(attrs).length === 0) {
      return notes(node);
    }
  },
  // pass through
  preamble: (node) => node.getContent(),
  section: (node) => section(node) + node.getContent(),
  video: (node) => video(node),
};
