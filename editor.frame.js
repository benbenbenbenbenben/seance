const {Menu} = require('electron').remote;
const main = require('electron').remote.require('./main.js')

var menu = Menu.buildFromTemplate([
  {
    label: 'Script',
    submenu: [
      {
        label: 'Save'
      },
      {
        label: 'Close',
        click: function() {
          // TODO: check saved
          close();
        }
      }
    ]
  }
]);
Menu.setApplicationMenu(menu);

editor.setValue(`function(){

}`, 1);
