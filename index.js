var patch = require('node-module-compile-transform')
var escodegen = require('escodegen')
var esprima = require('esprima')
var esquery = require('esquery')

module.exports = function patchWithAst(matcher, patcher) {
  patch(matcher, function(content) {
    var ast = esprima.parse(content)
    var replaced = patcher(ast, find)

    return escodegen.generate(replaced || ast)

    function find(selector, node) {
      return esquery.match(node || ast, esquery.parse(selector))
    }
  })
}
