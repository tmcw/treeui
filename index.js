module.exports = function(request) {
    var parent = ce('div', 'treeui'),
        onclick = function() { };

    var addItem = function(result) {
        var item = ce('div', 'treeui-item');
        item.level = JSON.stringify(result);

        if (expandable(result)) {
            var caret = append(item, ce('span', 'treeui-caret'));
            caret.innerHTML = '▶';
            caret.level = JSON.stringify(result);
            ae(caret, 'click', toggle);
        }

        var description = append(item, ce('span', 'treeui-label'));
        description.textContent = display(result);

        ae(description, 'click', function(e) {
            onclick(JSON.parse(e.target.parentNode.level), e);
        });

        return item;
    };

    var display = function(result) {
        return result;
    };

    var expandable = function(result) {
        return true;
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
            load(JSON.parse(parent.level),
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
        },
        display: function(_) {
            display = _;
            return treeui;
        },
        expandable: function(_) {
            expandable = _;
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
