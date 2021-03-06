// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {Menu} = require('electron').remote;
const main = require('electron').remote.require('./main.js')
var key = require('keyboard-shortcut');

const openVnc = module.exports.openVnc = function(args) {
  main.openVnc(args);
}

var menu = Menu.buildFromTemplate([
  {
    label: 'Tools',
    submenu: [
      {
        label: 'Open VNC View',
        click: function() {
          connectiondialog.open()
        }
      }
    ]
  }
]);


key('f12', function(e) {
  require('electron').remote.getCurrentWindow().toggleDevTools();
});

Menu.setApplicationMenu(menu);
