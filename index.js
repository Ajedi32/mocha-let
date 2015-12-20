var memoize = require('memoizee');

function mochaLet(name, valueFunction) {
  beforeEach(function() {
    Object.defineProperty(this, name, {
      configurable: true,
      get: memoize(valueFunction),
      set: function(newValue) {
        // Change back to a regular property
        Object.defineProperty(this, name, {
          configurable: true,
          enumerable: true,
          writable: true,
          value: newValue,
        });
      }
    });
  });
}

module.exports = mochaLet;
