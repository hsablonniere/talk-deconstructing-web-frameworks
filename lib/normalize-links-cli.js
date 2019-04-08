'use strict'

const _ = require('lodash')
const pathJoin = require('path').join
const { getTitleAndUrl } = require('./get-title-and-url.js')
const fs = require('fs-extra')

const sourceFilename = pathJoin(__dirname, '../src/notes/manual-links.txt')
const targetFilename = pathJoin(__dirname, '../src/notes/manual-links.clean.json')
const targetFilenameAdoc = pathJoin(__dirname, '../src/notes/manual-links.clean.adoc')

async function run () {

  const dirtyLinksFile = await fs.readFile(sourceFilename, 'utf8')
  const dirtyLinks = dirtyLinksFile
    .split('\n')
    .filter((a) => a != null && a !== '')
    .map((a) => ({ url: a }))

  const allCleanLinks = []
  const hostnames = {}

  let i = 0
  // dirtyLinks.length = 10
  let total = dirtyLinks.length
  let totalStrLength = String(dirtyLinks.length).length

  for (let link of dirtyLinks) {
    const cleanLink = await getTitleAndUrl(link.url)
    allCleanLinks.push(cleanLink)
    console.log(`${String(++i).padStart(totalStrLength, '00')}/${total}: ${cleanLink.url}`)
    if (hostnames[cleanLink.hostname] == null) {
      hostnames[cleanLink.hostname] = 0
    }
    hostnames[cleanLink.hostname] += 1
  }

  const sortedLinks = _.sortBy(allCleanLinks, ['hostname', 'url'])
  await fs.outputJson(targetFilename, sortedLinks, { spaces: 2 })
  console.log(`Clean links saved to ${targetFilename}`)

  const adocContents = sortedLinks
    .map(({ url, title }) => {
      return `* ${url}
** ${title}`
    })
    .join('\n\n')

  await fs.outputFile(targetFilenameAdoc, adocContents)

  const sortedHosts = _.chain(hostnames)
    .entries()
    .map(([hostname, count]) => ({ hostname, count }))
    .filter(({ count }) => count >= 0)
    .orderBy(['count', 'hostname'], ['desc', 'asc'])
    .value()
  const maxStringLength = String(sortedHosts[0].count).length

  console.log(``)
  console.log(`Hosts summary:`)
  console.log(``)
  sortedHosts.forEach(({ hostname, count }) => {
    console.log(`${String(count).padStart(maxStringLength, '0')} => ${hostname}`)
  })
}

run()
  .then(console.log)
  .catch(console.error)
