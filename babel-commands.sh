# transpile the es6 code
node_modules/.bin/babel tests -d tests-es5

# test transpiled code
node_modules/.bin/mocha --require babel-polyfill tests-es5/
