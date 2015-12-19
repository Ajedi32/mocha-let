var set = require('./index.js');
var assert = require('assert');

describe('mocha-let', function() {
  var object = {};
  set('object', () => object);

  it("allows accessing the return value of the given function as the specified property on `this`", function() {
    assert.equal(this.object, object);
  });
});
