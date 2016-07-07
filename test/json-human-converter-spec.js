'use strict'

/* global describe, it */
const toHuman = require('json-human-reporter/json-to-human')
const la = require('lazy-ass')
const is = require('check-more-types')

describe('json-to-human converter', () => {
  it('is a function', () => {
    la(is.fn(toHuman))
  })

  it('converts json object into text', () => {
    const passes = [{
      'title': 'foo bar',
      'fullTitle': 'all foo bar',
      'duration': 0,
      'currentRetry': 0,
      'err': {}
    }]
    const failures = []
    const pending = []

    const testResult = {
      tests: passes,
      pending: pending,
      failures: failures,
      passes: passes
    }
    const text = toHuman(testResult)
    la(is.unemptyString(text))
    la(/foo bar/.test(text), 'has test title', text)
  })

  it('combines and covertes multiple test results', () => {
    const passes1 = [{
      'title': 'foo bar',
      'fullTitle': 'all foo bar',
      'duration': 0,
      'currentRetry': 0,
      'err': {}
    }]
    const passes2 = [{
      'title': 'baz',
      'fullTitle': 'all baz',
      'duration': 0,
      'currentRetry': 0,
      'err': {}
    }]
    const failures = []
    const pending = []

    const testResult1 = {
      tests: passes1,
      pending: pending,
      failures: failures,
      passes: passes1
    }
    const testResult2 = {
      tests: passes2,
      pending: pending,
      failures: failures,
      passes: passes2
    }

    const text = toHuman(testResult1, testResult2)
    la(is.unemptyString(text))
    la(/foo bar/.test(text), 'has first test title', text)
    la(/all baz/.test(text), 'has second test title', text)
  })
})
