'use strict';

var _marked = [NumberGenerator].map(regeneratorRuntime.mark);

var expect = require('chai').expect;
var SaneGenerator = require('../');

function NumberGenerator() {
  var i;
  return regeneratorRuntime.wrap(function NumberGenerator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < 10)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return i;

        case 4:
          i += 1;
          _context.next = 1;
          break;

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

describe('Generator Object should', function () {

  it('return the first valid element', function () {
    expect(NumberGenerator().next()).to.be.deep.equal({
      'value': 0,
      'done': false
    });
  });

  it('close the iterator Object if return is called on it', function () {
    var numbers = NumberGenerator();
    expect(numbers.return()).to.be.deep.equal({
      'done': true
    });
    expect(numbers.next()).to.be.deep.equal({
      'done': true
    });
  });
});