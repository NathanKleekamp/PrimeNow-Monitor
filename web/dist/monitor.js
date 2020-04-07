"use strict";
function textNodesUnder(elem) {
    var _a;
    var a = [];
    var walker = document.createTreeWalker(elem, NodeFilter.SHOW_TEXT, null, false);
    var n = walker.nextNode();
    if (!n) {
        return a;
    }
    while (n = walker.nextNode()) {
        var text = (_a = n === null || n === void 0 ? void 0 : n.textContent) === null || _a === void 0 ? void 0 : _a.trim();
        if (text) {
            a.push(n);
        }
    }
    return a;
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
        console.log("Reloading...");
        location.reload();
        return result;
    }
    var nodes = textNodesUnder(deliveryTimeForm);
    nodes.forEach(function (n) {
        if ((n === null || n === void 0 ? void 0 : n.textContent) && typeof n.textContent === "string") {
            result.push(n.textContent.trim());
        }
    });
    return result;
}
var nonEmptyText = getTextNodes("#delivery-slot-form");
var NO_DELIVERY = "no delivery windows available";
if (nonEmptyText.length && containsSubstring(nonEmptyText, NO_DELIVERY)) {
    setTimeout(function () { return location.reload(); }, getRandomMs());
}
else {
    console.log("order");
}
//# sourceMappingURL=monitor.js.map