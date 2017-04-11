var tap = require('tap')
var patch = require('./')

patch(/foo\.js$/, function(ast, find) {
  // NOTE: This query is much better, but it requires that
  // https://github.com/estools/esquery/pull/54 is merged.
  // var query = [
  //   'AssignmentExpression',
  //   ':has([object] Identifier[name="module"])',
  //   ':has([property] Identifier[name="exports"])',
  //   '[right] Literal[value="foo"]'
  // ].join('')

  var query = 'Literal[value="foo"]'
  find(query).forEach(function(node) {
    node.value = 'bar'
    node.raw = "'bar'"
  })
})

tap.equal(require('./foo'), 'bar')
