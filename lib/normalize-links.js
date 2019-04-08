'use strict'

const _ = require('lodash')
const { getTitleAndUrl } = require('./get-title-and-url.js')

async function readStdin ({ trim }) {
  const allChunks = []

  return new Promise((resolve) => {

    process.stdin.setEncoding('utf8')

    process.stdin.on('readable', () => {
      let chunk
      // Use a loop to make sure we read all available data.
      while ((chunk = process.stdin.read()) !== null) {
        allChunks.push(chunk)
      }
    })

    process.stdin.on('end', () => {
      const input = allChunks.join('')
      if (trim) {
        resolve(input.trim())
      }
      else {
        resolve(input)
      }
    })
  })
}

async function run () {

  const rawInput = await readStdin({ trim: true })

  const dirtyLinks = rawInput.split('\n')

  const allCleanLinks = []

  for (let link of dirtyLinks) {
    const cleanLink = await getTitleAndUrl(link)
    allCleanLinks.push(cleanLink)
  }

  const sortedLinks = _.sortBy(allCleanLinks, ['hostname', 'url'])

  const asciidocContents = sortedLinks
    .map(({ url, title }) => {
      return `* ${url}
** ${title}`
    })
    .join('\n\n')

  return asciidocContents
}

run()
  .then(console.log)
  .catch(console.error)
