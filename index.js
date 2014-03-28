module.exports = function(request) {
    var parent = ce('div', 'treeui'),
        onclick = function() { };

    var addItem = function(result) {
        var item = ce('div', 'treeui-item');
        item.level = result;

        var caret = append(item, ce('span', 'treeui-caret'));
        caret.innerHTML = '▶';
        caret.level = result;
        ae(caret, 'click', toggle);

        var description = append(item, ce('span', 'treeui-label'));
        description.innerHTML = result;

        ae(description, 'click', function(e) {
            onclick(e.target.parentNode.level, e);
        });

        return item;
    };

    function toggle(e) {
        var elem = e.target,
            parent = e.target.parentNode;
        if (elem.classList.contains('open')) {
            var subs = parent.getElementsByClassName('treeui-level');
            for (var i = 0; i < subs.length; i++) {
                subs[i].parentNode.removeChild(subs[i]);
            }
            elem.classList.remove('open');
            elem.innerHTML = '▶';
        } else {
            load(parent.level,
                 append(parent, ce('div', 'treeui-level')));
            elem.classList.add('open');
            elem.innerHTML = '▼';
        }
    }

    function load(level, parent) {
        request(level, function(err, results) {
            if (err) return;
            results.forEach(function(result) {
                append(parent, addItem(result));
            });
        });
    }

    load([], parent);

    var treeui = {
        appendTo: function(elem) {
            elem.appendChild(parent);
            return treeui;
        },
        onclick: function(_) {
            onclick = _;
            return treeui;
        }
    };

    return treeui;
};

function ce(_, k) {
    var elem = document.createElement(_);
    if (k) elem.className = k;
    return elem;
}

function append(x, y) {
    return x.appendChild(y);
}

function ae(x, y, z) {
    return x.addEventListener(y, z);
}