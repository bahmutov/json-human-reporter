'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const chalk = require('chalk')
const checkMark = chalk.green('✓')

function jsonToHuman (results) {
  la(is.object(results), 'missing test results', results)

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
    output += chalk.red(`  ${test.err.message}
      ${test.err.stack}
    `)
  })

  const passedString = chalk.green(`${results.passes.length} passed`)
  const skippedString = chalk.cyan(`${results.pending.length} skipped`)
  const failedString = chalk.red(`${results.failures.length} failed`)
  const totals = `\n${passedString}, ${skippedString}, ${failedString}`
  output += totals

  return output
}

module.exports = jsonToHuman
