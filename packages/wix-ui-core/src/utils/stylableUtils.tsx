export const attachStylesToNode = (node: HTMLElement, stylesObj: AttributeMap) => {
  if (node) {
    stylesObj.className.split(' ')
      .forEach(className => node.classList.add(className));

    Object.keys(stylesObj)
      .filter(key => key.startsWith('data-'))
      .forEach(key => node.setAttribute(key, String(stylesObj[key])));
  }
};

export const detachStylesFromNode = (node: HTMLElement, stylesObj: AttributeMap) => {
  if (node) {
    stylesObj.className.split(' ')
      .forEach(className => node.classList.remove(className));

    Object.keys(stylesObj)
      .filter(key => key.startsWith('data-'))
      .forEach(key => node.removeAttribute(key));
  }
};
