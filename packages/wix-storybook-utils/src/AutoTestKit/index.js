import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class AutoTestKit extends Component {
  static propTypes = {
    source: PropTypes.object.isRequired
  };

  getMethodRow = methodName => {
    const method = this.props.source.returns[methodName];

    return (
      <tr key={methodName} data-hook="method">
        <td data-hook="name">{methodName}</td>
        <td>{this.getParams(method.params)}</td>
        <td>{method.returnType}</td>
        <td data-hook="description">{method.description}</td>
      </tr>
    );
  }

  getParams = params => {
    if (params.length) {
      return params.map((param, i) => `${param.name} (${param.type})${i === params.length - 1 ? '' : '\n'}`);
    } else {
      return '---';
    }
  }

  render() {
    const source = this.props.source;

    return (
      <div className="markdown-body">
        <h2>Enzyme Testkit</h2>

        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Arguments</th>
              <th>Returned Value</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            { Object.keys(source.returns).map(this.getMethodRow) }
          </tbody>
        </table>
      </div>
    );
  }
}
