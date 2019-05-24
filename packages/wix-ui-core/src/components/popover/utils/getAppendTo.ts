import { getScrollParent } from 'popper.js/dist/umd/popper-utils';

export function getAppendTo(appendTo?: string | Element, node?: Element) {
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

function getByPredicate(appendTo, node) {}

// function getParentNode(element) {
//   if (element.nodeName === 'HTML') {
//     return element;
//   }
//   return element.parentNode || element.host;
// }
