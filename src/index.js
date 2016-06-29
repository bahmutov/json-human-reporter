'use strict'

const toHuman = require('./json-to-human')
const la = require('lazy-ass')
const is = require('check-more-types')
const fs = require('fs')

function toHumanFile (filename) {
  la(fs.existsSync(filename), 'cannot find file', filename)
  const json = JSON.parse(fs.readFileSync(filename, 'utf8'))
  return toHuman(json)
}

function jsonHumanReporter (filename) {
  if (is.unemptyString(filename)) {
    return toHumanFile(filename)
  }
}

module.exports = jsonHumanReporter
