'use strict'

const toHuman = require('./json-to-human')
const la = require('lazy-ass')
const is = require('check-more-types')
const fs = require('fs')

function toJsonIgnoreLeadingText (text) {
  la(is.unemptyString(text), 'empty input text', text)
  const openingBrace = text.indexOf('{')
  la(openingBrace !== -1, 'could not find opening brace in', text)
  text = text.substr(openingBrace)
  const result = JSON.parse(text)
  return result
}

function toHumanFile (filename) {
  la(fs.existsSync(filename), 'cannot find file', filename)
  const text = fs.readFileSync(filename, 'utf8')
  const json = toJsonIgnoreLeadingText(text)
  return toHuman(json)
}

function jsonHumanReporter (filename) {
  if (is.unemptyString(filename)) {
    return toHumanFile(filename)
  }
}

module.exports = jsonHumanReporter
