#!/usr/bin/env node
// show the global object and any values polluting it
// ./vanilla.js | less -R

const pollution = require('./pollution')

console.log('platform', pollution.platform())

const globalName = 'global'
const globalKeys = Object.keys(global).sort()

pollution.deepLog(globalName + ' keys', globalKeys)
pollution.showPollution(globalName, global, pollution.globalAllowedKeys)
pollution.logObject(globalName, global)


