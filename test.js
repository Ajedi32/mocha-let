var set = require('./index.js');
var assert = require('assert');

describe('mocha-let', function() {
  var object = {};
  set('object', () => object);

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

  set('memoizedObject', () => ({}));
  it('memoizes the values of each property', function() {
    assert.equal(this.memoizedObject, this.memoizedObject);
  });

  it("allows assigning to the value of an existing property", function() {
    var someOtherObject = {};
    this.object = someOtherObject;
    assert.equal(this.object, someOtherObject);
  });

  set('rawValue', 1);
  it("allows assigning constant values without wrapping them in a function", function() {
    assert.equal(this.rawValue, 1);
  });

  context("in a sub-context", function() {
    var aDifferentObject = {};
    set('object', () => aDifferentObject);

    it("allows overriding the value of an existing property", function() {
      assert.equal(this.object, aDifferentObject);
    });

    var otherDependedValue = {};
    set('dependedValue', () => otherDependedValue);
    it("overriding the value of properties depended on by existing properties changes the value of the dependent property", function() {
      assert.equal(this.dependentObject.prop, otherDependedValue);
    });
  });
});
