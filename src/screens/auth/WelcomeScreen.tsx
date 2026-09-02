import React from 'react';
import { HeartPulse, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { CustomButton } from '../../components/CustomButton';

export const WelcomeScreen: React.FC = () => {
  const { navigate } = useAppNavigation();

  return (
    <div id="welcome-screen" className="min-h-[640px] flex flex-col justify-between p-6 bg-white">
      <div className="pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-700 flex items-center justify-center text-white">
            <HeartPulse className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-900 text-lg">Medicare</span>
        </div>
        <button
          onClick={() => navigate('RoleSelection')}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
        >
          Quick Demo
        </button>
      </div>

      <div className="my-auto py-6 space-y-5 text-left">
        <div className="w-full h-48 rounded-2xl bg-emerald-50 border border-emerald-100 p-4 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-emerald-100/70 flex items-center justify-center mb-3">
            <ShieldCheck className="w-10 h-10 text-emerald-700" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Your Health, Digitally Managed</h2>
          <p className="text-xs text-slate-500 max-w-[240px] mt-1">
            Book appointments, access prescriptions, and manage hospital activities.
          </p>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5 text-xs text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Connect Patients, Doctors & Hospital Administrators</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Instant doctor schedules & slot booking</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Real-time prescriptions & laboratory reports</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 pb-4">
        <CustomButton
          id="welcome-get-started-btn"
          fullWidth
          size="lg"
          variant="primary"
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          onClick={() => navigate('RoleSelection')}
        >
          Get Started
        </CustomButton>

        <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
          <span>Already registered?</span>
          <button
            id="welcome-login-link"
            onClick={() => navigate('Login')}
            className="font-bold text-emerald-700 hover:underline cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
