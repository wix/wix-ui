export function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return;
  }
  return element.parentNode;
}
