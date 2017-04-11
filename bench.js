var path = require('path')

var short = './foo'
var long = path.join(__dirname, 'foo.js')

var iterations = 100000

function timed() {
  var start = process.hrtime()
  for (var i = 0; i < iterations; i++) {
    require(short)
    delete require.cache[long]
  }
  return process.hrtime(start)
}

function toS(hr) {
  return hr[0] + (hr[1] / 1000000000)
}

// Run it once to get optimization out of the way
timed()

var before = timed()
console.info("without patcher: %ds", toS(before))

function nodeToBar(node) {
  node.value = 'bar'
  node.raw = "'bar'"
}

function fooToBar(ast, find) {
  find('Literal[value="foo"]').forEach(nodeToBar)
}

var patch = require('./')
var matchers = [
  /foo\.js$/,
  /bar\.js$/,
  /baz\.js$/,
  /buz\.js$/,
  /bux\.js$/,
  /bax\.js$/
]
matchers.forEach(function(matcher) {
  patch(matcher, fooToBar)
})

var after = timed()
console.info("with patcher: %ds", toS(after))
console.info("difference is: %ds", toS(after) - toS(before))
