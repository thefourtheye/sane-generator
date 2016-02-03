# clean up the transpiled file
rm tests/*es5.js

# do linting
npm run lint

# transpile the es6 code
node_modules/.bin/babel tests/tests.js --out-file tests/tests-es5.js

# test transpiled code
node_modules/.bin/mocha --require babel-polyfill tests/index.js

# retain the exit status
EXITCODE=$?

# remove the transpiled file
rm tests/*es5.js

# exit with the exit status of the tests
exit $EXITCODE
