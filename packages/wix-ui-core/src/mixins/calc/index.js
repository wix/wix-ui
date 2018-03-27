module.exports = function(expression) {
  const units = expression.match(/[a-z%]+/g);

  // All values are unitless, reduce to a single number.
  if (!units) {
    return eval(expression).toString();
  }

  // All values have the same unit, reduce to a single number
  // followed by the unit.
  if (units.every(u => u === units[0])) {
      return eval(expression.split(units[0]).join(' ')) + units[0];
  }

  // Fallback on native calc.
  return 'calc(' + expression + ')';
};
