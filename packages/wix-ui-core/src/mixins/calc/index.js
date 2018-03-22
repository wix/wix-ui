module.exports = function(expression) {
  const parts = expression.match(/(\d+)[a-z%]+/g);

  // All values are unitless, reduce to a single number.
  if (!parts) {
    return eval(expression).toString();
  }

  const units = parts.map(val => val.replace(/(\d+)(.*)/, "$2"));

  // All values have the same unit, reduce to a single number
  // followed by the unit.
  if (units.every(u => u === units[0])) {
      return eval(expression.split(units[0]).join(' ')) + units[0];
  }

  // Fallback on native calc.
  return 'calc(' + expression + ')';
};
