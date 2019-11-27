import { getParentNode, getScrollParent } from './utils';
const isElement = require('lodash/isElement');

export type Predicate = (s: Element) => boolean;
export type Preset = string;
export type Elm = HTMLDivElement | Element;

export function getAppendToElement(
  appendTo?: Preset | Predicate | Elm,
  node?: Element
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
