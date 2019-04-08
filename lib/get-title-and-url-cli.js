'use strict'

const { getTitleAndUrl } = require('./get-title-and-url.js')

async function run () {
  const dirtyUrl = process.argv[2]
  const cleanUrl = await getTitleAndUrl(dirtyUrl)

  console.log('Dirty URL input:')
  console.log(dirtyUrl)

  console.log('')
  console.log(`Clean URL:`)
  console.log(cleanUrl.url)

  console.log('')
  console.log(`Title:`)
  console.log(cleanUrl.title)
}

run()
  .then(console.log)
  .catch(console.error)
