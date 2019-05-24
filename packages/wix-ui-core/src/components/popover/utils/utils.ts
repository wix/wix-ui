export function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode;
}

export function getChildrenOfChildren(elements) {
  return elements
    .map(el => Array.from(el.childNodes))
    .reduce((list, el) => [...list, ...Array.from(el)]);
}
