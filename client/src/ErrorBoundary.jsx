import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <pre style={{ padding: 20, color: "red", whiteSpace: "pre-wrap" }}>
          {this.state.error.stack || this.state.error.message}
        </pre>
      );
    }

    return this.props.children;
  }
}