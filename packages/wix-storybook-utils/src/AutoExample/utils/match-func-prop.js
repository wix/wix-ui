export default (string = '') =>
  [
    /^func/i,
    /event/,
    /\) => void$/
  ].some(needle => string.match(needle));
