var assert = require('assert');

function* NumberGenerator() {
  for (var i = 0; i < 10; i += 1) {
    yield i;
  }
}

var numbers = NumberGenerator();
assert.deepStrictEqual(numbers.next(), {
  'value': 0,
  'done': false
});

// Check if empty `return` closes the iterator
assert.deepStrictEqual(numbers.return(), {
  'done': false
});

assert.deepStrictEqual(numbers.next(), {
  'value': 1,
  'done': false
});

// Check if `return` with a parameter really closes the iterator
assert.deepStrictEqual(numbers.return(undefined), {
  'value': undefined,
  'done': true
});

var returnValue = numbers.next();
if ('value' in returnValue) {
  assert.strictEqual(returnValue.value, undefined);
  delete returnValue.value;
}
assert.deepStrictEqual(returnValue, {
  'done': true
})
