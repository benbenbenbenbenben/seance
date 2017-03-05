const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
//const VncView = require('./vnc/atom-vnc/lib/vnc-view.js')

const unrequire = require('./unrequire.js')

global.mediums = require('./mediums.js')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let splashScreen
let editorWindows = []
let vncWindows = []

function createSplashScreen() {
//  splashScreen = new BrowserWindow({width: 500, height: 240, frame:false})
//
//  splashScreen.loadURL(url.format({
//    pathname: path.join(__dirname, 'splash.html'),
//    protocol: 'file:',
//    slashes: true
//  }))

//  splashScreen.on('closed', function() {
//    splashScreen = null
//  })

  createMainWindow();
}

function openVnc(vncOptions = {}) {
  let vncWindow = new BrowserWindow({width: 800, height: 600})
  vncWindow.loadURL(url.format({
    title: "vnc",
    pathname: path.join(__dirname, 'vnc.html'),
    protocol: 'file:',
    slashes: true
  }))
  vncWindow.on('closed', function () {
    var index = vncWindows.indexOf(vncWindow)
    vncWindows.splice(index, 1)
    vncWindow = null
  })
  vncWindow.tag = {
    vncOptions: vncOptions
  }
  vncWindow.webContents.on('dom-ready', function(){
    console.log("dom-ready")
    vncWindow.webContents.executeJavaScript(`
      console.log("init", vncView == null)
      vncView.initialize({uri:'http://${vncOptions.host}:5900'});
      `)
  })
  vncWindows.push(vncWindow)
}

function createMainWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 300, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    title: "hello",
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  //mainWindow.initialize();

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null

  })

}
function openEditor(file) {
  let editorWindow = new BrowserWindow()
  editorWindow.loadURL(url.format({
    title: "editor",
    pathname: path.join(__dirname, 'editor.frame.html'),
    protocol: 'file:',
    slashes: true
  }))

  //editorWindow.webContents.openDevTools()
  editorWindow.tag = {
    filename: file
  }
  editorWindows.push(editorWindow)
  editorWindow.on('closed', () => {
    var index = editorWindows.indexOf(editorWindow)
    editorWindows.splice(index, 1)
    editorWindow = null
  })

  editorWindow.webContents.on("dom-ready", function(){
    editorWindow.webContents.executeJavaScript(`
      editor.filename = '${file}';
      let content = require('fs').readFileSync('${file}', 'utf8');
      editor.setValue(content, 1);
      editor.session.getUndoManager().reset();
     `);
  })

  return editorWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createSplashScreen)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})



const onScriptError = function(error) {
  console.log(`script ended with error: ${error}`)
}


global.requestOpen = function(data) {
  var file = data.path
  var type = data.type
  if (type == 'folder')
    return;
  var found = editorWindows.filter(win => win.tag.filename == file)
  if (found.length > 0) {
    found[0].show()
    found[0].restore()
  } else {
    var editor = openEditor(file);
  }
}

exports.requestVncView = function(options) {
  // options.server
  // options.port
  // options.password
  var found = vncWindows.filter(win => win.tag.vncOptions.host == options.host)
  if (found.length > 0) {
    found[0].show()
    found[0].restore()
    found[0].warnRequestControl()
    return false
  }
  var vnc = openVnc(options)
  return true
}

exports.saveFile = function(data) {
  require('fs').writeFileSync(data.filename, data.content)
}

exports.runScript = function(options) {
  console.log("run", options);

  // technique 1. require
  try {
    unrequire(options.filename)
    var avar = 10;
    let blet = 10;
    const cconst = 10;
    require(options.filename)
  } catch(ex) {
    console.log(ex.stack)
    return {message:"error", arguments:[ex]}
  }
  return

  // technique 2. fork
  var fork = require('child_process').fork
  context = fork('./editor.runner.js', [
    `--script="${options.filename}"`
  ])

  context.on('message', function(message) {
    console.log(arguments)
    switch (message.message) {
      case 'error':
        onScriptError.apply(this, message.arguments)
        break;
      default:

    }
  })
}
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
