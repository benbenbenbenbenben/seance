const {Menu} = require('electron').remote;

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
