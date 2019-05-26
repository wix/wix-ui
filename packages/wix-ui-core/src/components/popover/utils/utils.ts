export function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return;
  }
  return element.parentNode;
}

export function getChildrenOfChildren(elements) {
  if (!elements) {
    return;
  }

  const childrenArray = elements.map(el => Array.from(el.childNodes));

  if (childrenArray.length === 0) {
    return;
  }

  return childrenArray.reduce((list, el) => [...list, ...Array.from(el)]);
}
