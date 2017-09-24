# node-module-compile-transform-ast

[![Greenkeeper badge](https://badges.greenkeeper.io/Qard/node-module-compile-transform-ast.svg)](https://greenkeeper.io/)

With `node-module-compile-transform-ast`, ast transform functions can be applied
to any loaded module with a filename matching a given regular expression. All
the magic you see here is thanks to [esprima](https://npm.im/esprima), [escodegen](https://npm.im/escodegen), and [esquery](https://npm.im/esquery).

## Install

```sh
npm install node-module-compile-transform-ast
```

## Usage

The `node-module-compile-transform-ast` must always be required before the
module you want to patch is loaded.

```js
const patch = require('node-module-compile-transform-ast')

// Replace "foo" with "bar" in any js file with a path ending in foo.js
patch(/foo\.js$/, (ast, find) => {
  find('Literal[value="foo"]').forEach(node => {
    node.value = 'bar'
    node.raw = "'bar'"
  })
})

console.log(require('./foo')) // returns "bar" instead of "foo"
```

You can also return a value from the patcher to fully replace the input ast.

If for whatever reason you need to do nested finds, you can supply a node as
the second argument of `find()` to traverse only through that node.

---

### Copyright (c) 2017 Stephen Belanger
#### Licensed under MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
