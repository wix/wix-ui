import * as React from 'react';
import { MethodDocumentation } from './method-documentation';
import { PrimitiveDocumentation } from './primitive-documentation';

export const FieldsDocumentation = ({ data }) => {
  const typeComponents = {
    value: PrimitiveDocumentation,
    function: MethodDocumentation,
    object: PrimitiveDocumentation,
  };
  return data.length ? (
    <table>
      <tbody>
        {data.map((field, i) => {
          const Documentation = typeComponents[field.type];
          return <Documentation key={i} data={field} />;
        })}
      </tbody>
    </table>
  ) : null;
};
