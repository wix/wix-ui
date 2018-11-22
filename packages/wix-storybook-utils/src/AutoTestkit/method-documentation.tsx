import * as React from 'react';

const FunctionArguments = ({ args }) => {
  return (
    <span data-hook="auto-testkit-function-arguments">
      {args.map((argument, i) => {
        return (
          <span key={argument.name}>
            <span data-hook="auto-testkit-function-argument-name">
              {argument.name}
            </span>
            {argument.type && (
              <span data-hook="auto-testkit-function-argument-type">
                : {argument.type}
              </span>
            )}
            {i < args.length - 1 && ', '}
          </span>
        );
      })}
    </span>
  );
};

export const MethodDocumentation = ({ unit }) => {
  const { args, name } = unit;
  return (
    <tr className="auto-testkit-field">
      <td>
        <span data-hook="auto-testkit-function-name">{name}</span>(
        <FunctionArguments args={args} />)
      </td>
      <td data-hook="auto-testkit-function-description">{unit.description}</td>
    </tr>
  );
};
