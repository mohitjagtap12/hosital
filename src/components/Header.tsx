import React from 'react';
import { ArrowLeft, Bell, Sparkles } from 'lucide-react';
import { useAppNavigation } from '../navigation/NavigationContext';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = true,
  onBack,
  rightAction,
  subtitle,
}) => {
  const { goBack, navigate, isAuthenticated, userRole } = useAppNavigation();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  return (
    <header id="app-screen-header" className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {showBack && (
            <button
              id="header-back-button"
              onClick={handleBack}
              className="p-2 -ml-1 text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="min-w-0">
            <h1 className="text-base font-bold text-slate-900 truncate leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-500 truncate">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {rightAction ? (
            rightAction
          ) : isAuthenticated && userRole === 'patient' ? (
            <button
              id="header-notifications-btn"
              onClick={() => navigate('Notifications')}
              className="relative p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white" />
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};
