'use strict'

const URL = require('url').URL
const request = require('superagent')
const cheerio = require('cheerio')

function getTitleAndUrl (dirtyUrl) {

  const filteredUrlObject = new URL(dirtyUrl)
  filteredUrlObject.searchParams.delete('utm_source')
  filteredUrlObject.searchParams.delete('utm_medium')
  filteredUrlObject.searchParams.delete('utm_campaign')
  const filteredUrl = filteredUrlObject.toString()

  return request
    .get(filteredUrl)
    .redirects(5)
    .then((res) => {

      const $ = cheerio.load(res.text)

      const [redirectedUrl] = res.redirects.slice(-1)
      const canonicalUrl = $('link[rel="canonical"]').attr('href')
      const definitiveUrl = [canonicalUrl, redirectedUrl, filteredUrl].find((a) => a != null)

      const title = $('title').text().replace(/\n+/g, '').trim()

      const hostname = new URL(definitiveUrl).hostname

      return { url: definitiveUrl, title, hostname }
    })
    .catch((err) => {
      if (err.status === 404) {
        return { url: filteredUrl, title: 'NOT FOUND', hostname: filteredUrlObject.hostname }
      }
      else {
        console.error(err, dirtyUrl)
      }
    })
}

module.exports = {
  getTitleAndUrl,
}
