import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error or perform any other error handling tasks here
    console.error(error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Render a fallback UI when an error occurs
      return <div>Something went wrong.</div>;
    }

    // Render the normal child components when no error has occurred
    return this.props.children;
  }
}

export default ErrorBoundary;
