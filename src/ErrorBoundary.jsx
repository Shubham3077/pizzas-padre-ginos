import { Component } from "react";
import { Link } from "@tanstack/react-router";

class ErrorBoundary extends Component {
  state =  {hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true}
  }
  componentDidCatch(error, info) {
    // to log error
    console.log("Error boundary has an error", error, info)
  }
  // Component should always render like functional component
  render() {
    if(this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Error Occured</h2>
          <p>Some error has occured <Link to={'/'}>Click here</Link> to go back to home page.</p>
        </div>
      )
    }
    return this.props.children;
  }
};

export default ErrorBoundary;
