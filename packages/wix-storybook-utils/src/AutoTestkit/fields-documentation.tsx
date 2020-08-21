import * as React from 'react';
import { MethodDocumentation } from './method-documentation';
import { PrimitiveDocumentation } from './primitive-documentation';

export const FieldsDocumentation = ({ units }) => {
  const typeComponents = {
    value: PrimitiveDocumentation,
    function: MethodDocumentation,
    object: PrimitiveDocumentation,
    error: PrimitiveDocumentation,
  };

  return (
    <table data-hook="auto-testkit-driver-fields">
      <thead>
        <tr>
          <th data-hook="auto-testkit-property-header">Property</th>
          <th data-hook="auto-testkit-description-header">Description</th>
        </tr>
      </thead>
      <tbody>
        {units
          // Filter by type
          .filter(({ type }) => typeComponents[type])
          // Filter overridden functions
          .filter(({ name }, index: number, arr) => {
            let isDuplicate = false;
            for (let i = index + 1; i < arr.length; i++) {
              isDuplicate = isDuplicate || name === arr[i].name;
            }
            return !isDuplicate;
          })
          .map((unit, i) => {
            const Documentation = typeComponents[unit.type];
            return (
              <Documentation
                key={i}
                data-hook="auto-testkit-field"
                unit={unit}
              />
            );
          })}
      </tbody>
    </table>
  );
};
