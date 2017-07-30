#!/usr/bin/env node
// show the global object and any values polluting it
// ./node_modules/.bin/browserify vanilla.js > vanilla.browser.js
// ./vanilla.js | less -R
// phantomjs phantom-page.js vanilla.html

const pollution = require('./pollution')

console.log('platform', pollution.platform())

const globalName = process.title === 'browser' ? 'window' : 'global'
const globalKeys = Object.keys(process.title === 'browser' ? window : global).sort()

pollution.deepLog(globalName + ' keys', globalKeys)
pollution.showPollution(globalName, global, process.title === 'browser' ? pollution.windowAllowedKeysChromium : pollution.globalAllowedKeys)
pollution.logObject(globalName, global)


