export const attachStylesToNode = (node: HTMLElement, stylesObj: {[key: string]: string}) => {
  if (node) {
    stylesObj.className.split(' ')
      .forEach(className => node.classList.add(className));

    Object.keys(stylesObj)
      .filter(key => key.startsWith('data-'))
      .forEach(key => node.setAttribute(key, stylesObj[key]));
  }
};

export const detachStylesFromNode = (node: HTMLElement, stylesObj: {[key: string]: string}) => {
  if (node) {
    stylesObj.className.split(' ')
      .forEach(className => node.classList.remove(className));

    Object.keys(stylesObj)
      .filter(key => key.startsWith('data-'))
      .forEach(key => node.removeAttribute(key));
  }
};
