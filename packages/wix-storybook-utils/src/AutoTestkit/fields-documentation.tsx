import * as React from 'react';
import { MethodDocumentation } from './method-documentation';
import { PrimitiveDocumentation } from './primitive-documentation';

export const FieldsDocumentation = ({ units }) => {
  const typeComponents = {
    value: PrimitiveDocumentation,
    function: MethodDocumentation,
    object: PrimitiveDocumentation,
  };
  return units.length ? (
    <table>
      <tbody>
        {units.map((unit, i) => {
          const Documentation = typeComponents[unit.type];
          return <Documentation key={i} unit={unit} />;
        })}
      </tbody>
    </table>
  ) : null;
};
