'use strict'

/* global describe, it */
const toHuman = require('json-human-reporter/json-to-human')
const la = require('lazy-ass')
const is = require('check-more-types')

describe('json-to-human converter', () => {
  function makeTestResults () {
    const passes = [{
      title: 'foo bar',
      fullTitle: 'all foo bar',
      duration: 0,
      currentRetry: 0,
      err: {}
    }]
    const failures = []
    const pending = []

    const testResult = {
      tests: passes,
      pending: pending,
      failures: failures,
      passes: passes
    }
    return testResult
  }

  function makeFailedTestResults () {
    const passes = []
    const failures = [{
      title: 'foo bar',
      fullTitle: 'all foo bar',
      duration: 0,
      currentRetry: 0,
      err: {
        message: 'something is wrong',
        stack: 'this is my stack'
      }
    }]
    const pending = []

    const testResult = {
      tests: failures,
      pending: pending,
      failures: failures,
      passes: passes
    }
    return testResult
  }

  it('is a function', () => {
    la(is.fn(toHuman))
  })

  it('converts json object into text', () => {
    const testResult = makeTestResults()
    const text = toHuman(testResult)
    la(is.unemptyString(text))
    la(/foo bar/.test(text), 'has test title\n', text)
  })

  it('accepts empty options', () => {
    const testResult = makeTestResults()
    const options = {}
    const text = toHuman(testResult, options)
    la(is.unemptyString(text))
    la(/foo bar/.test(text), 'has test title\n', text)
  })

  it('does not print stack without options', () => {
    const testResult = makeFailedTestResults()
    const options = {}
    const text = toHuman(testResult, options)
    la(is.unemptyString(text))
    la(/foo bar/.test(text), 'has test title\n', text)
    la(/something is wrong/.test(text), 'has error message\n', text)
    la(!/my stack/.test(text), 'has no error stack\n', text)
  })

  it('prints stack if has option', () => {
    const testResult = makeFailedTestResults()
    const options = {
      stack: true
    }
    const text = toHuman(testResult, options)
    la(is.unemptyString(text))
    la(/foo bar/.test(text), 'has test title\n', text)
    la(/something is wrong/.test(text), 'has error message\n', text)
    la(/my stack/.test(text), 'has error stack\n', text)
  })

  it('combines and covertes multiple test results', () => {
    const passes1 = [{
      title: 'foo bar',
      fullTitle: 'all foo bar',
      duration: 0,
      currentRetry: 0,
      err: {}
    }]
    const passes2 = [{
      title: 'baz',
      fullTitle: 'all baz',
      duration: 0,
      currentRetry: 0,
      err: {}
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
