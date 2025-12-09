import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "2rem",
            backgroundColor: "#fff2f0",
            border: "1px solid #ffccc7",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#cf1322" }}>Something went wrong.</h2>
          <p style={{ color: "#555" }}>The Analytics widget has crashed.</p>
          <details
            style={{
              whiteSpace: "pre-wrap",
              marginTop: "1rem",
              textAlign: "left",
              backgroundColor: "rgba(255,255,255,0.5)",
              padding: "1rem",
              color: "#333", // Fix text visibility
            }}
          >
            {this.state.error && this.state.error.toString()}
          </details>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
