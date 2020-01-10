export const interpolateFileName = ({ filename, names }): string => {
  const newInterpolations = [
    [/\$ComponentName/, names.ComponentName],
    [/\$componentName/, names.componentName],
    [/\$component-name/, names['component-name']],
    [/\$component_name/, names.component_name],
  ];

  const oldInterpolations = [
    // DEPRECATED: the following should no longer be used!
    // keeping them to not break existing users
    // can be removed either:
    // 1. with major version release
    // 2. when ensured no consumers use it
    [/Component/, names.ComponentName],
    [/ComponentName/, names.ComponentName],
    [/component-name/, names['component-name']],
  ];

  const matchesNewInterpolations = newInterpolations.some(([regexp]) =>
    new RegExp(regexp, 'g').test(filename),
  );

  const interpolations = matchesNewInterpolations
    ? newInterpolations
    : oldInterpolations;

  return interpolations.reduce(
    (name, [regex, replace]) => name.replace(new RegExp(regex, 'g'), replace),
    filename,
  );
};
