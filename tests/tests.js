'use strict';
var expect = require('chai').expect;
var SaneGenerator = require('../');

function* NumberGenerator() {
  for (var i = 0; i < 10; i += 1) {
    yield i;
  }
}

describe('Generator Object should', function() {

  it('return the first valid element', function() {
    expect(NumberGenerator().next()).to.be.deep.equal({
      'value': 0,
      'done': false
    });
  });

  it('close the iterator Object if return is called on it', function() {
    var numbers = NumberGenerator();
    expect(numbers.return()).to.be.deep.equal({
      'value': undefined,
      'done': true
    });
    expect(numbers.next()).to.be.deep.equal({
      'value': undefined,
      'done': true
    });
  });

});
