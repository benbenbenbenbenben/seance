var Seance = require('../index.js')
var ensure = Seance.fluent.ensure

ensure("Seance")
  .has("fluent")
  .has("Test")
  .has("Runner")

ensure(Seance.Test)
  .with(type => new type(() => {}))
  .has("run")
  .of(Function)

ensure("Seance.fluent")
  .with(type => new type(Object))
  .has("has")
  .of(Function)

  .has("and")
  .of("Fluent")

  .has("of")
  .of(Function)


ensure(Seance.Runner)
  .with(type => new type())
  .has("metrics")

  .and("this.metrics")
  .has("numberOfTestsTotal")
  .of("number")
  .as(0)

  .and("this.metrics")
  .has("numberOfTestsRunnable")
  .of("number")
  .as(0)
