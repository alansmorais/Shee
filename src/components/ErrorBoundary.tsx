import React, { Component, ErrorInfo, ReactNode } from 'react';

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

  constructor(props: Props) {
    super(props);
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('SHE Academy application error caught by boundary:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      sessionStorage.clear();
    } catch {
      // ignore
    }
    window.location.hash = '';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FCFAF7] text-[#32231F] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border border-[#EBE5DF] rounded-2xl p-8 shadow-xl text-center space-y-5">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#B05B43]/10 text-[#B05B43] flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-normal text-[#32231F]">
                SHE. Academy Sanctuary
              </h2>
              <p className="text-xs text-[#7D7571] leading-relaxed">
                The session encountered a temporary display issue. Click below to reload and restore your view.
              </p>
            </div>
            {this.state.error && (
              <pre className="text-[11px] p-3 rounded-lg bg-[#FAF7F2] text-[#7D7571] text-left overflow-x-auto max-h-24 border border-[#EBE5DF]">
                {this.state.error.message}
              </pre>
            )}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full py-2.5 px-4 rounded-full bg-[#32231F] text-[#FCFAF7] text-xs uppercase tracking-widest font-semibold hover:bg-[#B05B43] transition-colors cursor-pointer"
              >
                Reload Sanctuary
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
