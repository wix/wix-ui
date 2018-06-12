export default haystack =>
  [
    /^func/i,
    /event/,
    /\) => void$/
  ].some(needle => haystack.match(needle));
