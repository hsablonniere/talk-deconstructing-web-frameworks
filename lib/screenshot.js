'use strict';

const fs = require('fs-extra');
const puppeteer = require('puppeteer');

const defaultViewport = {
  width: 1280,
  height: 960,
  isLandscape: true,
};

function wait (delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

async function takeScreenshot (url, filename, customViewport, force = false) {

  const viewport = Object.assign({}, defaultViewport);
  Object.assign(viewport, customViewport);

  viewport.deviceScaleFactor = viewport.deviceScaleFactor || (2880 / viewport.width);

  const exists = await fs.pathExists(filename);
  if (exists && force === false) {
    // console.log(`already exists: ${filename}`);
    return Promise.resolve();
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(url);

  if (url.includes('github.com')) {
    console.log('inject');
    await page.addStyleTag({
      content: `.commit-tease, .file-wrap, .signup-prompt-bg { display: none }`,
    });
  }

  if (url.includes('caniuse.com')) {

    await page.evaluate(() => localStorage.setItem('config-agents', 'ie,edge,firefox,chrome,safari,ios_saf,and_chr,samsung'));
    await page.evaluate(() => localStorage.setItem('config-default_showmode', '0'));
    await page.evaluate(() => localStorage.setItem('config-default_viewmode', 'view-mode-normal'));
    await page.reload();
    await wait(1000);

    console.log('inject');
    await page.addStyleTag({
      content: `.feature-title { font-weight: bold; font-size: 3em; }
.support-list h4 { height:55px; font-weight: bold; font-size: 1.2em; }
.stat-cell { font-weight: bold; font-size: 1.6em; }
.view-mode-control { display: none; }`,
    });

    const element = await page.$('.feature-block');
    await element.screenshot({ path: filename });
  }
  // else if (url.includes('twitter.com')) {
  //   const element = await page.$('.permalink-tweet-container');
  //   await element.screenshot({ path: filename });
  // }
  else {
    await page.screenshot({ path: filename });
  }

  console.log(`saving file to ${filename}`);

  await browser.close();
}

module.exports = { takeScreenshot };
