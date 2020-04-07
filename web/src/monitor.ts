(function() {
  function textNodesUnder(elem: HTMLElement) {
    const a: Node[] = [];
    const accept: NodeFilter = {
      acceptNode: function(node: Node) {
        if (node.textContent && node.textContent.trim()) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      }
    };
    const walker: TreeWalker = document.createTreeWalker(elem, NodeFilter.SHOW_TEXT, accept, false);
    let n = walker.nextNode();
    if (!n) {
      return a;
    }
    do {
      a.push(n)
    } while (n = walker.nextNode());
    return a;
  }

  function isHidden(elem: HTMLElement) {
    const style = window.getComputedStyle(elem);
    return !(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)
      || elem.hidden
      || style.visibility === "hidden"
      || style.opacity === "0";
  }

  function containsSubstring(arr: string[], substring: string) {
    return arr.length > 0 && arr.find((str: string) => str.toLowerCase().includes(substring));
  }

  function getRandomMs(minMs = 2000, maxMs = 5000) {
    return Math.random() * (maxMs - minMs) + minMs;
  }

  function getTextNodes(selector: string): string[] {
    const deliveryTimeForm: HTMLElement | null = document.querySelector(selector);
    let result: string[] = [];

    if (!deliveryTimeForm) {
      console.log("No delivery form. Reloading...");
      location.reload();
      return result;
    }

    const nodes: Node[] = textNodesUnder(deliveryTimeForm);
    nodes.forEach((n: Node) => {
      const parent: HTMLElement | null = n.parentElement;
      if (!parent || isHidden(parent)) return;
      if (n?.textContent && typeof n.textContent === "string") {
        result.push(n.textContent.trim());
      }
    });

    return result;
  }

  const nonEmptyText = getTextNodes("#delivery-slot-form");
  const NO_DELIVERY = "no delivery windows available";

  if (nonEmptyText.length && containsSubstring(nonEmptyText, NO_DELIVERY)) {
    const ms = getRandomMs();
    console.log(`Reloading in ${ms} ms...`);
    setTimeout(() => location.reload(), ms);
  } else {
    console.log("order");
  }
}());
