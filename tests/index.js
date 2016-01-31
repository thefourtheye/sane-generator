var hasGenerator = (function() {
  try {
    return !!eval('(function*() {}).return');
  } catch (err) {
    return false;
  }
}());

if (!hasGenerator) {
  return console.log('Generators are not available. Skipping tests..');
}

require('./tests');
