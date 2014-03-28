# treeui

A simple collapsible tree ui, for file selectors and the like.

## install

    npm install --save treeui

## api

### treeui(request)

Request is a function that takes `(level, callback)` and calls callback
with `(err, results)`, where results is an array.

### onclick(callback)

Call callback with the tree level of clicked items

## appendTo(elem)

Append the UI to a given DOM element.
