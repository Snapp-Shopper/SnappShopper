import React, { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.error("Error in component:", error);
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="text-center mt-20">
                    <h1 className="text-red-600">Something went wrong!</h1>
                    <p>Please try refreshing the page.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
