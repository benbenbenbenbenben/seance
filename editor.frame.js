const {Menu} = require('electron').remote;
const main = require('electron').remote.require('./main.js')

const closeWindow =
module.exports.closeWindow = function() {
  close();
}

const saveFile =
module.exports.saveFile = function() {
  var content = editor.getValue();
  var filename = editor.filename;
  main.saveFile({
    filename: filename,
    content: content
  });
}

let context
const runScript =
module.exports.runScript = function(options = {debug:false}) {
  var context = main.runScript({filename:editor.filename})
}

const stopScript =
module.exports.stopScript = function() {
  context.destroy()
}

var menu = Menu.buildFromTemplate([
  {
    label: 'Script',
    submenu: [
      {
        label: 'Save (ctrl+s)',
        click: function() {
          saveFile();
        }
      },
      {
        label: 'Close',
        click: function() {
          // TODO: check saved
          saveFile();
          closeWindow();
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Run (f5)',
        click: function() {
          saveFile();
          runScript();
        }
      },
      {
        label: 'Debug (shift+f5)',
        click: function() {
          saveFile();
          runScript({debug:true});
        }
      }
    ]
  }
]);

var key = require('keyboard-shortcut');

key('ctrl s', function (e) {
  console.log("saving file");
  saveFile();
});

key('f5', function(e) {
  runScript({debug:e.shiftKey});
});

key('f12', function(e) {
  require('electron').remote.getCurrentWindow().toggleDevTools();
});
Menu.setApplicationMenu(menu);

//editor.setValue(`function(){
//
//}`, 1);
