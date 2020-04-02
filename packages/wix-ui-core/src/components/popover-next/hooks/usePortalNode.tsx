import * as React from 'react';
import { Boundary } from 'popper.js';

import {
  AttributeMap,
  attachStylesToNode,
  detachStylesFromNode,
} from '../../../utils/stylableUtils';

import { getAppendToElement } from './utils/getAppendToElement';

import styles from '../../popover/Popover.st.css';

const omit = (key, obj) => {
  const { [key]: omitted, ...rest } = obj;
  return rest;
};

export function usePortalNode(
  props,
  referenceRef,
  shouldAnimate,
): {
  portalNode: HTMLElement;
  detachStyles(): void;
  boundariesElement: Boundary | Element;
} {
  const portalNode = React.useRef<HTMLDivElement>();
  const appendToNode = React.useRef<HTMLElement>();
  const stylesObj = React.useRef<AttributeMap>();

  const { appendTo, shown } = props;

  const detachStyles = () =>
    detachStylesFromNode(portalNode.current, stylesObj.current);

  React.useEffect(() => {
    appendToNode.current = getAppendToElement(appendTo, referenceRef.current);

    if (appendToNode.current) {
      const portal = document.createElement('div');
      // react for some reason attaches click event so we need stop propagation here
      portal.addEventListener('click', e => e.stopPropagation());
      portal.setAttribute('data-hook', 'popover-portal');
      /**
       * reset overlay wrapping layer
       * so that styles from copied classnames
       * won't break the overlay:
       * - content is position relative to body
       * - overlay layer is hidden
       */
      Object.assign(portal.style, {
        position: 'static',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      });

      portalNode.current = portal;
      appendToNode.current.appendChild(portal);
    }

    return () => {
      if (portalNode.current && appendToNode.current.children.length) {
        appendToNode.current.removeChild(portalNode.current);
      }
    };
  }, [appendTo]);

  // we use this here to make sure to recalculate portal styles on shown change
  React.useEffect(() => {
    if (portalNode) {
      // Re-calculate the portal's styles
      stylesObj.current = styles('root', {}, omit('data-hook', props));

      // Apply the styles to the portal
      if (shouldAnimate || shown) {
        attachStylesToNode(portalNode.current, stylesObj.current);
      }

      detachStylesFromNode(portalNode.current, stylesObj.current);
    }
  }, [shown]);

  const stringBoundaries = ['scrollParent', 'window', 'viewport'];

  const boundariesElement = stringBoundaries.find(bound => bound === appendTo)
    ? appendTo
    : appendToNode.current;

  return {
    portalNode: portalNode.current,
    detachStyles,
    boundariesElement,
  };
}
