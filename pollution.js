// pollution.js
// utility to show properties polluting an object (ie the global/window)

function platform ()
{
	if (process.title === 'browser')
	{
		return `${navigator.vendor} ${navigator.product} ${navigator.userAgent}`
	}
	return `${process.title} ${process.version}`
}

function deepLog(name /* : string */, object /* : any */, depth /* : number | null */ = null) /* : void */
{
	const util = process.title === 'browser' ? { inspect: function (o) { return o } } :  require("util");

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
			deepLog(`${name}.${key}`, object[key])
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

// platform Google Inc. Gecko Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/53.0.2785.143 Chrome/53.0.2785.143 Safari/537.36
const windowAllowedKeysChromium =
["alert","applicationCache","atob","blur","btoa","caches","cancelAnimationFrame","cancelIdleCallback","captureEvents","chrome","clearInterval","clearTimeout","clientInformation","close","closed","confirm","console","createImageBitmap","crypto","defaultStatus","defaultstatus","devicePixelRatio","document","external","fetch","find","focus","frameElement","frames","getComputedStyle","getMatchedCSSRules","getSelection","history","indexedDB","innerHeight","innerWidth","isSecureContext","keys","length","localStorage","location","locationbar","matchMedia","menubar","moveBy","moveTo","name","navigator","onabort","onanimationend","onanimationiteration","onanimationstart","onbeforeunload","onblur","oncancel","oncanplay","oncanplaythrough","onchange","onclick","onclose","oncontextmenu","oncuechange","ondblclick","ondevicemotion","ondeviceorientation","ondeviceorientationabsolute","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended","onerror","onfocus","onhashchange","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onlanguagechange","onload","onloadeddata","onloadedmetadata","onloadstart","onmessage","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onoffline","ononline","onpagehide","onpageshow","onpause","onplay","onplaying","onpopstate","onprogress","onratechange","onrejectionhandled","onreset","onresize","onscroll","onsearch","onseeked","onseeking","onselect","onshow","onstalled","onstorage","onsubmit","onsuspend","ontimeupdate","ontoggle","ontransitionend","onunhandledrejection","onunload","onvolumechange","onwaiting","onwebkitanimationend","onwebkitanimationiteration","onwebkitanimationstart","onwebkittransitionend","onwheel","open","openDatabase","opener","outerHeight","outerWidth","pageXOffset","pageYOffset","parent","performance","personalbar","postMessage","print","prompt","releaseEvents","requestAnimationFrame","requestIdleCallback","resizeBy","resizeTo","screen","screenLeft","screenTop","screenX","screenY","scroll","scrollBy","scrollTo","scrollX","scrollY","scrollbars","self","sessionStorage","setInterval","setTimeout","speechSynthesis","status","statusbar","stop","styleMedia","toolbar","top","webkitCancelAnimationFrame","webkitCancelRequestAnimationFrame","webkitIndexedDB","webkitRequestAnimationFrame","webkitRequestFileSystem","webkitResolveLocalFileSystemURL","webkitStorageInfo","window"]

module.exports =
{
	platform: platform,
	logObject: logObject,
	deepLog: deepLog,
	showPollution: showPollution,
	globalAllowedKeys: globalAllowedKeys,
	windowAllowedKeysChromium: windowAllowedKeysChromium,
}

