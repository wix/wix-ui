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

  getMethodRow = (methodName) => {
    const method = this.getMethod(methodName);

    return (<tr>
      <td>{methodName}</td>
      <td>{this.getParams(method.params)}</td>
      <td>{method.returnType}</td>
      <td>{method.description}</td>
    </tr>);
  }

  getParams = (params) => {
    return params.length ? params.map(param => `${param.name} <${param.type}>`) : '---';
  }

  getMethod = (methodName) => {
    return this.state.source.returns[methodName];
  }

  render() {
    const source = this.state.source;
    return (
      <div>
        <div>{JSON.stringify(source, null, 2)}</div>
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
          {Object.keys(source.returns)
            .map(methodName => this.getMethodRow(methodName))
          }
          </tbody>
        </table>
      </div>

    );
  }
}
