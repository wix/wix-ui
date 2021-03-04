import React from 'react';
import styles from './styles.scss';

export const hiddenMethods = [
  'UNSAFE_componentWillMount',
  'UNSAFE_componentWillReceiveProps',
  'UNSAFE_componentWillUpdate',
  'componentDidCatch',
  'componentDidMount',
  'componentDidUpdate',
  'componentWillUnmount',
  'constructor',
  'forceUpdate',
  'getDerivedStateFromError',
  'getDerivedStateFromProps',
  'getSnapshotBeforeUpdate',
  'render',
  'setState',
  'shouldComponentUpdate',
];

export const MethodsTable = ({ methods = [] }) => (
  <table data-hook="autodocs-methods-table" className={styles.table}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Parameters</th>
        <th>Description</th>
      </tr>
    </thead>

    <tbody>
      {methods
        .filter(({ name }) => !hiddenMethods.includes(name))
        .map(({ name = '', params = [], description = '' }) => (
          <tr data-hook="autodocs-methods-table-row" key={name}>
            <td className={styles.propName}>{name}</td>
            <td className={styles.propType}>
              {params.map(({ name: paramName }) => paramName).join(', ')}
            </td>
            <td className={styles.description}>{description}</td>
          </tr>
        ))}
    </tbody>
  </table>
);
