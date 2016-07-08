#!/usr/bin/env node

const log = require('debug')('json')
const reporter = require('..')
const argv = require('minimist')(process.argv.slice(2))
log('bin filenames', argv._)
log('cli options', argv)
const output = reporter(argv._, argv)
console.log(output)
