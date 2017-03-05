process.on('uncaughtException', function(e){
    process.send({message:"error", arguments:[e.toString()]})
    process.exit(1)
})

console.log("wrapper running")

// get run file
var script =  /\"([^\"]*)\"/.exec(process.argv.filter(arg => arg.indexOf("--script") >= 0)[0])[1]

// setup standard prerequisites
//vnc = require("./medium.vnc.js")
global.vnc = function() {

    const electron = require('electron')
    // Module to control application life.
    const app = electron.app
app.exit();

      throw("vnc was defined but deliberately bla bla")

}

// run script
require(script)

// send completed message and results
process.send({message:"completed", arguments:[]})
