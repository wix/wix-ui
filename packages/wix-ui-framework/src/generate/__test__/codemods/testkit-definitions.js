module.exports = (file, api, options) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const { ComponentName } = options;

  root
    .find(j.AssignmentExpression, {
      left: {
        type: 'MemberExpression',
        object: { name: 'module' },
        property: { name: 'exports' },
      },
    })
    .get(0)
    .node.right.properties.push(
      j.property(
        'init',
        j.identifier(ComponentName),
        j.objectExpression([
          j.property('init', j.identifier('unidriver'), j.literal(true)),
          j.property(
            'init',
            j.identifier('testkitPath'),
            j.literal(`../src/${ComponentName}/${ComponentName}.uni.driver`),
          ),
        ]),
      ),
    );

  return root.toSource();
};
