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

const paramDocumentation = ({ title, name, description }, index) => {
  return (
    <li key={index}>
      <b>{title}</b> {name}
      {description && ` - ${description}`}
    </li>
  );
};

const returnsDocumentation = ({ title, type, description }, index) => {
  // No type
  if (!type) {
    return;
  }

  // Basic type
  if (!type.applications) {
    return (
      <li key={index}>
        <b>{title}</b> {type.name}
        {description && ` - ${description}`}
      </li>
    );
  }

  // Promise type
  const returnType = type.applications
    .map(app => {
      if (app.name) {
        return app.name;
      }

      if (app.type === 'UnionType') {
        return app.elements
          .map(element => {
            if (element.value) {
              return `'${element.value}'`;
            }
            return element.name;
          })
          .join(' | ');
      }
    })
    .join(', ');

  return (
    <li key={index}>
      <b>{title}</b> {`Promise<${returnType}>`}
      {description && ` - ${description}`}
    </li>
  );
};

export const MethodDocumentation = ({ unit }) => {
  const { args, name, tags } = unit;
  return (
    <tr className="auto-testkit-field">
      <td>
        <span data-hook="auto-testkit-function-name">{name}</span>(
        <FunctionArguments args={args} />)
      </td>
      <td data-hook="auto-testkit-function-description">
        <div>{unit.description}</div>
        {tags && tags.length > 0 && (
          <ul>
            {tags.map((tag, index) => {
              if (tag.title === 'param') {
                return paramDocumentation(tag, index);
              }

              if (tag.title === 'returns' || tag.title === 'return') {
                return returnsDocumentation(tag, index);
              }

              return (
                <li key={index}>
                  <b>{tag.title}</b> {tag.description}
                </li>
              );
            })}
          </ul>
        )}
      </td>
    </tr>
  );
};
