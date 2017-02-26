// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


const testFolder = './test/';
const fs = require('fs');
fs.readdir(testFolder, (err, files) => {
    Array.from(files).forEach(file => {
    console.log(file);
  });
})
