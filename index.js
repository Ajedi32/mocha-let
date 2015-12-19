function mochaLet(name, valueFunction) {
  beforeEach(function() {
    Object.defineProperty(this, name, {get: valueFunction});
  });
}

module.exports = mochaLet;
