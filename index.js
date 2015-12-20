var memoize = require('memoizee');

function mochaLet(name, value) {
  beforeEach(function() {
    if (typeof value === 'function') {
      Object.defineProperty(this, name, {
        configurable: true,
        get: memoize(value),
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
    } else {
      this[name] = value;
    }
  });
}

module.exports = mochaLet;
