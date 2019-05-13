import React from 'react';

export const MethodsTable = ({ methods = [] }) => (
  <table data-hook="autodocs-methods-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Parameters</th>
        <th>Description</th>
      </tr>
    </thead>

    <tbody>
      {methods.map(({ name = '', params = [], description = '' }) => (
        <tr key={name}>
          <td>{name}</td>
          <td>{params.map(({ name: paramName }) => paramName).join(', ')}</td>
          <td>{description}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
