function textNodesUnder(elem: HTMLElement) {
  const a: Node[] = [];
  const walker: TreeWalker = document.createTreeWalker(elem, NodeFilter.SHOW_TEXT, null, false);
  let n = walker.nextNode();
  if (!n) {
    return a;
  }
  while (n = walker.nextNode()) {
    const text = n?.textContent?.trim();
    if (text) {
      a.push(n);
    }
  }
  return a;
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
    console.log("Reloading...");
    location.reload();
    return result;
  }

  const nodes: Node[] = textNodesUnder(deliveryTimeForm);
  nodes.forEach((n: Node) => {
    if (n?.textContent && typeof n.textContent === "string") {
      result.push(n.textContent.trim());
    }
  });

  return result;
}

const nonEmptyText = getTextNodes("#delivery-slot-form");
const NO_DELIVERY = "no delivery windows available";

if (nonEmptyText.length && containsSubstring(nonEmptyText, NO_DELIVERY)) {
  setTimeout(() => location.reload(), getRandomMs());
} else {
  console.log("order");
}
