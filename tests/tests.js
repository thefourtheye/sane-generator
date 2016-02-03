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

  it('close the iterator Object even if return is called with undefined', function() {
    var numbers = NumberGenerator();
    expect(numbers.next()).to.be.deep.equal({
      'value': 0,
      'done': false
    });

    expect(numbers.return(undefined)).to.be.deep.equal({
      'value': undefined,
      'done': true
    });

    expect(numbers.next()).to.be.deep.equal({
      'value': undefined,
      'done': true
    });
  });

  it('close the iterator while looped with for..of', function() {
    var numbers = NumberGenerator();
    for (var value of numbers) {
      if (value === 3) {
        break;
      }
    }
    expect(numbers.next()).to.be.deep.equal({
      'value': undefined,
      'done': true
    });
  });

});

describe('Sane Generator Object should', function() {

  it('not close the iterator Object even if return is called with undefined', function() {
    var numbers = SaneGenerator(NumberGenerator());
    expect(numbers.next()).to.be.deep.equal({
      'value': 0,
      'done': false
    });

    expect(numbers.return()).to.be.deep.equal({
      'done': false
    });

    expect(numbers.next()).to.be.deep.equal({
      'value': 1,
      'done': false
    });
  });

  it('close the iterator even if return is called with undefined', function() {
    var numbers = SaneGenerator(NumberGenerator());
    expect(numbers.next()).to.be.deep.equal({
      'value': 0,
      'done': false
    });

    expect(numbers.return(undefined)).to.be.deep.equal({
      'value': undefined,
      'done': true
    });

    expect(numbers.next()).to.be.deep.equal({
      'value': undefined,
      'done': true
    });
  });

  it('not close the iterator while looped with for..of', function() {
    var numbers = SaneGenerator(NumberGenerator());
    for (var value of numbers) {
      if (value === 3) {
        break;
      }
    }
    expect(numbers.next()).to.be.deep.equal({
      'value': 4,
      'done': false
    });
  });

  it('not affect the object if `return` is not a function', function() {
    var numbers = {
      return: 1
    };
    var saneNumbers = SaneGenerator(numbers);
    expect(numbers).to.be.deep.equal(saneNumbers);
    expect(numbers).to.be.equal(saneNumbers);
  });
});
