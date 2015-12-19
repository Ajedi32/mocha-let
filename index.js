var memoize = require('memoizee');

function mochaLet(name, valueFunction) {
  beforeEach(function() {
    Object.defineProperty(this, name, {
      configurable: true,
      get: memoize(valueFunction)
    });
  });
}

module.exports = mochaLet;
