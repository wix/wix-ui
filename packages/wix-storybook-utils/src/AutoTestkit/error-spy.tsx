import * as React from 'react';

interface IErrorSpy {
  spy: Function;
}
export class ErrorSpy extends React.Component<
  IErrorSpy,
  { hasError: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch() {
    this.props.spy();
  }

  static getDerivedStateFromError(err) {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
