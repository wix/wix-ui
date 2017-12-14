import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DriverParser from './DriverParser';

export default class AutoTestKit extends Component {

  static propTypes = {
    source: PropTypes.string
  };

  componentWillMount() {
    const result = new DriverParser(this.props.source).parse() || '';
    this.setState({source: result});
  }

  getMethodRow = methodName => {
    const method = this.getMethod(methodName);

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

  getMethod = methodName => {
    return this.state.source.returns[methodName];
  }

  render() {
    const source = this.state.source;
    return (
      <div className="markdown-body">
        <h2>Auto Generated Enzyme Testkit</h2>
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
            {
              Object.keys(source.returns)
                .map(methodName => this.getMethodRow(methodName))
            }
          </tbody>
        </table>
      </div>

    );
  }
}
