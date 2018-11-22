import * as React from 'react';
import { FieldsDocumentation } from './fields-documentation';

export const flatten = (descriptor, name = '') =>
  descriptor.reduce((result, item) => {
    const namespace = { ...item, name: `${name}${item.name}` };
    return [
      ...result,
      namespace,
      ...(namespace.type === 'object'
        ? flatten(namespace.props, `${namespace.name}.`)
        : []),
    ];
  }, []);

export const DriverDocumentation = ({ descriptor, name }) => {
  if (!name || typeof name !== 'string') {
    throw Error('no name - no render');
  }

  const flatDescriptor = flatten(descriptor);
  return (
    <div>
      <h2 data-hook="auto-testkit-driver-name">{name}</h2>
      <div data-hook="auto-testkit-driver-descriptor">
        <FieldsDocumentation units={flatDescriptor} />
      </div>
    </div>
  );
};
