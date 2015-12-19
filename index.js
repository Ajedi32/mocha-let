function mochaLet(name, valueFunction) {
  beforeEach(function() {
    this[name] = valueFunction();
  });
}

module.exports = mochaLet;
