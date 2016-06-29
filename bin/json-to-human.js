#!/usr/bin/env node

const log = require('debug')('json')
const reporter = require('..')
const args = process.argv.slice(2)
log('process arguments', args)
const output = reporter.apply(null, args)
console.log(output)
