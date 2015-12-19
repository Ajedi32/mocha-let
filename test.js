var set = require('./index.js');
var assert = require('assert');

describe('mocha-let', function() {
  var object = {};
  set('object', () => object);

  context("in a sub-context", function() {
    var aDifferentObject = {};
    set('object', () => aDifferentObject);

    it("allows overriding the value of an existing property", function() {
      assert.equal(this.object, aDifferentObject);
    });
  });

  it("allows accessing the return value of the given function as the specified property on `this`", function() {
    assert.equal(this.object, object);
  });

  // Can't use arrow functions for dependant objects because of lexical `this`.
  set('dependentObject', function() { return {prop: this.dependedValue}; });
  var dependedValue = {};
  set('dependedValue', () => dependedValue);
  it("allows dependencies between properties", function() {
    assert.equal(this.dependentObject.prop, dependedValue);
  });
});
