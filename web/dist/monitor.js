"use strict";
(function () {
    function textNodesUnder(elem) {
        var a = [];
        var accept = {
            acceptNode: function (node) {
                if (node.textContent && node.textContent.trim()) {
                    return NodeFilter.FILTER_ACCEPT;
                }
                return NodeFilter.FILTER_REJECT;
            }
        };
        var walker = document.createTreeWalker(elem, NodeFilter.SHOW_TEXT, accept, false);
        var n = walker.nextNode();
        if (!n) {
            return a;
        }
        do {
            a.push(n);
        } while (n = walker.nextNode());
        return a;
    }
    function isHidden(elem) {
        var style = window.getComputedStyle(elem);
        return !(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)
            || elem.hidden
            || style.visibility === "hidden"
            || style.opacity === "0";
    }
    function containsSubstring(arr, substring) {
        return arr.length > 0 && arr.find(function (str) { return str.toLowerCase().includes(substring); });
    }
    function getRandomMs(minMs, maxMs) {
        if (minMs === void 0) { minMs = 2000; }
        if (maxMs === void 0) { maxMs = 5000; }
        return Math.random() * (maxMs - minMs) + minMs;
    }
    function getTextNodes(selector) {
        var deliveryTimeForm = document.querySelector(selector);
        var result = [];
        if (!deliveryTimeForm) {
            console.log("No delivery form. Reloading...");
            location.reload();
            return result;
        }
        var nodes = textNodesUnder(deliveryTimeForm);
        nodes.forEach(function (n) {
            var parent = n.parentElement;
            if (!parent || isHidden(parent))
                return;
            if ((n === null || n === void 0 ? void 0 : n.textContent) && typeof n.textContent === "string") {
                result.push(n.textContent.trim());
            }
        });
        return result;
    }
    var nonEmptyText = getTextNodes("#delivery-slot-form");
    var NO_DELIVERY = "no delivery windows available";
    if (nonEmptyText.length && containsSubstring(nonEmptyText, NO_DELIVERY)) {
        var ms = getRandomMs();
        console.log("Reloading in " + ms + " ms...");
        setTimeout(function () { return location.reload(); }, ms);
    }
    else {
        console.log("order");
    }
}());
//# sourceMappingURL=monitor.js.map