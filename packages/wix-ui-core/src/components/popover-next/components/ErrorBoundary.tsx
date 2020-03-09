import * as React from 'react';

class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            color: '#4f4f4f',
            fontSize: '14px',
            lineHeight: '1.33',
            padding: '9px',
            borderRadius: '6px',
            backgroundColor: '#f2f1ef',
            border: '1px dotted #4f4f4f',
            zIndex: 10000,
          }}
          onClick={this.props.onRetry}
        >
          Uh-oh! Failed to load.
          <br /> Please click to refresh.
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
