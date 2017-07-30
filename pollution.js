// pollution.js
// utility to show properties polluting an object (ie the global/window)

function platform ()
{
	return `${process.title} ${process.version}`
}

function deepLog(name /* : string */, object /* : any */, depth /* : number | null */ = null) /* : void */
{
	const util = require("util");

	console.log(name, util.inspect(object,
	{
		showHidden: false,
		depth: depth,
		colors: true,
	}));
}

function logObject(name, object)
{
	Object.keys(object).sort().forEach(function (key)
	{
		if (key !== name)
		{
			deepLog(name + '.' + key, object[key])
		}
	})
}

function showPollution(name /* : string */, object /* : any */, allowedKeys /* : Array<string> */) /* : void */
{
	const pollution = {}
	Object.keys(object).forEach(function (key) {
		pollution[key] = 1
	})
	// deepLog(`pollution pre`, pollution)
	allowedKeys.forEach(function (key) {
		if (key in pollution)
		{
			delete pollution[key]
		}
	})
	deepLog(`${name} pollution`, Object.keys(pollution).sort())
}

// platform node v6.3.1
const globalAllowedKeys /* : Array<string> */ =
[
	'Buffer',
	'clearImmediate',
	'clearInterval',
	'clearTimeout',
	'console',
	'global',
	'process',
	'setImmediate',
	'setInterval',
	'setTimeout'
]

module.exports =
{
	platform: platform,
	logObject: logObject,
	deepLog: deepLog,
	showPollution: showPollution,
	globalAllowedKeys: globalAllowedKeys,
}

