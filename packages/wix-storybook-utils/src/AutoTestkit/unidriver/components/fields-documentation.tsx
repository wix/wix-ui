import * as React from 'react';
import { MethodDocumentation } from './method-documentation';
import { PrimitiveDocumentation } from '../../primitive-documentation';

export const FieldsDocumentation = ({ units }) => {
  const typeComponents = {
    value: PrimitiveDocumentation,
    function: MethodDocumentation,
    object: PrimitiveDocumentation,
    error: PrimitiveDocumentation,
  };
  return units.length ? (
    <table data-hook="auto-testkit-container">
      <thead>
        <tr>
          <th data-hook="auto-testkit-property-header">method</th>
          <th data-hook="auto-testkit-returned-header">returns</th>
          <th data-hook="auto-testkit-description-header">description</th>
        </tr>
      </thead>
      <tbody>
        {units
          .filter(({ type }) => typeComponents[type])
          .map((unit, i) => {
            const Documentation = typeComponents[unit.type];
            return <Documentation key={i} unit={unit} />;
          })}
      </tbody>
    </table>
  ) : (
    <div data-hook="auto-testkit-container">(empty)</div>
  );
};
