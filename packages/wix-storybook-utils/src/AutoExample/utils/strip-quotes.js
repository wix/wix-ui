export default string => {
  const quoted = string.match(/^['"](.*?)['"]$/);
  return quoted ? quoted[1] : string;
};
