"use strict"

function readonly(target, key, descriptor) {
  descriptor.writeable = false
  return descriptor
}

class Cat {
  
  meow() {
    return `${this.name} says Meow!`
  }
}
