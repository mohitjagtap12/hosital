import React from 'react';

interface LoadingIndicatorProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = 'Loading...',
  size = 'md',
  fullScreen = false,
}) => {
  const spinnerSize = size === 'sm' ? 'w-5 h-5 border-2' : size === 'lg' ? 'w-10 h-10 border-4' : 'w-7 h-7 border-3';

  const content = (
    <div className="flex flex-col items-center justify-center p-6 space-y-3">
      <div className={`${spinnerSize} border-emerald-600 border-t-transparent rounded-full animate-spin`} />
      {message && <p className="text-xs font-medium text-slate-600 tracking-wide">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-xs">
        {content}
      </div>
    );
  }

  return content;
};
