import React, { useEffect } from 'react';
import { Activity, Heart, ShieldCheck } from 'lucide-react';
import { useAppNavigation } from '../../navigation/NavigationContext';

export const SplashScreen: React.FC = () => {
  const { navigate } = useAppNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('Welcome');
    }, 1800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      id="splash-screen"
      onClick={() => navigate('Welcome')}
      className="min-h-[640px] h-full flex flex-col items-center justify-between p-8 bg-gradient-to-b from-emerald-800 via-emerald-900 to-slate-950 text-white cursor-pointer select-none"
    >
      <div className="w-full pt-6 flex justify-end">
        <span className="text-xs text-emerald-200/70 border border-emerald-500/30 px-2 py-0.5 rounded-full">
          v1.0.0
        </span>
      </div>

      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 flex items-center justify-center shadow-2xl">
            <Activity className="w-12 h-12 text-emerald-300 animate-pulse" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Medicare
          </h1>
          <p className="text-emerald-200 text-sm font-medium">
            Hospital Management Mobile App
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-2 pb-6">
        <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-emerald-300/80">Connecting care seamlessly...</p>
      </div>
    </div>
  );
};
