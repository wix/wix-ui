export default a =>
  a instanceof RegExp ? a : new RegExp(a);
