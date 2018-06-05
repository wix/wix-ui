import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isPlainObject} from 'lodash';
import path from 'path';

export default class AutoTestKit extends Component {
  static propTypes = {
    source: PropTypes.object.isRequired
  };

  isFunction = data => data && isPlainObject(data) && data.type && data.type === 'function';

  isMethodContainer = data =>
    !this.isFunction(data) && isPlainObject(data) &&
    Object.keys(data).length > 0 &&
    Object.keys(data).some(methodName => this.isFunction(data[methodName]));

  /* Converts this:

    {
      driver: {
        exists: () => {...},
        element: () => {...}
      },
      dropDownDriver: {
        exists: () => {...},
        element: () => {...}
      }
    }

    into this:

    {
      driver.exists: () => {...},
      driver.element: () => {...},
      dropDownDriver.exists: () => {...},
      dropDownDriver.element: () => {...}
    } */
  flatenMethods = methodContainer =>
      Object.keys(methodContainer).map(returnName => ({returnName, method: methodContainer[returnName]}))
      .filter(({method}) => this.isFunction(method) || this.isMethodContainer(method))
      .reduce((flatContainer, {returnName, method}) => {
        if (this.isMethodContainer(method)) {
          Object.keys(method).map(methodName => ({fullName: `${returnName}.${methodName}`, actualMethod: method[methodName]}))
          .filter(({actualMethod}) => this.isFunction(actualMethod) || this.isMethodContainer(actualMethod))
          .reduce((flatContainer, {fullName, actualMethod}) => {
            flatContainer[fullName] = actualMethod;
            return flatContainer;
          }, flatContainer);
        } else {
          flatContainer[returnName] = method;
        }
        return flatContainer;
      }, {});

  getMethodRows = (flatMethods, hasOrigin) => {
    return (
      <tbody>
        { Object.keys(flatMethods).map(methodName =>
          <tr key={methodName} data-hook="method">
            <td data-hook="name">{methodName}</td>
            <td>{this.getParams(flatMethods[methodName].params)}</td>
            <td>{flatMethods[methodName].returnType}</td>
            <td data-hook="description">{flatMethods[methodName].description}</td>
            {hasOrigin ? <td data-hook="origin">{flatMethods[methodName].origin ? path.basename(flatMethods[methodName].origin) : null}</td> : null}
          </tr>)}
      </tbody>
    );
  }

  getParams = params => {
    if (params.length) {
      return params.map((param, i) => `${param.name} (${param.type})${i === params.length - 1 ? '' : '\n'}`);
    } else {
      return '---';
    }
  };

  getHeaders = flatMethods => {
    const headers = ['Method', 'Arguments', 'Returned Value', 'Description'];

    const hasOrigin = Object.keys(flatMethods).map(methodName => flatMethods[methodName]).some(method => method.origin);

    return headers.concat(hasOrigin ? ['Origin'] : []);
  };

  render() {
    const source = this.props.source;
    const flatMethods = this.flatenMethods(source.returns);
    const headers = this.getHeaders(flatMethods);
    return (
      <div className="markdown-body">
        <h2>Enzyme Testkit</h2>

        <table>
          <thead>
            <tr>
              {headers.map(header => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          { this.getMethodRows(flatMethods, headers.includes('Origin')) }
        </table>
      </div>
    );
  }
}
