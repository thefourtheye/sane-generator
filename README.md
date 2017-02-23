# sane-generator
[![npm version](https://badge.fury.io/js/sane-generator.svg)](https://badge.fury.io/js/sane-generator)
[![Build Status](https://travis-ci.org/thefourtheye/sane-generator.svg?branch=master)](https://travis-ci.org/thefourtheye/sane-generator)
[![Coverage Status](https://coveralls.io/repos/thefourtheye/sane-generator/badge.svg?branch=master&service=github)](https://coveralls.io/github/thefourtheye/sane-generator?branch=master)

---

## Why do I need Sane Generator?

In short, ECMAScript 6 Generators are closed if we break out of the loop which iterates them.
I believe that this limits the Generators. For example, in Python, the following would work

```python
>>> numbers = (num for num in range(10))
>>> for num in numbers:
...   if num == 3:
...     break
...
>>> next(numbers)
4
```

This allows us partially consume the Generators whenever we want and that allows us to have elegant solutions like this [one](http://stackoverflow.com/a/16801605/1903116), by [Jon](http://stackoverflow.com/users/1252759/jon-clements) [Clements](https://github.com/joncle).

But the similar code in ECMAScript 6 would close the generator.

```js
function* NumberGenerator() {
  for (var i = 0; i < 10; i += 1) {
    yield i;
  }
}

var numbers = NumberGenerator();

for (var num of numbers) {
  if (num === 3) {
    break;
  }
}

console.log(numbers.next());
// {"done": true}
```

This module provides a way to overcome this feature.

I explained in detail in this blog post http://www.thefourtheye.in/2016/02/sane-ecmascript-6-generators.html.

## Installation

```
npm install sane-generator
```

## Usage

```js
var SaneGenerator = require('sane-generator');

function* NumberGenerator() {
  for (var i = 0; i < 10; i += 1) {
    yield i;
  }
}

var numbers = SaneGenerator(NumberGenerator());

for (var num of numbers) {
  if (num === 3) {
    break;
  }
}

console.log(numbers.next());
// {"value": 4, "done": false}
```

### How to explicitly close the SaneGenerator?

```js
var SaneGenerator = require('sane-generator');

function* NumberGenerator() {
  for (var i = 0; i < 10; i += 1) {
    yield i;
  }
}

var numbers = SaneGenerator(NumberGenerator());

console.log(numbers.next());
// {"value": 0, "done": false}
console.log(numbers.next());
// {"value": 1, "done": false}
console.log(numbers.return(undefined));              // call `return` with any value
// {"done": true}
console.log(numbers.next());
// {"value": undefined, "done": true}
```
