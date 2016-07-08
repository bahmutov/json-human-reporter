'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const chalk = require('chalk')
const checkMark = chalk.green('✓')

function combineResults () {
  const all = Array.from(arguments)
  la(is.unempty(all), 'empty list of results', arguments)
  return all.slice(1).reduce((combined, results) => {
    combined.tests = combined.tests.concat(results.tests)
    combined.passes = combined.passes.concat(results.passes)
    combined.failures = combined.failures.concat(results.failures)
    combined.pending = combined.pending.concat(results.pending)
    return combined
  }, all[0])
}

// tell the difference between options and a test results objects
function isTestResults (o) {
  return is.object(o) &&
    is.array(o.tests) &&
    is.not.has('stack', o)
}
function isOptions (o) {
  return is.object(o) &&
    !isTestResults(o)
}

function jsonToHuman (results, options) {
  la(is.object(results), 'missing test results', results)
  if (options) {
    la(isOptions(options), 'invalid options', options)
  } else {
    options = {}
  }

  la(is.array(results.tests), 'missing all tests in', results)
  la(is.array(results.passes), 'missing passed tests in', results)
  la(is.array(results.failures), 'missing failed tests in', results)
  la(is.array(results.pending), 'missing pending tests in', results)

  var output = ''

  results.passes.forEach((test) => {
    output += `${checkMark} ${test.fullTitle}\n`
  })

  results.pending.forEach((test) => {
    output += chalk.cyan(`- ${test.fullTitle}\n`)
  })

  results.failures.forEach((test) => {
    output += chalk.red(`✗ ${test.fullTitle}\n`)
    output += chalk.red(`  ${test.err.message}\n`)
    if (options.stack) {
      output += chalk.yellow(`  ${test.err.stack}\n`)
    }
  })

  const passedString = chalk.green(`${results.passes.length} passed`)
  const skippedString = chalk.cyan(`${results.pending.length} skipped`)
  const failedString = chalk.red(`${results.failures.length} failed`)
  const totals = `\n${passedString}, ${skippedString}, ${failedString}`
  output += totals

  return output
}

function jsonToHumanAll () {
  const args = Array.from(arguments)
  const individualTestResults = args.filter(isTestResults)
  const options = args.filter(isOptions)[0]
  const combinedResults = combineResults.apply(null, individualTestResults)
  return jsonToHuman(combinedResults, options)
}

module.exports = jsonToHumanAll
