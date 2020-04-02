type StateValue = boolean | number | string;

export interface AttributeMap {
  className?: string;
  [attributeName: string]: StateValue | undefined;
}

export const attachStylesToNode = (
  portalNode: HTMLElement,
  stylesObj: AttributeMap,
) => {
  if (portalNode) {
    stylesObj.className
      .split(' ')
      .forEach(className => portalNode.classList.add(className));

    Object.keys(stylesObj)
      .filter(key => key.startsWith('data-'))
      .forEach(key => portalNode.setAttribute(key, String(stylesObj[key])));

    return portalNode;
  }
  return;
};

export const detachStylesFromNode = (
  portalNode: HTMLElement,
  stylesObj: AttributeMap,
) => {
  if (portalNode) {
    stylesObj.className
      .split(' ')
      .forEach(className => portalNode.classList.remove(className));

    Object.keys(stylesObj)
      .filter(key => key.startsWith('data-'))
      .forEach(key => portalNode.removeAttribute(key));

    return portalNode;
  }
  return;
};
