# mocha-let

A dead-simple package that lets you create RSpec-style memoized values in Mocha.

The entire package is just 12 lines of code, with only one dependency
([memoizee](https://www.npmjs.com/package/memoizee)). [See for yourself!](index.js)

## Basic usage

```javascript
var set = require('mocha-let');
var assert = require('assert');

describe('mocha-let', function() {
  var object = {};
  set('object', function() { return object; });

  it("allows accessing the return value of the given function as the specified property on `this`", function() {
    assert.equal(this.object, object);
  });
});
```

For a more complete example, have a look at [`test.js`](test.js).

## License

MIT (See [LICENSE](./LICENSE) file)
