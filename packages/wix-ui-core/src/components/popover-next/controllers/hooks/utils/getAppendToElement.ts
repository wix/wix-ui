const isElement = require('lodash/isElement');

export type Predicate = (s: Element) => boolean;
export type Preset = string;
export type Elm = HTMLDivElement | Element;

function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

function getStyleComputedProperty(element) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  const window = element.ownerDocument.defaultView;
  return window.getComputedStyle(element, null);
}

export function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
    default:
  }

  // Firefox want us to check `-x` and `-y` variations as well
  const { overflow, overflowX, overflowY } = getStyleComputedProperty(element);
  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

function getByPredicate(predicate, element) {
  if (!element) {
    return;
  }

  const node = searchParent(predicate, element);

  if (node) {
    return node;
  }

  return;
}

function searchParent(predicate, element) {
  if (!element) {
    return;
  }
  if (predicate(element)) {
    return element;
  }
  return searchParent(predicate, getParentNode(element));
}

function getAppendToElement(
  appendTo?: Preset | Predicate | Elm,
  node?: Element,
) {
  if (!appendTo) {
    return null;
  }

  if (typeof appendTo === 'string') {
    switch (appendTo) {
      case 'window':
      case 'viewport':
        return document.body;
      case 'scrollParent':
        return getScrollParent(node);
      default:
        return;
    }
  }

  if (typeof appendTo === 'function') {
    return getByPredicate(appendTo, node);
  }

  if (isElement(appendTo)) {
    return appendTo;
  }

  return;
}

export { getAppendToElement };
