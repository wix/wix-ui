import React from 'react';

import { Metadata } from '../typings/metadata';
import { PropType } from '../typings/prop';

import Markdown from '../Markdown';

import styles from './styles.scss';

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
    Unable to parse propType:
    <pre>{JSON.stringify(type, null, 2)}</pre>
  </span>
);

const renderPropType: (a: PropType) => React.ReactNode = (type = {}) => {
  const typeHandlers = {
    custom: () => wrap('custom')(''),

    enum: () =>
      wrap('oneOf')(
        Array.isArray(type.value)
          ? type.value.map((v, i, allValues) => (
              <span key={i}>
                <code>{(v as any).value}</code>
                {allValues[i + 1] && ', '}
              </span>
            ))
          : JSON.stringify(type.value, null, 2),
      ),

    union: () =>
      wrap('oneOfType')(
        type.value.map((v, i, allValues) => (
          <span key={i}>
            {renderPropType(v as any)}
            {allValues[i + 1] && ', '}
          </span>
        )),
      ),

    shape: () =>
      (type as any).computed
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

    arrayOf: () => wrap('arrayOf')(renderPropType(type.value as any)),
  };

  if (type.value) {
    return (typeHandlers[type.name] || failSafe(type))();
  }

  return <span>{type.name}</span>;
};

const MethodsTable = ({ methods = [] }) => {
  const publicMethods = methods.filter(({ name }) => !name.startsWith('_'));

  return (
    <div data-hook="methods-table">
      <div className={styles.tableTitle}>Public methods</div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Parameters</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {publicMethods.map(({ name = '', params = [], description = '' }) => (
            <tr key={name}>
              <td>{name}</td>
              <td>
                {params.map(({ name: paramName }) => paramName).join(', ')}
              </td>
              <td>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const propRow = prop => (
  <tr key={prop.name}>
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

interface AutoDocsProps {
  parsedSource: Metadata;
  showMethods?: boolean;
}

const AutoDocs: React.SFC<AutoDocsProps> = ({ parsedSource, showMethods }) => {
  const { props, methods = [] } = parsedSource as Metadata;

  const hasMethods =
    methods.filter(({ name }) => !name.startsWith('_')).length > 0;

  return (
    <div className="markdown-body">
      <div className={styles.tableTitle}>Props</div>

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

        <tbody>{prepareParsedProps(props).map(propRow)}</tbody>
      </table>

      {hasMethods && showMethods && <MethodsTable methods={methods} />}
    </div>
  );
};

AutoDocs.defaultProps = {
  showMethods: true,
};

export default AutoDocs;
