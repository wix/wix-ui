import { getScrollParent } from 'popper.js/dist/umd/popper-utils';
import { getParentNode, getChildrenOfChildren } from './utils';
const isElement = require('lodash/isElement');

export type Predicate = (s: Element) => boolean;
export type Preset = string;
export type Elm = HTMLDivElement | Element;

export function getAppendToElement(
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

function getByPredicate(predicate, element) {
  if (!element) {
    return;
  }

  if (searchParent(predicate, element)) {
    return searchParent(predicate, element);
  }

  const parent = element.parentNode;

  if (parent && parent.childNodes) {
    const children = parent && parent.childNodes;
    if (searchChildren(predicate, Array.from(children))) {
      return searchChildren(predicate, Array.from(children));
    }
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

function searchChildren(predicate, nodeList) {
  if (!nodeList || nodeList.length === 0) {
    return;
  }

  // Check whether current children list matches the predicate
  const element = nodeList.find(el => predicate(el));

  if (element) {
    return element;
  }

  // Get childrens of childrens and run this function again
  return searchChildren(predicate, getChildrenOfChildren(nodeList));
}
