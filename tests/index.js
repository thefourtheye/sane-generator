var Mocha = require('mocha');
var path = require('path');
require('babel-polyfill');
var hasGenerator = (function() {
  try {
    return !!eval('(function*() {}).return');
  } catch (err) {
    return false;
  }
}());

// Instantiate a Mocha instance.
var mocha = new Mocha({
  ui: 'bdd',
  reporter: 'list'
});

mocha.addFile(path.join('tests-es5', 'tests.js'));
if (hasGenerator) {
  mocha.addFile(path.join('tests', 'tests.js'));
}

// Run the tests.
mocha.run(function(failures) {
  process.on('exit', function() {
    process.exit(failures);
  });
});
