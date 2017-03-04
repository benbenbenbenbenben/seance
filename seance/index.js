const Seance = require('./seance.js')
module.exports = Seance

if (process.argv.some(arg => arg == '--selftest')) {
  process.argv = process.argv.splice(process.argv.indexOf('--selftest'), 1)
  let runner = new Seance.Runner()
  runner.load('./test/')
  runner.go();
}
