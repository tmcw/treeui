var treeui = require('./');

treeui(request)
    .onclick(function(level) {
        console.log(level);
    })
    .appendTo(document.body);

function request(tree, callback) {
    callback(null, [1 + tree, 2 + tree, 3 + tree]);
}
