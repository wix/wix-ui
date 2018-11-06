import * as React from 'react';
import { ValueDocumentation } from './value-documentation';
import { MethodDocumentation } from './method-documentation';

export const FieldsDocumentation = ({ data }) => {
  const typeComponents = {
    value: ValueDocumentation,
    function: MethodDocumentation,
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
