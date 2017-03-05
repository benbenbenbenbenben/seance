// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


var key = require('keyboard-shortcut');

key('f12', function(e) {
  require('electron').remote.getCurrentWindow().toggleDevTools();
});
