import * as React from 'react';

const FunctionArguments = ({ args }) => {
  return args.map(argument => {
    return (
      <span key={argument.name}>
        <span data-hook="auto-testkit-function-argument-name">
          {argument.name}
        </span>
        {argument.type && (
          <span data-hook="auto-testkit-function-argument-type">
            :{argument.type}
          </span>
        )}
      </span>
    );
  });
};

export const MethodDocumentation = ({ data }) => {
  const { args, name } = data;
  return (
    <tr className="auto-testkit-field" data-hook="auto-testkit-data-row">
      <td>
        <span data-hook="auto-testkit-function-name">{name}</span>(
        <span data-hook="auto-testkit-function-arguments">
          {args.length ? <FunctionArguments args={args} /> : ''}
        </span>
        )
      </td>
      <td data-hook="auto-testkit-function-description">{data.description}</td>
    </tr>
  );
};
