// This is a PhantomJS script that can run a html page
// You can run it like so:
//
//     $ phantomjs phantom2.js vanilla.html
//
// PhantomJS from http://phantomjs.org/.

var system = require("system"),
    file   = system.args[1]

if (file === undefined) {
  console.error("You need to give me an HTML file to run!")
  phantom.exit(1)
}

phantom.onError = function(msg, trace) {
  var msgStack = ['PHANTOM ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
    });
  }
  console.error(msgStack.join('\n'));
  phantom.exit(1);
};

var page = (typeof WebPage === 'function') ? new WebPage() : require('webpage').create()

page.onAlert = function(msg) {
  console.log('ALERT: ' + msg);
};

page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
};

page.onResourceRequested = function(requestData, networkRequest) {
  console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
};

page.onResourceReceived = function(response) {
  console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
};

page.onResourceTimeout = function(request) {
    console.log('Response (#' + request.id + '): ' + JSON.stringify(request));
};

page.onResourceError = function(resourceError) {
  console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
  console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
};

page.onInitialized = function() {
  page.evaluate(function() {
    document.addEventListener('DOMContentLoaded', function() {
      console.log('DOM content has loaded.');
    }, false);
  });
};

page.onLoadStarted = function() {
  var currentUrl = page.evaluate(function() {
    return window.location.href;
  });
  console.log('Current page ' + currentUrl + ' will be gone...');
  console.log('Now loading a new page...');
};

page.onLoadFinished = function(status) {
  console.log('Status: ' + status);
  // Do other things here...
};

page.onNavigationRequested = function(url, type, willNavigate, main) {
  console.log('Trying to navigate to: ' + url);
  console.log('Caused by: ' + type);
  console.log('Will actually navigate: ' + willNavigate);
  console.log('Sent from the page\'s main frame: ' + main);
}

page.onUrlChanged = function(targetUrl) {
  console.log('New URL: ' + targetUrl);
};

page.onPageCreated = function(newPage) {
  console.log('A new child page was created! Its requested URL is not yet available, though.');
  // Decorate
  newPage.onClosing = function(closingPage) {
    console.log('A child page is closing: ' + closingPage.url);
  };
};

page.onCallback = function(data) {
  console.log('CALLBACK: ' + JSON.stringify(data));
  // Prints 'CALLBACK: { "hello": "world" }'
};

page.onConfirm = function(msg) {
  console.log('CONFIRM: ' + msg);
  return true; // `true` === pressing the "OK" button, `false` === pressing the "Cancel" button
};

page.onPrompt = function(msg, defaultVal) {
  if (msg === "What's your name?") {
    return 'PhantomJS';
  }
  return defaultVal;
};

page.onFilePicker = function(oldFile) {
  if (system.os.name === 'windows') {
    return 'C:\\Windows\\System32\\drivers\\etc\\hosts';
  }
  return '/etc/hosts';
};

page.onClosing = function(closingPage) {
  console.log('The page is closing! URL: ' + closingPage.url);
};

page.onError = function(msg, trace) {

  var msgStack = ['ERROR: ' + msg];

  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    });
  }

  console.error(msgStack.join('\n'));

};

page.open(file, function (status) {
  console.log('page.open status', status)
  phantom.exit(status === 'success' ? 0 : 1)
});

