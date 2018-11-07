import * as React from 'react';

export const PrimitiveDocumentation = ({ data }) => (
  <tr>
    <td data-hook="auto-testkit-primitive-name">{data.name}</td>
    <td data-hook="auto-testkit-primitive-description">{data.description}</td>
  </tr>
);
