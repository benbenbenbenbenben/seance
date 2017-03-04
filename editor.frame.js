const {Menu} = require('electron').remote;
const main = require('electron').remote.require('./main.js')

const closeWindow = function() {
  close();
}

const saveFile = function() {

}

var menu = Menu.buildFromTemplate([
  {
    label: 'Script',
    submenu: [
      {
        label: 'Save',
        click: function() {
          
        }
      },
      {
        label: 'Close',
        click: function() {
          // TODO: check saved
          saveFile();
          closeWindow();
        }
      }
    ]
  }
]);


Menu.setApplicationMenu(menu);

//editor.setValue(`function(){
//
//}`, 1);
