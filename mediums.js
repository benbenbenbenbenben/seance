const main = require('./main.js')

module.exports = {
  vnc: {
    connect: options => {
      console.log("connect", options)
      let host = options == null                ? null
                 : typeof(options) == 'string'  ? options
                 : options.host
      let ok = main.requestVncView({
        connect: true,
        host: host
      })
      if (!ok) {
        console.log("a request was made to re-open a vnc connection")
        throw "a request was made to re-open a vnc connection"
      }
    },
    click: options => {
      console.log("click", options)
    },
    doubleclick: options => {
      console.log("doubleclick", options)
    },
    type: options => {
      console.log("type", options)
      return this
    },
    find: options => {
      console.log("find", options)
    },
    keys: {
      return: "\r\n"
    }
  }
}
