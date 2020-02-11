import * as React from 'react';

class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            color: '#162d3d',
            fontSize: '14px',
            display: 'inline',
            padding: '0 11px',
            fontWeight: 400,
            borderRadius: '6px',
            backgroundColor: 'red',
            borderColor: '#FFD7D7',
            zIndex: 10000,
          }}
          onClick={this.props.onRetry}
        >
          Something happend with your network. Click here to retry.
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
