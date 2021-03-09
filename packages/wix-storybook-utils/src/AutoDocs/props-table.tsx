import React from 'react';

import { Prop } from '../typings/prop';
import Markdown from '../Markdown';
import styles from './styles.scss';

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

const renderPropType: (a: Prop['type']) => React.ReactNode = (type = {}) => {
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

const prepareProps = props => {
  const asList = Object.keys(props).map(key => ({
    ...props[key],
    name: key,
  }));

  const lexical = (a, b) => a.name.localeCompare(b.name);
  const required = asList.filter(prop => prop.required).sort(lexical);
  const notRequired = asList.filter(prop => !prop.required).sort(lexical);

  // required props go first
  return required.concat(notRequired);
};

export interface PropertiesTableProps {
  props: { [s: string]: Prop };
}

export const PropsTable: React.FunctionComponent<PropertiesTableProps> = ({
  props,
}) => (
  <table data-hook="autodocs-props-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Default Value</th>
        <th>Description</th>
      </tr>
    </thead>

    <tbody>
      {prepareProps(props).map(prop => (
        <tr key={prop.name}>
          <td className={styles.propName} data-hook="autodocs-prop-row-name">
            {prop.name || '-'}
          </td>

          <td className={styles.propType}>{renderPropType(prop.type)}</td>

          <td className={styles.defaultProp}>
            {prop.defaultValue && prop.defaultValue.value && (
              <Markdown source={`\`${prop.defaultValue.value}\``} />
            )}
          </td>

          <td className={styles.description}>
            {prop.description && <Markdown source={prop.description} />}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
