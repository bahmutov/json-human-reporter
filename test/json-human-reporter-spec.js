'use strict'

/* global describe, it */
const jhr = require('json-human-reporter')
const relative = require('path').join.bind(null, __dirname)
const la = require('lazy-ass')
const is = require('check-more-types')

describe('json-human-reporter', () => {
  describe('works with files', () => {
    it('handles all successful tests', () => {
      const filename = relative('./example.json')
      const output = jhr(filename)
      la(is.unemptyString(output), 'converted output', output)
    // console.log(output)
    })

    it('handles some failures', () => {
      const filename = relative('./fail.json')
      const output = jhr(filename)
      la(is.unemptyString(output), 'converted output', output)
    // console.log(output)
    })

    it('ignores leading text', () => {
      const filename = relative('./leading-text.json')
      const output = jhr(filename)
      la(is.unemptyString(output), 'converted output', output)
    // console.log(output)
    })
  })
})
