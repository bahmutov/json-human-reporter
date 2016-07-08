'use strict'

const toHuman = require('../json-to-human')
const la = require('lazy-ass')
const is = require('check-more-types')
const fs = require('fs')
const log = require('debug')('json')

function toJsonIgnoreLeadingText (text) {
  la(is.unemptyString(text), 'empty input text', text)
  const openingBrace = text.indexOf('{')
  la(openingBrace !== -1, 'could not find opening brace in', text)
  text = text.substr(openingBrace)
  const result = JSON.parse(text)
  return result
}

function loadExistingFile (filename) {
  la(fs.existsSync(filename), 'cannot find file', filename)
  const text = fs.readFileSync(filename, 'utf8')
  const json = toJsonIgnoreLeadingText(text)
  return json
}

function toHumanFile (filenames, options) {
  const jsons = filenames.map(loadExistingFile)
  log('converting to human form test results from files')
  log(filenames)
  log('using options', options)
  return toHuman.apply(null, jsons.concat(options))
}

function jsonHumanReporter (filenames, options) {
  if (is.string(filenames)) {
    filenames = [filenames]
  }
  la(is.array(filenames), 'expected list of filenames', filenames)

  options = options || {}
  const cleanOptions = {
    stack: (options.stack || options.s) === 'true'
  }

  if (is.unempty(filenames)) {
    return toHumanFile(filenames, cleanOptions)
  }
}

module.exports = jsonHumanReporter
