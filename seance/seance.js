const fs = require('fs')
const global = (function(){ return this }).call(null)
const assert = require('assert')
const proxyquire = require('proxyquire')

class Seance {
  constructor() {
    this._words = {
      HAS     : Symbol("has"),
      OF      : Symbol("of"),
      AS      : Symbol("as"),
      AND     : Symbol("and"),
      WHICH   : Symbol("which"),
      IS      : Symbol("is"),
      THROWS  : Symbol("throws"),
      WARNS   : Symbol("warns")
    }
    this._position = root;
  }
}

class Runner {

  constructor() {
    this._loadedTests = []
  }

  get loadedTests() {
    return this._loadedTests
  }

  load(options = '.') {
    if (typeof(options) == 'string') {
      this.loadPath(options)
    } else {
      throw "Not yet implemented other loading options. Pass a path to Runner.load()"
    }
  }

  loadPath(path = '.') {
    assert.equal(typeof(path), 'string', "The path provided to loadPath was not a string")
    if (fs.lstatSync(path).isFile())
    {
      this.loadFile(path)
      return
    }
    var path = fs.realpathSync(path)
    var files = fs.readdirSync(path).map(file => `${path}/${file}`)
    files.forEach(file => {
      this.loadFile(file)
    })
  }

  loadFile(file) {
    assert.notEqual(file, null, "A file must be provided to loadFile")
    var test = new Test({
      closure: function() {
        require(file)
      }
    })
    this._loadedTests.push(test)
  }

  go(options) {
    this._loadedTests.forEach(
      test => {
        try {
          test.run()
        } catch (ex) {
          throw ex
        }
      }
    )
  }

  get metrics() {
    return {
      numberOfTestsTotal: this.loadedTests.length
    }
  }
}

class Test {
  constructor(parameters) {
    /// first thing, ensure there is an closure
    if (parameters == null || (parameters.closure == null && typeof(parameters) != 'function')) {
      throw "There must be a parameters object or a closure given to Test.constructor"
    }
    this._parameters = typeof(parameters) == 'function' ? { closure: parameters } : parameters;
  }
  run() {
    //this._parameters.closure.bind(this)()
    this._parameters.closure()
  }
}

class Fluent {
  constructor(typeOrIdentifier) {
    console.log(typeOrIdentifier)
    this.state = "construct"
    this.typeOrIdentifier = typeof(typeOrIdentifier) == 'string' ? typeOrIdentifier : typeOrIdentifier.name
    let pinned = this.typeOrIdentifier
    let resolve = () => {
      try {
        var out = eval(pinned)
        console.log(`\x1b[0mpassed: ensured type ${pinned} exists`)
        return out
      } catch (ex) {
        console.error(`\x1b[31mfailed: there is no ${pinned}`)
      }
    }
    this.resolve = resolve
    this.resolved = resolve()
    assert.notEqual(this.resolved, undefined, `typeOrIdentifier ${pinned} could not be found`)
  }
  static ensure(typeOrIdentifier) {
    return new Fluent(typeOrIdentifier)
  }
  has(member) {
    this.state = "has"
    // instance
    if (this.instance != null) {
      try {
        if (this.instance.hasOwnProperty(member) || member in this.instance) {
          console.log(`\x1b[0mpassed: ${this.typeOrIdentifier} has member ${member}`)
        } else {
          console.error(`\x1b[31mfailed: ${this.typeOrIdentifier} has no member ${member}`)
        }
      } catch(ex) {
        console.error(`\x1b[31mfailed: ${this.typeOrIdentifier} has no member ${member}`)
      }
      return this
    }
    // static
    try {
      if (this.resolved.hasOwnProperty(member) || member in this.resolved) {
        console.log(`\x1b[0mpassed: ${this.typeOrIdentifier} has static member ${member}`)
      }
      else {
        console.error(`\x1b[31mfailed: ${this.typeOrIdentifier} has no static member ${member}`)
      }
    } catch (ex) {
      console.error(`\x1b[31mfailed: ${this.typeOrIdentifier} has no static member ${member}`)
    }
    return this
  }
  of(type) {
    if (this.state && this.state == "has")
    {

      return this
    }
    throw "invalid state, of() must follow has()"
  }
  and(typeOrIdentifier = "") {
    typeOrIdentifier = typeOrIdentifier.replace(/^$/, this.typeOrIdentifier)
    typeOrIdentifier = typeOrIdentifier.replace(/^this$/, this.typeOrIdentifier)
    typeOrIdentifier = typeOrIdentifier.replace(/^this\./, `${this.typeOrIdentifier}.`)
    if (this.instance) {
      return new Fluent(typeOrIdentifier).with(this.rctor)
    } else {
      return new Fluent(typeOrIdentifier)
    }
  }
  as() {
    return this
  }
  with(rctor) {
    try {
      //new this.resolved()
      this.rctor = rctor
      this.instance = rctor(this.resolved)
    } catch (ex) {
      console.error(`\x1b[31mfailed: ${this.typeOrIdentifier} could not be constructed: ${ex}`)
    }
    return this
  }
}

Seance.Runner = Runner
Seance.Test = Test

Seance.fluent = Fluent

module.exports = Seance
