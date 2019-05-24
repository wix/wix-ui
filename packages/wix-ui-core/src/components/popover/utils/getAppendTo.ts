import { getScrollParent } from 'popper.js/dist/umd/popper-utils';
import { getParentNode } from './utils';

type predicate = (s: Element) => boolean;
type preset = string;

export function getAppendTo(appendTo?: preset | predicate, node?: Element) {
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
        return null;
    }
  }

  return getByPredicate(appendTo, node);
}

function getByPredicate(predicate, element) {
  if (!element) {
    return document.body;
  }

  return (
    searchParent(predicate, element) ||
    searchChilds(predicate, element) ||
    document.body
  );
}

function searchParent(predicate, element) {
  if (!element) {
    return;
  }
  if (predicate(element)) {
    return element;
  }
  return getByPredicate(predicate, getParentNode(element));
}

function searchChilds(predicate, elements) {
  if (!elements) {
    return;
  }

  if (elements.length !== 0) {
    const found = elements.find(el => predicate(el));
    if (found) {
      return found;
    }
  }

  if (elements.length !== 0) {
    const children = elements.reduce((result, el) => {
      return [...result, ...Array.from(el.childNodes)];
    });

    return searchChilds(predicate, children);
  }

  return searchChilds(predicate, elements);
}
