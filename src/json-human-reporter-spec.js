'use strict'

/* global describe, it */
const jhr = require('json-human-reporter')
const relative = require('path').join.bind(null, __dirname)
const la = require('lazy-ass')
const is = require('check-more-types')

describe('json-human-reporter', () => {
  it('accepts filename', () => {
    const filename = relative('../test/example.json')
    const output = jhr(filename)
    la(is.unemptyString(output), output)
  })
})
