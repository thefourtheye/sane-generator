function returnFunction(originalReturn, genObject) {
  return function(arg) {
    return arguments.length !== 0 ? originalReturn.call(genObject, arg) || {
      done: false
    };
  }
}

function SaneGenerator(genObject) {
  var originalReturn = genObject['return'];

  if (typeof originalReturn === 'function') {
    Object.defineProperty(genObject, 'return', {
      value: returnFunction(originalReturn, genObject)
    });
  }

  return genObject;
}

module.exports = SaneGenerator;
