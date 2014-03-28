# treeui

A simple collapsible tree ui, for file selectors and the like.

## install

    npm install --save treeui

## example

[Live example on requirebin](http://requirebin.com/?gist=tmcw/9842067)

```js
var treeui = require('treeui');

treeui(request)
    .onclick(function(level) {
        console.log(level);
    })
    .appendTo(document.body);

function request(tree, callback) {
    callback(null, [1 + tree, 2 + tree, 3 + tree]);
}
```

## api

### treeui(request)

Request is a function that takes `(level, callback)` and calls callback
with `(err, results)`, where results is an array.

### onclick(callback)

Call callback with the tree level of clicked items

## appendTo(elem)

Append the UI to a given DOM element.
