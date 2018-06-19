const regex = /^.*?\((.+?)\)$/i;
const removeHOC = (string = '') => {
  const [, componentName = ''] = string.match(regex) || [];
  return componentName || string;
};

export default removeHOC;
