import React from 'react';
import PropTypes from 'prop-types';

import Markdown from '../Markdown';
import parser from './parser';

const prepareParsedProps = props => {
  const asList = Object.keys(props).map(key => ({ ...props[key], name: key }));

  const lexical = (a, b) => a.name.localeCompare(b.name);
  const required = asList.filter(prop => prop.required).sort(lexical);
  const notRequired = asList.filter(prop => !prop.required).sort(lexical);

  // required props go first
  return required.concat(notRequired);
};

const wrap = name => children => (
  <span>
    {name} [{children}]
  </span>
);

const failSafe = type => () => (
  <span>
    Sorry, unable to parse this propType:
    <pre>{JSON.stringify(type, null, 2)}</pre>
  </span>
);

const renderPropType = (type = {}) => {
  const typeHandlers = {
    custom: () => wrap('custom')(),

    enum: () =>
      wrap('oneOf')(
        Array.isArray(type.value)
          ? type.value.map((v, i, allValues) => (
              <span key={i}>
                <code>{v.value}</code>
                {allValues[i + 1] && ', '}
              </span>
            ))
          : JSON.stringify(type.value, null, 2),
      ),

    union: () =>
      wrap('oneOfType')(
        type.value.map((v, i, allValues) => (
          <span key={i}>
            {renderPropType(v)}
            {allValues[i + 1] && ', '}
          </span>
        )),
      ),

    shape: () =>
      type.computed
        ? type.value
        : wrap('shape')(
            <ul style={{ marginBottom: 0 }}>
              {Object.keys(type.value)
                .map(key => ({ ...type.value[key], key }))
                .map((v, i) => (
                  <li key={i}>
                    {v.key}
                    :&nbsp;
                    {renderPropType(v)}
                    {v.required && (
                      <small>
                        <strong>&nbsp;required</strong>
                      </small>
                    )}
                  </li>
                ))}
            </ul>,
          ),

    arrayOf: () => wrap('arrayOf')(renderPropType(type.value)),
  };

  if (type.value) {
    return (typeHandlers[type.name] || failSafe(type))();
  }

  return <span>{type.name}</span>;
};

const methodsToMarkdown = methods =>
  methods
    .filter(({ name }) => !name.startsWith('_'))
    .map(
      method =>
        `* __${method.name}(${method.params
          .map(({ name }) => name)
          .join(', ')})__: ${method.docblock || ''}`,
    )
    .join('\n');

const AutoDocs = ({ source = '', parsedSource, showTitle }) => {
  const { description, displayName, props, composes = [], methods = [] } =
    parsedSource || parser(source);

  const propRow = (prop, index) => (
    <tr key={index}>
      <td data-hook="autodocs-prop-row-name">{prop.name || '-'}</td>
      <td>{renderPropType(prop.type)}</td>
      <td>
        {prop.defaultValue && prop.defaultValue.value && (
          <Markdown source={`\`${prop.defaultValue.value}\``} />
        )}
      </td>
      <td>{prop.required && 'Required'}</td>
      <td>{prop.description && <Markdown source={prop.description} />}</td>
    </tr>
  );

  return (
    <div className="markdown-body">
      {showTitle && displayName && (
        <div>
          <h1>{displayName && <code>{`<${displayName}/>`}</code>}</h1>
        </div>
      )}

      {!displayName && (
        <blockquote>
          This component has no <code>displayName</code>
        </blockquote>
      )}

      {description && <Markdown source={description} />}

      <h2>
        Available <code>props</code>
      </h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default Value</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {prepareParsedProps(props).map(propRow)}

          {!parsedSource && composes.length > 0 && (
            <tr>
              <td colSpan={5}>
                Also includes props from:
                <ul>
                  {composes.map((path, i) => (
                    <li key={i}>{path}</li>
                  ))}
                </ul>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {methods.filter(({ name }) => !name.startsWith('_')).length > 0 && (
        <h2>
          Available <code>methods</code>
        </h2>
      )}
      {methods.length > 0 && <Markdown source={methodsToMarkdown(methods)} />}
    </div>
  );
};

AutoDocs.propTypes = {
  source: PropTypes.string,
  parsedSource: PropTypes.object,
  showTitle: PropTypes.bool,
};

AutoDocs.defaultProps = {
  showTitle: true,
};

export default AutoDocs;
