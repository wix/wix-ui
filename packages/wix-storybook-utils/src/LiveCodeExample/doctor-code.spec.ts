import { transformCode } from './doctor-code';

describe('transformCode', () => {
  it('should remove import statement', () => {
    const source = 'import Thing from "thong";';
    expect(transformCode(source)).toEqual('');
  });

  it('should remove export statement', () => {
    const source = 'export const it = "ution"';
    expect(transformCode(source)).toEqual('');
  });

  it('should remove require statement', () => {
    const source = 'const candidate = require("ment")';
    expect(transformCode(source)).toEqual('');
  });

  it('should transform class properties', () => {
    const source = `
import React from "react";
import { Lorem } from "somewhere";

class Component extends React.Component {
  state = { value: "test" };
  onClick = event => this.setState({ value: 'clicked' });
  render() {
    return <button onClick={this.onClick} />;
  }
}`;

    const expectation = `class Component extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      value: "test"
    };

    this.onClick = event => this.setState({
      value: 'clicked'
    });
  }

  render() {
    return <button onClick={this.onClick} />;
  }

}`;

    expect(transformCode(source)).toEqual(expectation);
  });
});
