import * as React from 'react';

export const PrimitiveDocumentation = ({ unit }) => (
  <tr>
    <td data-hook="auto-testkit-primitive-name">{unit.name}</td>
    <td data-hook="auto-testkit-primitive-description">{unit.description}</td>
  </tr>
);
